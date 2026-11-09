import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { SavingsTransaction } from '../../types';
import {
  DollarSign,
  Receipt,
  Search,
  Filter,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  Printer,
  Calendar,
  CheckCircle,
  Building,
} from 'lucide-react';
import { ReceiptModal } from '../common/ReceiptModal';

export const SavingsManagement: React.FC = () => {
  const { language, t } = useLanguage();
  const { visibleSavings, recordSavingsDeposit, members, shgs } = useData();

  const [activeTab, setActiveTab] = useState<'transactions' | 'deposit'>('transactions');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedTxnForReceipt, setSelectedTxnForReceipt] = useState<SavingsTransaction | null>(null);

  // Form state for new deposit
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.memberId || '');
  const [amount, setAmount] = useState<number>(500);
  const [type, setType] = useState<'Deposit' | 'Withdrawal'>('Deposit');
  const [frequency, setFrequency] = useState<'Daily' | 'Weekly' | 'Monthly'>('Weekly');
  const [paymentMode, setPaymentMode] = useState<'Cash' | 'UPI' | 'Direct Bank Transfer'>('Cash');
  const [notes, setNotes] = useState('');

  const selectedMember = members.find((m) => m.memberId === selectedMemberId);

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMemberId || amount <= 0) {
      alert('Please select a member and enter a valid positive amount.');
      return;
    }

    const newTxn = recordSavingsDeposit({
      memberId: selectedMemberId,
      amount,
      type,
      frequency,
      paymentMode,
      notes: notes.trim() || undefined,
    });

    setSelectedTxnForReceipt(newTxn);
    setActiveTab('transactions');
  };

  const filtered = visibleSavings.filter((s) => {
    if (typeFilter !== 'All' && s.type !== typeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.memberName.toLowerCase().includes(q) ||
        s.memberId.toLowerCase().includes(q) ||
        s.transactionId.toLowerCase().includes(q) ||
        s.receiptNumber.toLowerCase().includes(q) ||
        s.shgName.toLowerCase().includes(q)
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
            SANGINI / Microfinance Operations / Savings Ledger
          </div>
          <h1 className="text-2xl font-bold text-indigo-950 font-brand mt-1">
            {language === 'hi' ? 'डिजिटल बचत प्रबंधन एवं लेजर' : 'Digital Savings Management & Ledger'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'दैनिक, साप्ताहिक एवं मासिक बचत प्रविष्टि, रसीद सृजन एवं समूह बचत पासबुक।'
              : 'Real-time thrift deposits, unique transaction tracking, and instant verifiable digital receipts.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'transactions'
                ? 'bg-indigo-950 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {language === 'hi' ? 'लेनदेन विवरण' : 'Transactions'} ({visibleSavings.length})
          </button>
          <button
            onClick={() => setActiveTab('deposit')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'deposit'
                ? 'bg-pink-600 text-white'
                : 'bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'बचत जमा दर्ज करें' : '+ Record Deposit'}</span>
          </button>
        </div>
      </div>

      {activeTab === 'deposit' ? (
        /* Deposit Desk Form */
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-indigo-950">
                {language === 'hi' ? 'बचत जमा / निकासी काउंटर' : 'Record Savings Deposit / Withdrawal'}
              </h2>
              <p className="text-xs text-slate-500">
                Generate an immediate numbered receipt with timestamp and cashier signoff.
              </p>
            </div>
          </div>

          <form onSubmit={handleDepositSubmit} className="space-y-5 text-xs">
            {/* Member Selector */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Select Woman Member (सदस्या का चयन करें) *
              </label>
              <select
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.memberId}>
                    {m.fullName} ({m.memberId}) - {m.shgName} - {m.location.village} (Bal: ₹{m.totalSavings})
                  </option>
                ))}
              </select>
            </div>

            {selectedMember && (
              <div className="p-3 bg-pink-50/70 rounded-xl border border-pink-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-pink-900 uppercase font-bold block">Current Savings Balance:</span>
                  <span className="font-mono font-extrabold text-pink-700 text-base">
                    ₹{selectedMember.totalSavings.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-right text-[11px] text-slate-600">
                  <div>SHG: {selectedMember.shgName}</div>
                  <div>Village: {selectedMember.location.village}</div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Transaction Type (प्रकार)
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                >
                  <option value="Deposit">Deposit (जमा)</option>
                  <option value="Withdrawal">Withdrawal (निकासी)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Amount in Rupees (राशि ₹) *
                </label>
                <input
                  type="number"
                  required
                  min={50}
                  step={50}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Cadence / Frequency (आवृत्ति)
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                >
                  <option value="Weekly">Weekly Thrift (साप्ताहिक)</option>
                  <option value="Monthly">Monthly Thrift (मासिक)</option>
                  <option value="Daily">Daily Thrift (दैनिक)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Payment Mode (भुगतान माध्यम)
                </label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                >
                  <option value="Cash">Cash (नकद - बैठक में)</option>
                  <option value="UPI">UPI (डिजिटल क्यूआर)</option>
                  <option value="Direct Bank Transfer">Bank Transfer (बैंक खाता)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Notes / Purpose (टिप्पणी)
              </label>
              <input
                type="text"
                placeholder="Optional notes or meeting resolution reference"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('transactions')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-sm cursor-pointer"
              >
                Confirm &amp; Print Official Receipt
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Transactions List View */
        <div className="space-y-4">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex-1 min-w-[260px] relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={
                  language === 'hi'
                    ? 'सदस्या नाम, रसीद नंबर या TXN ID से खोजें...'
                    : 'Search by member, receipt no, or TXN ID...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-pink-600 text-xs"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Deposit">Deposits Only</option>
                <option value="Withdrawal">Withdrawals</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-3 px-4">TXN ID &amp; Receipt</th>
                    <th className="py-3 px-4">Member Name</th>
                    <th className="py-3 px-4">SHG Collective</th>
                    <th className="py-3 px-4">Date &amp; Mode</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4 text-right">Balance After</th>
                    <th className="py-3 px-4 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No transactions found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="font-mono font-bold text-indigo-950 block">
                            {t.transactionId}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {t.receiptNumber}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{t.memberName}</div>
                          <span className="text-[10px] text-slate-400 font-mono">{t.memberId}</span>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-medium text-slate-800 truncate max-w-[180px]">
                            {t.shgName}
                          </div>
                          <span className="text-[10px] text-slate-400">{t.frequency}</span>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="font-medium text-slate-800">{t.date}</div>
                          <span className="text-[10px] text-slate-500">{t.paymentMode}</span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <span
                            className={`font-mono font-bold text-sm ${
                              t.type === 'Withdrawal' ? 'text-amber-700' : 'text-emerald-700'
                            }`}
                          >
                            {t.type === 'Withdrawal' ? '-' : '+'}₹{t.amount.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-slate-400 block">{t.type}</span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <span className="font-mono font-bold text-slate-900 text-sm">
                            ₹{t.balanceAfter.toLocaleString('en-IN')}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => setSelectedTxnForReceipt(t)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-lg font-semibold text-[11px] border border-indigo-200 transition-colors cursor-pointer"
                            title="Print Official Receipt"
                          >
                            <Receipt className="w-3.5 h-3.5" />
                            <span>Receipt</span>
                          </button>
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

      {/* Official Receipt Modal */}
      {selectedTxnForReceipt && (
        <ReceiptModal
          transaction={selectedTxnForReceipt}
          onClose={() => setSelectedTxnForReceipt(null)}
        />
      )}
    </div>
  );
};
