import React from 'react';
import { SavingsTransaction } from '../../types';
import { QrCodeSvg } from './QrCodeSvg';
import { X, Printer, CheckCircle, Receipt } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ReceiptModalProps {
  transaction: SavingsTransaction;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ transaction, onClose }) => {
  const { language } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  const getAmountInWords = (num: number): string => {
    // Simple converter for demo receipts
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    if (num === 0) return 'Zero Rupees Only';
    if (num >= 1000) {
      const thousands = Math.floor(num / 1000);
      const rem = num % 1000;
      return `${a[thousands]}Thousand ${rem > 0 ? getAmountInWords(rem) : 'Rupees Only'}`;
    }
    if (num >= 100) {
      const hundreds = Math.floor(num / 100);
      const rem = num % 100;
      return `${a[hundreds]}Hundred ${rem > 0 ? getAmountInWords(rem) : 'Rupees Only'}`;
    }
    if (num >= 20) {
      const tens = Math.floor(num / 10);
      const units = num % 10;
      return `${b[tens]} ${a[units]}Rupees Only`;
    }
    return `${a[num]}Rupees Only`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 no-print">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-indigo-700" />
            <h3 className="font-semibold text-slate-900 text-sm">
              {language === 'hi' ? 'आधिकारिक वित्तीय रसीद' : 'Official Financial Receipt'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'प्रिंट रसीद' : 'Print Receipt'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="p-6 bg-slate-100/60 flex justify-center printable-area">
          <div className="w-[420px] bg-white border border-slate-300 rounded-xl p-5 shadow-sm space-y-4 text-slate-900 font-sans">
            {/* Header */}
            <div className="text-center pb-3 border-b border-dashed border-slate-300">
              <div className="text-xs font-bold text-pink-600 uppercase tracking-widest">
                SANGINI WOMEN EMPOWERMENT
              </div>
              <h2 className="text-xl font-extrabold tracking-tight text-indigo-950 font-brand">
                संगिनी बचत एवं ऋण पावती
              </h2>
              <p className="text-[11px] text-slate-500">
                Official Digital Deposit & Savings Confirmation Receipt
              </p>
            </div>

            {/* Receipt & Txn Meta */}
            <div className="grid grid-cols-2 text-xs bg-slate-50 p-2.5 rounded border border-slate-200 gap-y-1">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Receipt No:</span>
                <span className="font-mono font-bold text-indigo-900">{transaction.receiptNumber}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Transaction ID:</span>
                <span className="font-mono text-slate-800">{transaction.transactionId}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Date & Mode:</span>
                <span className="text-slate-800">{transaction.date} · {transaction.paymentMode}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Transaction Type:</span>
                <span className="font-semibold text-emerald-700">{transaction.type}</span>
              </div>
            </div>

            {/* Member and SHG info */}
            <div className="text-xs space-y-1.5">
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">Member Name:</span>
                <span className="font-bold text-slate-900">{transaction.memberName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">Member ID:</span>
                <span className="font-mono font-medium text-slate-800">{transaction.memberId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">SHG Name:</span>
                <span className="font-medium text-slate-800">{transaction.shgName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">Deposit Frequency:</span>
                <span className="text-slate-800">{transaction.frequency}</span>
              </div>
            </div>

            {/* Big Amount Box */}
            <div className="bg-pink-50/80 border border-pink-200 rounded-lg p-3 text-center">
              <span className="text-[11px] text-pink-700 font-semibold block uppercase">
                Amount Received (राशि प्राप्त)
              </span>
              <div className="text-3xl font-extrabold text-pink-700 font-mono tabular-nums">
                ₹{transaction.amount.toLocaleString('en-IN')}
              </div>
              <div className="text-xs italic text-pink-900 mt-1">
                {getAmountInWords(transaction.amount)}
              </div>
            </div>

            {/* Updated Balance */}
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-200 text-xs">
              <span className="text-slate-600 font-medium">New Savings Balance (अद्यतन बचत):</span>
              <span className="font-bold font-mono text-indigo-950 text-sm">
                ₹{transaction.balanceAfter.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Signatures & QR */}
            <div className="flex items-end justify-between pt-2 border-t border-dashed border-slate-300">
              <div className="space-y-1">
                <div className="text-[10px] text-slate-500">
                  Recorded By: <span className="font-semibold text-slate-800">{transaction.recordedBy}</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Role: {transaction.recordedRole}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium mt-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Digitally Authorized Entry</span>
                </div>
              </div>

              <div className="border border-slate-200 p-1 rounded bg-white">
                <QrCodeSvg
                  value={`https://sangini.org/verify/receipt/${transaction.transactionId}`}
                  size={58}
                />
              </div>
            </div>

            <div className="text-[9px] text-center text-slate-400 pt-1">
              Thank you for contributing to your self-reliance and group strength.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
