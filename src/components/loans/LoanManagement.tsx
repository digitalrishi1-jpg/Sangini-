import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Loan, LoanWorkflowStatus } from '../../types';
import {
  CreditCard,
  Calculator,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  Plus,
  ShieldCheck,
  Search,
  DollarSign,
  X,
  FileCheck,
} from 'lucide-react';
import { EmiCalculatorModal } from '../common/EmiCalculatorModal';

export const LoanManagement: React.FC = () => {
  const { language, t } = useLanguage();
  const { currentUser, canApproveLoans } = useAuth();
  const { visibleLoans, submitLoanApplication, advanceLoanWorkflow, recordLoanRepayment, members, shgs } = useData();

  const [activeTab, setActiveTab] = useState<'pipeline' | 'apply' | 'repay'>('pipeline');
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [showEmiModal, setShowEmiModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Loan Application State
  const [memberId, setMemberId] = useState(members[0]?.memberId || '');
  const [shgId, setShgId] = useState(shgs[0]?.shgId || '');
  const [loanType, setLoanType] = useState<Loan['loanType']>('Small Business Loan');
  const [loanAmount, setLoanAmount] = useState<number>(25000);
  const [purpose, setPurpose] = useState('');
  const [tenureMonths, setTenureMonths] = useState<number>(12);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(7.0);
  const [guarantorName, setGuarantorName] = useState('');
  const [guarantorContact, setGuarantorContact] = useState('');

  // Repayment Desk State
  const [repayingLoanId, setRepayingLoanId] = useState<string>('');
  const [repaymentAmount, setRepaymentAmount] = useState<number>(2163);

  const selectedMember = members.find((m) => m.memberId === memberId);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberId || !purpose.trim() || loanAmount <= 0) {
      alert('Please fill out all required loan application details.');
      return;
    }

    submitLoanApplication({
      memberId,
      shgId: selectedMember?.shgId || shgId,
      loanType,
      loanAmount,
      purpose,
      tenureMonths,
      annualInterestRate,
      guarantorName: guarantorName || 'Self / Group Guarantee',
      guarantorContact: guarantorContact || selectedMember?.mobile || '',
    });

    alert('Loan application successfully registered into the SANGINI verification queue.');
    setActiveTab('pipeline');
  };

  const handleRepaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repayingLoanId || repaymentAmount <= 0) {
      alert('Please select a loan and enter repayment amount.');
      return;
    }

    recordLoanRepayment(repayingLoanId, repaymentAmount);
    alert('Repayment recorded successfully and updated on digital passbook.');
    setActiveTab('pipeline');
  };

  const filteredLoans = visibleLoans.filter((l) => {
    if (filterStatus !== 'All' && l.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        l.loanId.toLowerCase().includes(q) ||
        l.memberName.toLowerCase().includes(q) ||
        l.memberId.toLowerCase().includes(q) ||
        l.purpose.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs text-slate-500">
            SANGINI / Microfinance Operations / Credit &amp; Loans
          </div>
          <h1 className="text-2xl font-bold text-indigo-950 font-brand mt-1">
            {language === 'hi' ? 'माइक्रोफाइनेंस एवं ऋण प्रबंधन' : 'Microfinance & Credit Management'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'बहुस्तरीय ऋण स्वीकृति, ईएमआई ट्रैकिंग, पारदर्शी ब्याज दर एवं वसूली प्रबंधन।'
              : 'End-to-end loan lifecycle: Field verification → Block approval → Bank disbursal → EMI repayments.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowEmiModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5 text-pink-600" />
            <span>{language === 'hi' ? 'ईएमआई कैलकुलेटर' : 'EMI Calculator'}</span>
          </button>
          <button
            onClick={() => setActiveTab('apply')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? '+ नया ऋण आवेदन' : '+ Apply for Loan'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'pipeline' ? 'bg-indigo-950 text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {language === 'hi' ? 'ऋण पाइपलाइन (सक्रिय)' : 'Loan Pipeline'} ({visibleLoans.length})
        </button>
        <button
          onClick={() => setActiveTab('apply')}
          className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'apply' ? 'bg-pink-600 text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {language === 'hi' ? 'नया ऋण आवेदन फॉर्म' : 'Application Form'}
        </button>
        <button
          onClick={() => setActiveTab('repay')}
          className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'repay' ? 'bg-purple-700 text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {language === 'hi' ? 'किश्त (EMI) वसूली डेस्क' : 'Repayment Collection Desk'}
        </button>
      </div>

      {activeTab === 'apply' && (
        /* Loan Application Form */
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-indigo-950">
                {language === 'hi' ? 'महिला सदस्या ऋण आवेदन पत्र' : 'Microcredit Application Form'}
              </h2>
              <p className="text-xs text-slate-500">
                Transparent interest rate calculated on reducing balance method.
              </p>
            </div>
          </div>

          <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Select Woman Member (सदस्या का चयन करें) *
              </label>
              <select
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.memberId}>
                    {m.fullName} ({m.memberId}) - SHG: {m.shgName} - Score: {m.creditScore}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Loan Purpose Type *</label>
                <select
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                >
                  <option value="Small Business Loan">Small Business Loan (लघु व्यवसाय)</option>
                  <option value="Individual Member Loan">Individual Member Loan (व्यक्तिगत)</option>
                  <option value="SHG Group Loan">SHG Group Loan (समूह साझा ऋण)</option>
                  <option value="Skill Development Loan">Skill Development Loan (कौशल/मशीन)</option>
                  <option value="Emergency Loan">Emergency Loan (आपातकालीन)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Required Loan Amount (₹) *
                </label>
                <input
                  type="number"
                  required
                  min={2000}
                  max={200000}
                  step={1000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Detailed Purpose &amp; Activity (ऋण का उद्देश्य) *
              </label>
              <textarea
                required
                rows={2}
                placeholder="e.g. Purchase of commercial sewing machine, cloth rolls, and threads for boutique..."
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Tenure (महीने) *</label>
                <select
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                >
                  <option value={6}>6 Months</option>
                  <option value={10}>10 Months</option>
                  <option value={12}>12 Months (1 Year)</option>
                  <option value={18}>18 Months</option>
                  <option value={24}>24 Months (2 Years)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  step={0.1}
                  value={annualInterestRate}
                  onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Guarantor Name (जमानतदार)</label>
                <input
                  type="text"
                  placeholder="e.g. Sunita Devi (SHG President)"
                  value={guarantorName}
                  onChange={(e) => setGuarantorName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Guarantor Contact</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile"
                  value={guarantorContact}
                  onChange={(e) => setGuarantorContact(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                />
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">Compliance &amp; Verification Notice:</span>
              <span>
                All applications require mandatory on-ground verification by the assigned Field Officer and approval by the Block Manager before fund release. Zero processing fee.
              </span>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('pipeline')}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-sm cursor-pointer"
              >
                Submit Loan Application
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'repay' && (
        /* Repayment Collection Desk */
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-indigo-950">
                {language === 'hi' ? 'किश्त (EMI) भुगतान संग्रहण काउंटर' : 'EMI Installment Collection Desk'}
              </h2>
              <p className="text-xs text-slate-500">
                Record monthly installment and automatically update outstanding balance.
              </p>
            </div>
          </div>

          <form onSubmit={handleRepaymentSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Select Active Loan (सक्रिय ऋण चुनें) *
              </label>
              <select
                value={repayingLoanId}
                onChange={(e) => {
                  setRepayingLoanId(e.target.value);
                  const l = visibleLoans.find((item) => item.loanId === e.target.value);
                  if (l) setRepaymentAmount(l.monthlyEmi);
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
              >
                <option value="">-- Select Loan --</option>
                {visibleLoans
                  .filter((l) => l.status === 'In Repayment' || l.status === 'Disbursed')
                  .map((l) => (
                    <option key={l.id} value={l.loanId}>
                      {l.loanId} - {l.memberName} (EMI: ₹{l.monthlyEmi} | Bal: ₹{l.outstandingBalance})
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Installment Amount Paid (जमा राशि ₹) *
              </label>
              <input
                type="number"
                required
                min={100}
                value={repaymentAmount}
                onChange={(e) => setRepaymentAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold text-sm"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('pipeline')}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg shadow-sm cursor-pointer"
              >
                Record Payment &amp; Issue Receipt
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'pipeline' && (
        /* Loan Pipeline Table */
        <div className="space-y-4">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex-1 min-w-[260px] relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={
                  language === 'hi'
                    ? 'ऋण आईडी (LN-...), सदस्या नाम या उद्देश्य से खोजें...'
                    : 'Search by loan ID, member name, or purpose...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-pink-600 text-xs"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Stage:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 cursor-pointer"
              >
                <option value="All">All Stages</option>
                <option value="Application Submitted">Submitted</option>
                <option value="Field Verified">Field Verified</option>
                <option value="Block Approved">Block Approved</option>
                <option value="Disbursed">Disbursed</option>
                <option value="In Repayment">In Repayment</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Loan ID &amp; Member</th>
                    <th className="py-3 px-4">Purpose &amp; Type</th>
                    <th className="py-3 px-4 text-right">Principal</th>
                    <th className="py-3 px-4 text-right">Monthly EMI</th>
                    <th className="py-3 px-4 text-right">Outstanding</th>
                    <th className="py-3 px-4">Workflow Stage</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLoans.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No loans found matching stage or criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredLoans.map((loan) => (
                      <tr key={loan.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-indigo-950 block">
                            {loan.loanId}
                          </span>
                          <span className="font-semibold text-slate-900">{loan.memberName}</span>
                          <span className="text-[10px] text-slate-400 block font-mono">{loan.memberId}</span>
                        </td>

                        <td className="py-3 px-4 max-w-[200px]">
                          <div className="font-medium text-slate-800 truncate" title={loan.purpose}>
                            {loan.purpose}
                          </div>
                          <span className="text-[10px] text-slate-500">{loan.loanType}</span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <span className="font-mono font-bold text-slate-900 text-sm">
                            ₹{loan.loanAmount.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-slate-400 block">{loan.tenureMonths} Mo @ {loan.annualInterestRate}%</span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <span className="font-mono font-bold text-pink-700 text-sm">
                            ₹{loan.monthlyEmi.toLocaleString('en-IN')}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <span className="font-mono font-bold text-amber-700 text-sm">
                            ₹{loan.outstandingBalance.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            Repaid: ₹{loan.totalRepaid.toLocaleString('en-IN')}
                          </span>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold border ${
                              loan.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : loan.status === 'In Repayment'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : loan.status === 'Block Approved'
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : loan.status === 'Field Verified'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {loan.status}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Workflow Advance Button for authorized roles */}
                            {canApproveLoans && loan.status === 'Application Submitted' && (
                              <button
                                onClick={() => advanceLoanWorkflow(loan.loanId, 'Field Verified', 'Verified by Field Officer')}
                                className="px-2 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-[10px] font-semibold cursor-pointer"
                              >
                                Field Verify
                              </button>
                            )}

                            {canApproveLoans && loan.status === 'Field Verified' && (
                              <button
                                onClick={() => advanceLoanWorkflow(loan.loanId, 'Block Approved', 'Approved by Block Lead')}
                                className="px-2 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded text-[10px] font-semibold cursor-pointer"
                              >
                                Block Approve
                              </button>
                            )}

                            {canApproveLoans && loan.status === 'Block Approved' && (
                              <button
                                onClick={() => advanceLoanWorkflow(loan.loanId, 'Disbursed', 'Direct Bank Disbursal')}
                                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-semibold cursor-pointer"
                              >
                                Disburse Funds
                              </button>
                            )}

                            <button
                              onClick={() => setSelectedLoan(loan)}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-semibold cursor-pointer"
                            >
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Loan Details Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 border border-slate-200 text-xs space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="font-mono text-pink-700 font-bold">{selectedLoan.loanId}</span>
                <h3 className="font-bold text-slate-900 text-sm">Loan Dossier &amp; Repayment Ledger</h3>
              </div>
              <button onClick={() => setSelectedLoan(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Borrower</span>
                <span className="font-bold text-slate-900">{selectedLoan.memberName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">SHG Collective</span>
                <span className="font-medium text-slate-800">{selectedLoan.shgName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Sanctioned Amount</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  ₹{selectedLoan.loanAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Monthly EMI</span>
                <span className="font-mono font-bold text-pink-700 text-sm">
                  ₹{selectedLoan.monthlyEmi.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Approval Audit Trail */}
            <div className="space-y-2">
              <span className="font-bold text-slate-800 block text-xs">Approval Audit Trail:</span>
              <div className="space-y-1.5">
                {selectedLoan.approvalHistory.map((step, idx) => (
                  <div key={idx} className="p-2 bg-white rounded border border-slate-200 text-[11px] flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-indigo-950">{step.stage}</span>
                      <span className="text-slate-400 block text-[10px]">{step.notes}</span>
                    </div>
                    <div className="text-right text-[10px] text-slate-500">
                      <div>{step.approvedBy}</div>
                      <div>{step.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedLoan(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EMI Calculator Modal */}
      {showEmiModal && (
        <EmiCalculatorModal
          onClose={() => setShowEmiModal(false)}
          onApplyLoan={(amt, ten, rt) => {
            setLoanAmount(amt);
            setTenureMonths(ten);
            setAnnualInterestRate(rt);
            setActiveTab('apply');
          }}
        />
      )}
    </div>
  );
};
