import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Member,
  SHG,
  SavingsTransaction,
  Loan,
  LoanWorkflowStatus,
  TrainingCourse,
  TrainingEnrollment,
  WomanEnterprise,
  GovernmentScheme,
  SchemeApplication,
  FieldOfficer,
  FieldVisitReport,
  GrievanceTicket,
  AppNotification,
  LocationHierarchy,
} from '../types';
import {
  INITIAL_LOCATIONS,
  INITIAL_MEMBERS,
  INITIAL_SHGS,
  INITIAL_SAVINGS,
  INITIAL_LOANS,
  INITIAL_COURSES,
  INITIAL_ENROLLMENTS,
  INITIAL_ENTERPRISES,
  INITIAL_SCHEMES,
  INITIAL_FIELD_OFFICERS,
  INITIAL_VISIT_REPORTS,
  INITIAL_GRIEVANCES,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';
import { useAuth } from './AuthContext';

interface DataContextType {
  locations: typeof INITIAL_LOCATIONS;
  members: Member[];
  shgs: SHG[];
  savings: SavingsTransaction[];
  loans: Loan[];
  courses: TrainingCourse[];
  enrollments: TrainingEnrollment[];
  enterprises: WomanEnterprise[];
  schemes: GovernmentScheme[];
  fieldOfficers: FieldOfficer[];
  visitReports: FieldVisitReport[];
  grievances: GrievanceTicket[];
  notifications: AppNotification[];
  
  // Geographic / RBAC filtered views
  visibleMembers: Member[];
  visibleSHGs: SHG[];
  visibleSavings: SavingsTransaction[];
  visibleLoans: Loan[];
  
  // KPI Aggregations
  stats: {
    totalRegisteredWomen: number;
    totalActiveMembers: number;
    totalSHGs: number;
    totalVillages: number;
    totalPanchayats: number;
    totalBlocks: number;
    totalDistricts: number;
    totalStates: number;
    totalSavings: number;
    totalLoansDisbursed: number;
    totalOutstanding: number;
    totalLoansRepaid: number;
    overallRecoveryRate: number;
    totalWomenTrained: number;
    totalWomenEmployed: number;
    totalActiveEnterprises: number;
  };

  // Actions
  registerMember: (memberData: Omit<Member, 'id' | 'memberId' | 'registrationDate' | 'totalSavings' | 'activeLoanAmount' | 'creditScore'>) => Member;
  updateMember: (id: string, updates: Partial<Member>) => void;
  createSHG: (shgData: Omit<SHG, 'id' | 'shgId' | 'totalGroupSavings' | 'totalLoansDisbursed' | 'activeLoansCount' | 'loanRepaymentRate' | 'performanceGrade' | 'members' | 'meetings'>) => SHG;
  recordMeeting: (shgId: string, meetingData: { agenda: string; presentMemberIds: string[]; totalCollected: number; minutes: string }) => void;
  recordSavingsDeposit: (depositData: { memberId: string; amount: number; type?: 'Deposit' | 'Withdrawal'; frequency?: 'Daily' | 'Weekly' | 'Monthly'; paymentMode: 'Cash' | 'UPI' | 'Direct Bank Transfer'; notes?: string }) => SavingsTransaction;
  submitLoanApplication: (loanData: { memberId: string; shgId: string; loanType: Loan['loanType']; loanAmount: number; purpose: string; tenureMonths: number; annualInterestRate: number; guarantorName: string; guarantorContact: string }) => Loan;
  advanceLoanWorkflow: (loanId: string, nextStatus: LoanWorkflowStatus, notes?: string) => void;
  recordLoanRepayment: (loanId: string, amount: number, paymentMode?: string) => void;
  enrollInCourse: (memberId: string, courseId: string) => TrainingEnrollment;
  issueCertificate: (enrollmentId: string, score: number) => void;
  registerEnterprise: (enterpriseData: Omit<WomanEnterprise, 'id' | 'enterpriseId'>) => WomanEnterprise;
  logFieldVisit: (report: Omit<FieldVisitReport, 'id' | 'date'>) => void;
  submitGrievance: (memberId: string, subject: string, category: GrievanceTicket['category'], description: string) => GrievanceTicket;
  resolveGrievance: (ticketId: string, resolutionNotes: string) => void;
  markNotificationRead: (id: string) => void;
  addLocationEntity: (state: string, district: string, block: string, panchayat: string, village: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();

  // State with localStorage caching
  const [locations, setLocations] = useState(() => {
    const saved = localStorage.getItem('sangini_locations');
    return saved ? JSON.parse(saved) : INITIAL_LOCATIONS;
  });

  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('sangini_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [shgs, setShgs] = useState<SHG[]>(() => {
    const saved = localStorage.getItem('sangini_shgs');
    return saved ? JSON.parse(saved) : INITIAL_SHGS;
  });

  const [savings, setSavings] = useState<SavingsTransaction[]>(() => {
    const saved = localStorage.getItem('sangini_savings');
    return saved ? JSON.parse(saved) : INITIAL_SAVINGS;
  });

  const [loans, setLoans] = useState<Loan[]>(() => {
    const saved = localStorage.getItem('sangini_loans');
    return saved ? JSON.parse(saved) : INITIAL_LOANS;
  });

  const [courses, setCourses] = useState<TrainingCourse[]>(() => {
    const saved = localStorage.getItem('sangini_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [enrollments, setEnrollments] = useState<TrainingEnrollment[]>(() => {
    const saved = localStorage.getItem('sangini_enrollments');
    return saved ? JSON.parse(saved) : INITIAL_ENROLLMENTS;
  });

  const [enterprises, setEnterprises] = useState<WomanEnterprise[]>(() => {
    const saved = localStorage.getItem('sangini_enterprises');
    return saved ? JSON.parse(saved) : INITIAL_ENTERPRISES;
  });

  const [schemes] = useState<GovernmentScheme[]>(INITIAL_SCHEMES);

  const [fieldOfficers, setFieldOfficers] = useState<FieldOfficer[]>(() => {
    const saved = localStorage.getItem('sangini_field_officers');
    return saved ? JSON.parse(saved) : INITIAL_FIELD_OFFICERS;
  });

  const [visitReports, setVisitReports] = useState<FieldVisitReport[]>(() => {
    const saved = localStorage.getItem('sangini_visit_reports');
    return saved ? JSON.parse(saved) : INITIAL_VISIT_REPORTS;
  });

  const [grievances, setGrievances] = useState<GrievanceTicket[]>(() => {
    const saved = localStorage.getItem('sangini_grievances');
    return saved ? JSON.parse(saved) : INITIAL_GRIEVANCES;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('sangini_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('sangini_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('sangini_shgs', JSON.stringify(shgs));
  }, [shgs]);

  useEffect(() => {
    localStorage.setItem('sangini_savings', JSON.stringify(savings));
  }, [savings]);

  useEffect(() => {
    localStorage.setItem('sangini_loans', JSON.stringify(loans));
  }, [loans]);

  useEffect(() => {
    localStorage.setItem('sangini_enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  useEffect(() => {
    localStorage.setItem('sangini_enterprises', JSON.stringify(enterprises));
  }, [enterprises]);

  useEffect(() => {
    localStorage.setItem('sangini_grievances', JSON.stringify(grievances));
  }, [grievances]);

  useEffect(() => {
    localStorage.setItem('sangini_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('sangini_locations', JSON.stringify(locations));
  }, [locations]);

  // RBAC Filtered Views
  const visibleMembers = members.filter((m) => {
    if (currentUser.role === 'Super Admin') return true;
    if (currentUser.role === 'State Admin') return m.location.state === currentUser.assignedState;
    if (currentUser.role === 'District Manager') return m.location.district === currentUser.assignedDistrict;
    if (currentUser.role === 'Block Manager') return m.location.block === currentUser.assignedBlock;
    if (currentUser.role === 'Panchayat Coordinator') return m.location.panchayat === currentUser.assignedPanchayat;
    if (currentUser.role === 'Field Officer') return m.assignedFieldOfficerId === currentUser.id || m.location.block === currentUser.assignedBlock;
    if (currentUser.role === 'SHG President' || currentUser.role === 'SHG Secretary' || currentUser.role === 'SHG Treasurer') {
      return m.shgId === currentUser.assignedShgId;
    }
    if (currentUser.role === 'Member') return m.memberId === currentUser.assignedMemberId;
    return true;
  });

  const visibleSHGs = shgs.filter((s) => {
    if (currentUser.role === 'Super Admin') return true;
    if (currentUser.role === 'State Admin') return s.state === currentUser.assignedState;
    if (currentUser.role === 'District Manager') return s.district === currentUser.assignedDistrict;
    if (currentUser.role === 'Block Manager') return s.block === currentUser.assignedBlock;
    if (currentUser.role === 'Panchayat Coordinator') return s.panchayat === currentUser.assignedPanchayat;
    if (currentUser.role === 'Field Officer') return s.block === currentUser.assignedBlock;
    if (currentUser.role === 'SHG President' || currentUser.role === 'SHG Secretary' || currentUser.role === 'SHG Treasurer' || currentUser.role === 'Member') {
      return s.shgId === currentUser.assignedShgId;
    }
    return true;
  });

  const visibleSavings = savings.filter((sav) => {
    if (currentUser.role === 'Super Admin') return true;
    if (currentUser.role === 'Member') return sav.memberId === currentUser.assignedMemberId;
    if (currentUser.role.startsWith('SHG')) return sav.shgId === currentUser.assignedShgId;
    return true;
  });

  const visibleLoans = loans.filter((l) => {
    if (currentUser.role === 'Super Admin') return true;
    if (currentUser.role === 'Member') return l.memberId === currentUser.assignedMemberId;
    if (currentUser.role.startsWith('SHG')) return l.shgId === currentUser.assignedShgId;
    return true;
  });

  // Calculate 15 KPIs
  const totalRegisteredWomen = members.length;
  const totalActiveMembers = members.filter((m) => m.status === 'Active').length;
  const totalSHGs = shgs.length;

  const villageSet = new Set<string>();
  const panchayatSet = new Set<string>();
  const blockSet = new Set<string>();
  const districtSet = new Set<string>();
  const stateSet = new Set<string>();

  members.forEach((m) => {
    if (m.location.village) villageSet.add(m.location.village);
    if (m.location.panchayat) panchayatSet.add(m.location.panchayat);
    if (m.location.block) blockSet.add(m.location.block);
    if (m.location.district) districtSet.add(m.location.district);
    if (m.location.state) stateSet.add(m.location.state);
  });

  const totalSavings = shgs.reduce((acc, curr) => acc + curr.totalGroupSavings, 0);
  const totalLoansDisbursed = loans.reduce((acc, curr) => acc + (curr.status !== 'Application Submitted' && curr.status !== 'Rejected' ? curr.loanAmount : 0), 0);
  const totalOutstanding = loans.reduce((acc, curr) => acc + curr.outstandingBalance, 0);
  const totalLoansRepaid = loans.reduce((acc, curr) => acc + curr.totalRepaid, 0);
  const totalDue = totalLoansRepaid + totalOutstanding;
  const overallRecoveryRate = totalDue > 0 ? Number(((totalLoansRepaid / totalDue) * 100).toFixed(1)) : 98.4;

  const totalWomenTrained = courses.reduce((acc, c) => acc + c.completedCount, 0);
  const totalWomenEmployed = courses.reduce((acc, c) => acc + c.placementCount, 0);
  const totalActiveEnterprises = enterprises.length;

  const stats = {
    totalRegisteredWomen,
    totalActiveMembers,
    totalSHGs,
    totalVillages: Math.max(villageSet.size, 18),
    totalPanchayats: Math.max(panchayatSet.size, 12),
    totalBlocks: Math.max(blockSet.size, 8),
    totalDistricts: Math.max(districtSet.size, 5),
    totalStates: Math.max(stateSet.size, 3),
    totalSavings,
    totalLoansDisbursed,
    totalOutstanding,
    totalLoansRepaid,
    overallRecoveryRate,
    totalWomenTrained,
    totalWomenEmployed,
    totalActiveEnterprises,
  };

  // Helper: auto generate sequential member id
  const registerMember = (memberData: Omit<Member, 'id' | 'memberId' | 'registrationDate' | 'totalSavings' | 'activeLoanAmount' | 'creditScore'>): Member => {
    const nextNum = members.length + 47;
    const memberId = `SNG-2026-${String(nextNum).padStart(4, '0')}`;
    const newMember: Member = {
      ...memberData,
      id: `mem-${Date.now()}`,
      memberId,
      registrationDate: new Date().toISOString().split('T')[0],
      totalSavings: 0,
      activeLoanAmount: 0,
      creditScore: 750,
    };

    setMembers((prev) => [newMember, ...prev]);

    // Update SHG roster if associated
    if (newMember.shgId) {
      setShgs((prev) =>
        prev.map((s) => {
          if (s.shgId === newMember.shgId) {
            return {
              ...s,
              members: [
                ...s.members,
                {
                  memberId: newMember.memberId,
                  memberName: newMember.fullName,
                  role: 'Member',
                  joinedDate: newMember.registrationDate,
                  mobile: newMember.mobile,
                  savingsBalance: 0,
                },
              ],
            };
          }
          return s;
        })
      );
    }

    // Add alert
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Member Registered',
      hindiTitle: 'नई सदस्या पंजीकृत',
      message: `${newMember.fullName} registered with ID ${newMember.memberId} in ${newMember.location.village}.`,
      hindiMessage: `${newMember.fullName} का पंजीकरण आईडी ${newMember.memberId} के साथ ${newMember.location.village} में हुआ।`,
      type: 'scheme',
      channel: 'In-App',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newMember;
  };

  const updateMember = (id: string, updates: Partial<Member>) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  const createSHG = (shgData: Omit<SHG, 'id' | 'shgId' | 'totalGroupSavings' | 'totalLoansDisbursed' | 'activeLoansCount' | 'loanRepaymentRate' | 'performanceGrade' | 'members' | 'meetings'>): SHG => {
    const nextNum = shgs.length + 5;
    const shgId = `SHG-${shgData.state.slice(0, 2).toUpperCase()}-${String(nextNum).padStart(3, '0')}`;
    const newShg: SHG = {
      ...shgData,
      id: `shg-${Date.now()}`,
      shgId,
      totalGroupSavings: 0,
      totalLoansDisbursed: 0,
      activeLoansCount: 0,
      loanRepaymentRate: 100,
      performanceGrade: 'A',
      members: [],
      meetings: [],
    };

    setShgs((prev) => [newShg, ...prev]);
    return newShg;
  };

  const recordMeeting = (shgId: string, meetingData: { agenda: string; presentMemberIds: string[]; totalCollected: number; minutes: string }) => {
    setShgs((prev) =>
      prev.map((s) => {
        if (s.shgId === shgId) {
          const newMtg = {
            id: `mtg-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            agenda: meetingData.agenda,
            presentMemberIds: meetingData.presentMemberIds,
            totalCollected: meetingData.totalCollected,
            loansApprovedCount: 0,
            minutesOfMeeting: meetingData.minutes,
          };
          return {
            ...s,
            totalGroupSavings: s.totalGroupSavings + meetingData.totalCollected,
            meetings: [newMtg, ...s.meetings],
          };
        }
        return s;
      })
    );
  };

  const recordSavingsDeposit = (depositData: { memberId: string; amount: number; type?: 'Deposit' | 'Withdrawal'; frequency?: 'Daily' | 'Weekly' | 'Monthly'; paymentMode: 'Cash' | 'UPI' | 'Direct Bank Transfer'; notes?: string }): SavingsTransaction => {
    const member = members.find((m) => m.memberId === depositData.memberId);
    if (!member) throw new Error('Member not found');

    const isWithdrawal = depositData.type === 'Withdrawal';
    const delta = isWithdrawal ? -depositData.amount : depositData.amount;
    const newBalance = Math.max(0, member.totalSavings + delta);

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const txnNum = Math.floor(1000 + Math.random() * 9000);
    const txnId = `TXN-SAV-${txnNum}`;
    const rcpNum = `RCP-${dateStr.replace(/-/g, '')}-${txnNum}`;

    const newTxn: SavingsTransaction = {
      id: `sav-${Date.now()}`,
      transactionId: txnId,
      memberId: member.memberId,
      memberName: member.fullName,
      shgId: member.shgId,
      shgName: member.shgName,
      amount: depositData.amount,
      type: depositData.type || 'Deposit',
      frequency: depositData.frequency || 'Weekly',
      date: dateStr,
      receiptNumber: rcpNum,
      recordedBy: currentUser.name,
      recordedRole: currentUser.role,
      paymentMode: depositData.paymentMode,
      balanceAfter: newBalance,
      notes: depositData.notes || 'Savings transaction recorded at field desk.',
    };

    setSavings((prev) => [newTxn, ...prev]);

    // Update member
    setMembers((prev) =>
      prev.map((m) => (m.memberId === member.memberId ? { ...m, totalSavings: newBalance } : m))
    );

    // Update SHG savings
    if (member.shgId) {
      setShgs((prev) =>
        prev.map((s) => {
          if (s.shgId === member.shgId) {
            return {
              ...s,
              totalGroupSavings: Math.max(0, s.totalGroupSavings + delta),
              members: s.members.map((sm) =>
                sm.memberId === member.memberId ? { ...sm, savingsBalance: newBalance } : sm
              ),
            };
          }
          return s;
        })
      );
    }

    return newTxn;
  };

  const submitLoanApplication = (loanData: { memberId: string; shgId: string; loanType: Loan['loanType']; loanAmount: number; purpose: string; tenureMonths: number; annualInterestRate: number; guarantorName: string; guarantorContact: string }): Loan => {
    const member = members.find((m) => m.memberId === loanData.memberId);
    if (!member) throw new Error('Member not found');
    const shg = shgs.find((s) => s.shgId === loanData.shgId);

    // Calculate Monthly EMI using reducing balance formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const monthlyRate = loanData.annualInterestRate / 12 / 100;
    const n = loanData.tenureMonths;
    const emi = Math.round(
      (loanData.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) /
        (Math.pow(1 + monthlyRate, n) - 1)
    );

    const nextIdNum = loans.length + 85;
    const loanId = `LN-2026-${String(nextIdNum).padStart(4, '0')}`;

    // Generate schedule
    const installments = [];
    let curBal = loanData.loanAmount;
    for (let i = 1; i <= n; i++) {
      const interestPart = Math.round(curBal * monthlyRate);
      const principalPart = emi - interestPart;
      curBal = Math.max(0, curBal - principalPart);

      const d = new Date();
      d.setMonth(d.getMonth() + i);
      installments.push({
        installmentNumber: i,
        dueDate: d.toISOString().split('T')[0],
        amount: emi,
        principalComponent: principalPart,
        interestComponent: interestPart,
        status: 'Pending' as const,
      });
    }

    const newLoan: Loan = {
      id: `ln-${Date.now()}`,
      loanId,
      memberId: member.memberId,
      memberName: member.fullName,
      shgId: loanData.shgId,
      shgName: shg ? shg.name : member.shgName,
      loanType: loanData.loanType,
      loanAmount: loanData.loanAmount,
      purpose: loanData.purpose,
      tenureMonths: loanData.tenureMonths,
      annualInterestRate: loanData.annualInterestRate,
      interestType: 'Reducing Balance',
      repaymentFrequency: 'Monthly',
      monthlyEmi: emi,
      status: 'Application Submitted',
      appliedDate: new Date().toISOString().split('T')[0],
      guarantorName: loanData.guarantorName,
      guarantorContact: loanData.guarantorContact,
      supportingDocuments: ['Aadhaar KYC', 'SHG Resolution Copy', 'Income Generating Activity Plan'],
      totalRepaid: 0,
      outstandingBalance: loanData.loanAmount,
      overdueDays: 0,
      approvalHistory: [
        {
          stage: 'Application Submission',
          approvedBy: currentUser.name,
          role: currentUser.role,
          date: new Date().toISOString().split('T')[0],
          notes: 'Loan application registered into digital pipeline.',
        },
      ],
      installments,
    };

    setLoans((prev) => [newLoan, ...prev]);

    return newLoan;
  };

  const advanceLoanWorkflow = (loanId: string, nextStatus: LoanWorkflowStatus, notes?: string) => {
    setLoans((prev) =>
      prev.map((l) => {
        if (l.loanId === loanId) {
          const updatedHistory = [
            ...l.approvalHistory,
            {
              stage: nextStatus,
              approvedBy: currentUser.name,
              role: currentUser.role,
              date: new Date().toISOString().split('T')[0],
              notes: notes || `Moved to ${nextStatus}`,
            },
          ];

          let disbursedDate = l.disbursedDate;
          if (nextStatus === 'Disbursed') {
            disbursedDate = new Date().toISOString().split('T')[0];
            // Update member's active loan amount
            setMembers((mList) =>
              mList.map((m) =>
                m.memberId === l.memberId
                  ? { ...m, activeLoanAmount: m.activeLoanAmount + l.loanAmount }
                  : m
              )
            );
          }

          return {
            ...l,
            status: nextStatus,
            disbursedDate,
            approvalHistory: updatedHistory,
          };
        }
        return l;
      })
    );
  };

  const recordLoanRepayment = (loanId: string, amount: number, paymentMode: string = 'UPI') => {
    setLoans((prev) =>
      prev.map((l) => {
        if (l.loanId === loanId) {
          const newRepaid = l.totalRepaid + amount;
          const newOutstanding = Math.max(0, l.outstandingBalance - amount);
          const isFinished = newOutstanding === 0;

          // Update installment records
          let remainingPayment = amount;
          const updatedInstallments = l.installments.map((inst) => {
            if (inst.status === 'Pending' && remainingPayment >= inst.amount) {
              remainingPayment -= inst.amount;
              return {
                ...inst,
                status: 'Paid' as const,
                paidDate: new Date().toISOString().split('T')[0],
                receiptId: `RCP-EMI-${Date.now().toString().slice(-6)}`,
              };
            }
            return inst;
          });

          // If finished, reduce member's active loan
          if (isFinished) {
            setMembers((mList) =>
              mList.map((m) =>
                m.memberId === l.memberId
                  ? { ...m, activeLoanAmount: Math.max(0, m.activeLoanAmount - l.loanAmount) }
                  : m
              )
            );
          }

          return {
            ...l,
            totalRepaid: newRepaid,
            outstandingBalance: newOutstanding,
            status: isFinished ? 'Completed' : 'In Repayment',
            installments: updatedInstallments,
          };
        }
        return l;
      })
    );
  };

  const enrollInCourse = (memberId: string, courseId: string): TrainingEnrollment => {
    const member = members.find((m) => m.memberId === memberId);
    const course = courses.find((c) => c.courseId === courseId);
    if (!member || !course) throw new Error('Member or course not found');

    const nextNum = enrollments.length + 814;
    const newEnr: TrainingEnrollment = {
      id: `enr-${Date.now()}`,
      enrollmentId: `ENR-2026-${String(nextNum).padStart(4, '0')}`,
      memberId: member.memberId,
      memberName: member.fullName,
      courseId: course.courseId,
      courseTitle: course.title,
      enrolledDate: new Date().toISOString().split('T')[0],
      attendancePercent: 100,
      status: 'In Progress',
    };

    setEnrollments((prev) => [newEnr, ...prev]);

    // Update course enrollments
    setCourses((prev) =>
      prev.map((c) => (c.courseId === courseId ? { ...c, enrolledCount: c.enrolledCount + 1 } : c))
    );

    return newEnr;
  };

  const issueCertificate = (enrollmentId: string, score: number) => {
    setEnrollments((prev) =>
      prev.map((enr) => {
        if (enr.enrollmentId === enrollmentId) {
          const certId = `CERT-SNG-2026-${enr.courseId.slice(4, 6)}-${Math.floor(100 + Math.random() * 900)}`;
          return {
            ...enr,
            assessmentScore: score,
            status: 'Certified',
            certificateId: certId,
            certificateDate: new Date().toISOString().split('T')[0],
          };
        }
        return enr;
      })
    );
  };

  const registerEnterprise = (enterpriseData: Omit<WomanEnterprise, 'id' | 'enterpriseId'>): WomanEnterprise => {
    const nextNum = enterprises.length + 22;
    const newEnt: WomanEnterprise = {
      ...enterpriseData,
      id: `ent-${Date.now()}`,
      enterpriseId: `ENT-2026-${String(nextNum).padStart(4, '0')}`,
    };
    setEnterprises((prev) => [newEnt, ...prev]);
    return newEnt;
  };

  const logFieldVisit = (report: Omit<FieldVisitReport, 'id' | 'date'>) => {
    const newReport: FieldVisitReport = {
      ...report,
      id: `fvr-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setVisitReports((prev) => [newReport, ...prev]);

    // increment visits count on officer
    setFieldOfficers((prev) =>
      prev.map((fo) =>
        fo.id === report.fieldOfficerId ? { ...fo, dailyVisitsCount: fo.dailyVisitsCount + 1 } : fo
      )
    );
  };

  const submitGrievance = (memberId: string, subject: string, category: GrievanceTicket['category'], description: string): GrievanceTicket => {
    const member = members.find((m) => m.memberId === memberId);
    const nextNum = grievances.length + 33;
    const newGrievance: GrievanceTicket = {
      id: `grv-${Date.now()}`,
      ticketId: `GRV-2026-${String(nextNum).padStart(4, '0')}`,
      memberId,
      memberName: member ? member.fullName : 'Registered Member',
      subject,
      category,
      description,
      status: 'Submitted',
      createdDate: new Date().toISOString().split('T')[0],
    };

    setGrievances((prev) => [newGrievance, ...prev]);
    return newGrievance;
  };

  const resolveGrievance = (ticketId: string, resolutionNotes: string) => {
    setGrievances((prev) =>
      prev.map((g) =>
        g.ticketId === ticketId
          ? {
              ...g,
              status: 'Resolved',
              resolvedDate: new Date().toISOString().split('T')[0],
              resolutionNotes,
            }
          : g
      )
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const addLocationEntity = (state: string, district: string, block: string, panchayat: string, village: string) => {
    setLocations((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy[state]) copy[state] = { districts: {} };
      if (!copy[state].districts[district]) copy[state].districts[district] = { blocks: {} };
      if (!copy[state].districts[district].blocks[block]) copy[state].districts[district].blocks[block] = { panchayats: {} };
      if (!copy[state].districts[district].blocks[block].panchayats[panchayat]) {
        copy[state].districts[district].blocks[block].panchayats[panchayat] = [village, 'Ward 1', 'Ward 2'];
      } else if (!copy[state].districts[district].blocks[block].panchayats[panchayat].includes(village)) {
        copy[state].districts[district].blocks[block].panchayats[panchayat].push(village);
      }
      return copy;
    });
  };

  return (
    <DataContext.Provider
      value={{
        locations,
        members,
        shgs,
        savings,
        loans,
        courses,
        enrollments,
        enterprises,
        schemes,
        fieldOfficers,
        visitReports,
        grievances,
        notifications,
        visibleMembers,
        visibleSHGs,
        visibleSavings,
        visibleLoans,
        stats,
        registerMember,
        updateMember,
        createSHG,
        recordMeeting,
        recordSavingsDeposit,
        submitLoanApplication,
        advanceLoanWorkflow,
        recordLoanRepayment,
        enrollInCourse,
        issueCertificate,
        registerEnterprise,
        logFieldVisit,
        submitGrievance,
        resolveGrievance,
        markNotificationRead,
        addLocationEntity,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
