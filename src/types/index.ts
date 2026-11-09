/**
 * SANGINI Platform Type Definitions
 */

export type UserRole =
  | 'Super Admin'
  | 'State Admin'
  | 'District Manager'
  | 'Block Manager'
  | 'Panchayat Coordinator'
  | 'Field Officer'
  | 'SHG President'
  | 'SHG Secretary'
  | 'SHG Treasurer'
  | 'Member';

export interface LocationHierarchy {
  state: string;
  district: string;
  block: string;
  panchayat: string;
  village: string;
  ward?: string;
  pinCode?: string;
}

export interface Member {
  id: string;
  memberId: string; // e.g. SNG-2026-0042
  fullName: string;
  hindiName?: string;
  fatherName: string;
  motherName?: string;
  husbandName?: string;
  dob: string;
  age: number;
  mobile: string;
  alternateMobile?: string;
  email?: string;
  photoUrl: string;
  aadhaarVerified: boolean;
  education: string;
  occupation: string;
  maritalStatus: 'Married' | 'Unmarried' | 'Widow' | 'Divorced';
  location: LocationHierarchy;
  shgId: string;
  shgName: string;
  membershipDate: string;
  registrationDate: string;
  assignedFieldOfficerId: string;
  assignedFieldOfficerName: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  totalSavings: number;
  activeLoanAmount: number;
  creditScore: number;
}

export interface SHGMemberRef {
  memberId: string;
  memberName: string;
  role: 'President' | 'Secretary' | 'Treasurer' | 'Member';
  joinedDate: string;
  mobile: string;
  savingsBalance: number;
}

export interface SHGMeeting {
  id: string;
  date: string;
  agenda: string;
  presentMemberIds: string[];
  totalCollected: number;
  loansApprovedCount: number;
  minutesOfMeeting: string;
}

export interface SHG {
  id: string;
  shgId: string; // e.g. SHG-MP-001
  name: string;
  formationDate: string;
  state: string;
  district: string;
  block: string;
  panchayat: string;
  village: string;
  presidentName: string;
  presidentContact: string;
  secretaryName: string;
  secretaryContact: string;
  treasurerName: string;
  treasurerContact: string;
  bankName: string;
  bankAccountMasked: string;
  ifscCode: string;
  meetingFrequency: 'Weekly' | 'Bi-Weekly' | 'Monthly';
  meetingDay: string;
  meetingTime: string;
  monthlySavingsPerMember: number;
  totalGroupSavings: number;
  totalLoansDisbursed: number;
  activeLoansCount: number;
  loanRepaymentRate: number; // e.g. 98.4%
  performanceGrade: 'A+' | 'A' | 'B' | 'C';
  members: SHGMemberRef[];
  meetings: SHGMeeting[];
}

export interface SavingsTransaction {
  id: string;
  transactionId: string; // e.g. TXN-SAV-1049
  memberId: string;
  memberName: string;
  shgId: string;
  shgName: string;
  amount: number;
  type: 'Deposit' | 'Withdrawal' | 'Interest Credit';
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Ad-hoc';
  date: string;
  receiptNumber: string;
  recordedBy: string;
  recordedRole: string;
  paymentMode: 'Cash' | 'UPI' | 'Direct Bank Transfer';
  balanceAfter: number;
  notes?: string;
}

export interface LoanRepaymentInstallment {
  installmentNumber: number;
  dueDate: string;
  amount: number;
  principalComponent: number;
  interestComponent: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  paidDate?: string;
  receiptId?: string;
}

export type LoanWorkflowStatus =
  | 'Application Submitted'
  | 'Field Verified'
  | 'Block Approved'
  | 'Disbursed'
  | 'In Repayment'
  | 'Completed'
  | 'Rejected';

export interface Loan {
  id: string;
  loanId: string; // e.g. LN-2026-088
  memberId: string;
  memberName: string;
  shgId: string;
  shgName: string;
  loanType:
    | 'Individual Member Loan'
    | 'SHG Group Loan'
    | 'Small Business Loan'
    | 'Emergency Loan'
    | 'Skill Development Loan';
  loanAmount: number;
  purpose: string;
  tenureMonths: number;
  annualInterestRate: number; // e.g. 6.5% reducing or flat
  interestType: 'Reducing Balance' | 'Flat Rate';
  repaymentFrequency: 'Monthly' | 'Weekly';
  monthlyEmi: number;
  status: LoanWorkflowStatus;
  appliedDate: string;
  disbursedDate?: string;
  guarantorName: string;
  guarantorContact: string;
  supportingDocuments: string[];
  totalRepaid: number;
  outstandingBalance: number;
  overdueDays: number;
  approvalHistory: {
    stage: string;
    approvedBy: string;
    role: string;
    date: string;
    notes?: string;
  }[];
  installments: LoanRepaymentInstallment[];
}

export interface TrainingCourse {
  id: string;
  courseId: string;
  title: string;
  hindiTitle: string;
  category:
    | 'Beauty & Salon'
    | 'Tailoring & Textiles'
    | 'Computer Education'
    | 'Digital Marketing'
    | 'Handicrafts & Art'
    | 'Food Processing'
    | 'Agriculture & Allied'
    | 'Women Entrepreneurship'
    | 'Financial Literacy';
  durationWeeks: number;
  trainingCenter: string;
  district: string;
  trainerName: string;
  fees: number;
  isSubsidized: boolean;
  totalSeats: number;
  enrolledCount: number;
  completedCount: number;
  placementCount: number;
  description: string;
}

export interface TrainingEnrollment {
  id: string;
  enrollmentId: string;
  memberId: string;
  memberName: string;
  courseId: string;
  courseTitle: string;
  enrolledDate: string;
  attendancePercent: number;
  assessmentScore?: number;
  status: 'In Progress' | 'Completed' | 'Certified' | 'Placed';
  certificateId?: string;
  certificateDate?: string;
  placedCompany?: string;
  monthlySalary?: number;
}

export interface WomanEnterprise {
  id: string;
  enterpriseId: string;
  businessName: string;
  ownerMemberId: string;
  ownerName: string;
  category: string;
  state: string;
  district: string;
  village: string;
  establishedYear: number;
  productsServices: string[];
  annualTurnover: number;
  fundingRequirement: number;
  fundingReceived: number;
  mentorshipAssigned: string;
  marketLinkage: string;
  womenEmployedCount: number;
  registrationNumber?: string;
}

export interface GovernmentScheme {
  id: string;
  schemeCode: string;
  title: string;
  hindiTitle: string;
  level: 'Central' | 'State';
  category: 'Women Welfare' | 'Financial Inclusion' | 'Entrepreneurship' | 'Skill Development';
  benefitsSummary: string;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  officialUrl: string;
  deadline?: string;
  referralCount: number;
  approvedCount: number;
}

export interface SchemeApplication {
  id: string;
  applicationId: string;
  memberId: string;
  memberName: string;
  schemeCode: string;
  schemeTitle: string;
  appliedDate: string;
  status: 'Application Logged' | 'Documents Verified' | 'Transferred to Department' | 'Sanctioned' | 'Rejected';
  trackingNumber: string;
  remarks?: string;
}

export interface FieldOfficer {
  id: string;
  employeeId: string;
  name: string;
  mobile: string;
  email: string;
  assignedState: string;
  assignedDistrict: string;
  assignedBlocks: string[];
  assignedPanchayats: string[];
  memberTarget: number;
  memberAchieved: number;
  shgTarget: number;
  shgAchieved: number;
  savingsCollectionTarget: number;
  savingsCollectionAchieved: number;
  dailyVisitsCount: number;
  monthlyIncentive: number;
  rating: number;
}

export interface FieldVisitReport {
  id: string;
  date: string;
  fieldOfficerId: string;
  fieldOfficerName: string;
  village: string;
  panchayat: string;
  shgVisited?: string;
  purpose: 'SHG Formation' | 'Savings Collection' | 'Loan Verification' | 'Financial Literacy' | 'Scheme Enrollment';
  womenAttended: number;
  findings: string;
  actionItems: string;
}

export interface GrievanceTicket {
  id: string;
  ticketId: string;
  memberId: string;
  memberName: string;
  subject: string;
  category: 'Savings Discrepancy' | 'Loan Approval Delay' | 'Field Officer Assistance' | 'Certificate Issue' | 'Other';
  description: string;
  status: 'Submitted' | 'In Progress' | 'Resolved';
  createdDate: string;
  resolvedDate?: string;
  resolutionNotes?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  hindiTitle?: string;
  message: string;
  hindiMessage?: string;
  type: 'loan' | 'meeting' | 'savings' | 'scheme' | 'training' | 'grievance';
  channel: 'SMS' | 'WhatsApp' | 'In-App';
  timestamp: string;
  read: boolean;
}
