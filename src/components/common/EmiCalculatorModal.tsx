import React, { useState } from 'react';
import { X, Calculator, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface EmiCalculatorModalProps {
  onClose: () => void;
  onApplyLoan?: (amount: number, tenure: number, rate: number) => void;
}

export const EmiCalculatorModal: React.FC<EmiCalculatorModalProps> = ({ onClose, onApplyLoan }) => {
  const { language } = useLanguage();
  const [amount, setAmount] = useState<number>(25000);
  const [tenure, setTenure] = useState<number>(12);
  const [rate, setRate] = useState<number>(7.0);
  const [calcType, setCalcType] = useState<'reducing' | 'flat'>('reducing');

  // Reducing Balance calculation
  const monthlyRate = rate / 12 / 100;
  const emiReducing = Math.round(
    (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1)
  );
  const totalAmountReducing = emiReducing * tenure;
  const totalInterestReducing = totalAmountReducing - amount;

  // Flat Rate calculation
  const totalInterestFlat = Math.round((amount * rate * (tenure / 12)) / 100);
  const totalAmountFlat = amount + totalInterestFlat;
  const emiFlat = Math.round(totalAmountFlat / tenure);

  const activeEmi = calcType === 'reducing' ? emiReducing : emiFlat;
  const activeInterest = calcType === 'reducing' ? totalInterestReducing : totalInterestFlat;
  const activeTotal = calcType === 'reducing' ? totalAmountReducing : totalAmountFlat;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-pink-600" />
            <h3 className="font-semibold text-slate-900 text-sm">
              {language === 'hi' ? 'संगिनी पारदर्शी ईएमआई (EMI) कैलकुलेटर' : 'SANGINI Transparent EMI Calculator'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Calculation Type Toggle */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setCalcType('reducing')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                calcType === 'reducing'
                  ? 'bg-white text-pink-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'hi' ? 'घटती शेष पद्धति (Reducing Balance - अनुशंसित)' : 'Reducing Balance (Standard)'}
            </button>
            <button
              onClick={() => setCalcType('flat')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                calcType === 'flat'
                  ? 'bg-white text-pink-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'hi' ? 'समान दर (Flat Rate)' : 'Flat Rate'}
            </button>
          </div>

          {/* Amount Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-700">
                {language === 'hi' ? 'ऋण राशि / Loan Amount' : 'Loan Amount'}
              </span>
              <span className="font-mono font-bold text-pink-700 text-base">
                ₹{amount.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={150000}
              step={2500}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>₹5,000</span>
              <span>₹50,000</span>
              <span>₹1,50,000</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-700">
                {language === 'hi' ? 'अवधि / Tenure (महीने)' : 'Repayment Tenure (Months)'}
              </span>
              <span className="font-mono font-bold text-indigo-900 text-base">
                {tenure} {language === 'hi' ? 'माह' : 'Months'}
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={36}
              step={1}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>3 Months</span>
              <span>12 Months</span>
              <span>24 Months</span>
              <span>36 Months</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-700">
                {language === 'hi' ? 'वार्षिक ब्याज दर / Annual Interest Rate' : 'Annual Interest Rate (%)'}
              </span>
              <span className="font-mono font-bold text-emerald-700 text-base">
                {rate.toFixed(1)}% p.a.
              </span>
            </div>
            <input
              type="range"
              min={4.0}
              max={12.0}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>4.0% (Subsidized)</span>
              <span>7.0% (NRLM/SHG Norm)</span>
              <span>12.0%</span>
            </div>
          </div>

          {/* Results Display */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-semibold block">
                {language === 'hi' ? 'मासिक किश्त (EMI)' : 'Monthly EMI'}
              </span>
              <span className="text-xl font-bold font-mono text-pink-700 tabular-nums">
                ₹{activeEmi.toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-semibold block">
                {language === 'hi' ? 'कुल ब्याज' : 'Total Interest'}
              </span>
              <span className="text-xl font-bold font-mono text-indigo-900 tabular-nums">
                ₹{activeInterest.toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-semibold block">
                {language === 'hi' ? 'कुल भुगतान' : 'Total Payable'}
              </span>
              <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                ₹{activeTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Compliance transparency disclaimer */}
          <div className="bg-emerald-50 text-emerald-900 text-[11px] p-2.5 rounded-lg border border-emerald-200 flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              {language === 'hi'
                ? 'पारदर्शिता की गारंटी: कोई भी छिपा हुआ शुल्क या प्रोसेसिंग फीस नहीं ली जाती है। ब्याज केवल वास्तविक शेष राशि पर लागू होता है।'
                : 'Zero Hidden Fees Guarantee: SANGINI microloans operate strictly per RBI Fair Practices Code for SHGs. No hidden prepayment penalty.'}
            </span>
          </div>

          {/* Action button */}
          {onApplyLoan && (
            <button
              onClick={() => {
                onApplyLoan(amount, tenure, rate);
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <span>{language === 'hi' ? 'इस योजना पर ऋण आवेदन प्रारंभ करें' : 'Apply for Loan with these terms'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
