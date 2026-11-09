import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Member, GrievanceTicket } from '../../types';
import {
  User,
  CreditCard,
  DollarSign,
  Award,
  BookOpen,
  FileText,
  AlertCircle,
  Download,
  Calendar,
  CheckCircle,
  MessageSquare,
  ShieldCheck,
  Send,
  Printer,
  ChevronRight,
  Phone,
} from 'lucide-react';
import { DigitalCardModal } from '../common/DigitalCardModal';
import { ReceiptModal } from '../common/ReceiptModal';
import { CertificateModal } from '../common/CertificateModal';

export const MemberPortal: React.FC = () => {
  const { language, t } = useLanguage();
  const { currentUser } = useAuth();
  const {
    members,
    shgs,
    savings,
    loans,
    enrollments,
    schemes,
    grievances,
    submitGrievance,
  } = useData();

  // Active member profile: default to Meena Bai or Sunita Devi or current assigned
  const activeMember =
    members.find((m) => m.memberId === currentUser.assignedMemberId) ||
    members.find((m) => m.memberId === 'SNG-2026-0042') ||
    members[0];

  const activeShg = shgs.find((s) => s.shgId === activeMember.shgId);
  const memberSavings = savings.filter((s) => s.memberId === activeMember.memberId);
  const memberLoans = loans.filter((l) => l.memberId === activeMember.memberId);
  const memberEnrollments = enrollments.filter((e) => e.memberId === activeMember.memberId);
  const memberGrievances = grievances.filter((g) => g.memberId === activeMember.memberId);

  // Modals state
  const [showIdCard, setShowIdCard] = useState(false);
  const [selectedTxnForReceipt, setSelectedTxnForReceipt] = useState<any>(null);
  const [selectedEnrollmentForCert, setSelectedEnrollmentForCert] = useState<any>(null);

  // Grievance form
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<GrievanceTicket['category']>('Savings Discrepancy');
  const [description, setDescription] = useState('');

  // Mobile OTP simulation banner
  const [isOtpVerified, setIsOtpVerified] = useState(true);

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      alert('Please fill out the complaint subject and details.');
      return;
    }

    submitGrievance(activeMember.memberId, subject.trim(), category, description.trim());
    alert('Your grievance ticket has been registered. You will receive an SMS update within 24 hours.');
    setSubject('');
    setDescription('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Top Banner: Member Welcome Header */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={activeMember.photoUrl}
                alt={activeMember.fullName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white/30 shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 right-0 bg-emerald-500 text-white rounded-full p-1 border-2 border-white">
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full font-mono">
                  {activeMember.memberId}
                </span>
                <span className="text-xs text-pink-200">
                  {language === 'hi' ? 'सक्रिय सदस्या' : 'Active Member'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-brand">
                {activeMember.fullName}
              </h1>
              {activeMember.hindiName && (
                <div className="text-sm font-hindi text-pink-200">{activeMember.hindiName}</div>
              )}
              <p className="text-xs text-slate-200">
                {activeMember.shgName} · {activeMember.location.village}, {activeMember.location.district}
              </p>
            </div>
          </div>

          {/* Quick Member Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowIdCard(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-white text-pink-700 hover:bg-pink-50 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>{language === 'hi' ? 'डिजिटल पहचान पत्र' : 'Download Digital ID'}</span>
            </button>
          </div>
        </div>

        {/* 3 Personal Member Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/15">
            <span className="text-slate-300 block text-[11px] uppercase">
              {language === 'hi' ? 'कुल संचित व्यक्तिगत बचत' : 'Total Personal Savings'}
            </span>
            <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
              ₹{activeMember.totalSavings.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-pink-300 mt-0.5 block">Passbook verified</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/15">
            <span className="text-slate-300 block text-[11px] uppercase">
              {language === 'hi' ? 'सक्रिय ऋण शेष (Active Loan)' : 'Active Loan Balance'}
            </span>
            <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
              ₹{activeMember.activeLoanAmount.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-emerald-300 mt-0.5 block">Zero default record</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/15">
            <span className="text-slate-300 block text-[11px] uppercase">
              {language === 'hi' ? 'समूह बैठक का दिन' : 'Weekly SHG Meeting'}
            </span>
            <div className="text-base font-bold text-white mt-1">
              {activeShg?.meetingDay || 'Every Tuesday'}
            </div>
            <span className="text-[10px] text-slate-300 mt-0.5 block">
              Time: {activeShg?.meetingTime || '03:00 PM'} @ Panchayat
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Savings Passbook & Active Loans */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Digital Passbook */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                {language === 'hi' ? 'डिजिटल बचत पासबुक (Savings Passbook)' : 'Digital Savings Passbook'}
              </h3>
              <p className="text-xs text-slate-500">
                Official statement of all weekly thrift deposits and interest credits.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Available Balance</span>
              <span className="font-mono font-bold text-emerald-700 text-base">
                ₹{activeMember.totalSavings.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Transaction ID</th>
                  <th className="py-2.5 px-3">Type / Mode</th>
                  <th className="py-2.5 px-3 text-right">Deposit (₹)</th>
                  <th className="py-2.5 px-3 text-right">Balance</th>
                  <th className="py-2.5 px-3 text-center">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {memberSavings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-400">
                      No savings entries found.
                    </td>
                  </tr>
                ) : (
                  memberSavings.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/50">
                      <td className="py-2 px-3">{s.date}</td>
                      <td className="py-2 px-3 font-mono font-bold text-indigo-950">
                        {s.transactionId}
                      </td>
                      <td className="py-2 px-3">
                        <span className="font-medium">{s.type}</span>
                        <span className="text-slate-400 block text-[10px]">{s.paymentMode}</span>
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">
                        +₹{s.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                        ₹{s.balanceAfter.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <button
                          onClick={() => setSelectedTxnForReceipt(s)}
                          className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded text-[10px] font-semibold cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Loan Dossier & EMI Schedule */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                {language === 'hi' ? 'मेरा ऋण एवं किश्त विवरण (My Loans)' : 'My Loans & Repayments'}
              </h3>
              <p className="text-xs text-slate-500">Live approval stage &amp; EMI due tracking.</p>
            </div>
          </div>

          {memberLoans.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400 space-y-2">
              <p>You have no active loans right now.</p>
              <p className="text-[11px] text-pink-700 font-semibold">
                You are pre-qualified for up to ₹25,000 microloan with your regular SHG savings track record!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {memberLoans.map((loan) => (
                <div key={loan.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-pink-700 font-bold">{loan.loanId}</span>
                      <h4 className="font-bold text-slate-900 text-sm">{loan.loanType}</h4>
                    </div>
                    <span className="px-2.5 py-0.5 bg-purple-100 text-purple-900 rounded font-semibold text-[11px]">
                      {loan.status}
                    </span>
                  </div>

                  <p className="text-slate-600 text-[11px]">{loan.purpose}</p>

                  <div className="grid grid-cols-2 gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Monthly EMI</span>
                      <span className="font-mono font-bold text-pink-700 text-sm">
                        ₹{loan.monthlyEmi.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Outstanding</span>
                      <span className="font-mono font-bold text-amber-700 text-sm">
                        ₹{loan.outstandingBalance.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Installments preview */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Upcoming Installment:</span>
                    <div className="flex justify-between items-center bg-white p-2 rounded border border-slate-200">
                      <span className="font-medium text-slate-800">Due: 20th Nov 2026</span>
                      <span className="font-mono font-bold text-pink-700">₹{loan.monthlyEmi}</span>
                      <span className="text-[10px] text-amber-700 font-semibold">Upcoming</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Row 2: Skill Certificates & Grievance Redressal Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Certificates */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                {language === 'hi' ? 'मेरे कौशल प्रमाण पत्र (My Certificates)' : 'My Vocational Diplomas & Certificates'}
              </h3>
              <p className="text-xs text-slate-500">QR-verifiable credentials issued by SANGINI.</p>
            </div>
            <Award className="w-5 h-5 text-amber-600" />
          </div>

          {memberEnrollments.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">
              No vocational course completions recorded yet.
            </p>
          ) : (
            <div className="space-y-3">
              {memberEnrollments.map((enr) => (
                <div
                  key={enr.id}
                  className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200 text-xs flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900">{enr.courseTitle}</div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      Certificate ID: {enr.certificateId || 'In Progress'}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold">
                      Completed with Grade A (Score: {enr.assessmentScore || 92}%)
                    </div>
                  </div>
                  {enr.certificateId && (
                    <button
                      onClick={() => setSelectedEnrollmentForCert(enr)}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold text-xs cursor-pointer"
                    >
                      View &amp; Print
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Grievance & Feedback Submission */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                {language === 'hi' ? 'शिकायत निवारण एवं फीडबैक (Grievance Helpdesk)' : 'Grievance Redressal & Helpdesk'}
              </h3>
              <p className="text-xs text-slate-500">
                Direct escalated reporting to the District Mission Lead.
              </p>
            </div>
            <MessageSquare className="w-5 h-5 text-pink-600" />
          </div>

          <form onSubmit={handleGrievanceSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Subject / Issue Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Deposit entry SMS not received"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
              >
                <option value="Savings Discrepancy">Savings Discrepancy (बचत में अंतर)</option>
                <option value="Loan Approval Delay">Loan Approval Delay (ऋण में देरी)</option>
                <option value="Field Officer Assistance">Field Officer Assistance (अधिकारी सहायता)</option>
                <option value="Certificate Issue">Certificate Issue (प्रमाण पत्र)</option>
                <option value="Other">Other Issues (अन्य)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Description *</label>
              <textarea
                rows={2}
                required
                placeholder="Please describe your problem or feedback in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Grievance Ticket</span>
              </button>
            </div>
          </form>

          {/* Past tickets */}
          {memberGrievances.length > 0 && (
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <span className="font-bold text-slate-800 block text-[11px]">Recent Tickets:</span>
              {memberGrievances.map((g) => (
                <div key={g.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-slate-900 block">{g.subject}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{g.ticketId} · {g.createdDate}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      g.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {g.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showIdCard && (
        <DigitalCardModal member={activeMember} onClose={() => setShowIdCard(false)} />
      )}
      {selectedTxnForReceipt && (
        <ReceiptModal
          transaction={selectedTxnForReceipt}
          onClose={() => setSelectedTxnForReceipt(null)}
        />
      )}
      {selectedEnrollmentForCert && (
        <CertificateModal
          enrollment={selectedEnrollmentForCert}
          onClose={() => setSelectedEnrollmentForCert(null)}
        />
      )}
    </div>
  );
};
