import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, X, Check, Lock } from 'lucide-react';

export const PrivacyConsentBanner: React.FC = () => {
  const { language } = useLanguage();
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem('sangini_dpdpa_consent') === 'true';
  });
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  const handleAccept = () => {
    localStorage.setItem('sangini_dpdpa_consent', 'true');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <>
      <div className="fixed bottom-3 left-3 right-3 sm:left-6 sm:right-6 md:max-w-2xl md:ml-auto z-40 bg-slate-900/95 text-white p-4 rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur-md text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in slide-in-from-bottom-4 duration-300 no-print">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-pink-500/20 text-pink-400 rounded-lg shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <span className="font-bold text-white text-xs block">
              {language === 'hi'
                ? 'डिजिटल व्यक्तिगत डेटा संरक्षण (DPDPA 2023) अनुपालन'
                : 'Digital Personal Data Protection (DPDPA 2023) Compliance'}
            </span>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {language === 'hi'
                ? 'संगिनी पर सदस्याओं के सभी व्यक्तिगत व वित्तीय रिकॉर्ड सुरक्षित एवं एन्क्रिप्टेड हैं। हम कभी भी व्यक्तिगत जानकारी किसी तीसरे पक्ष के साथ साझा नहीं करते हैं।'
                : 'SANGINI safeguards all rural women’s personal and financial records under India’s DPDPA 2023. Explicit consent is recorded for group passbook access.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            onClick={() => setShowPolicyModal(true)}
            className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
          >
            Policy
          </button>
          <button
            onClick={handleAccept}
            className="px-3 py-1.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Accept &amp; Continue
          </button>
        </div>
      </div>

      {showPolicyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 text-xs space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-pink-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  SANGINI Privacy Policy &amp; Data Rights
                </h3>
              </div>
              <button
                onClick={() => setShowPolicyModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-slate-700 text-xs leading-relaxed">
              <p>
                <strong>1. Data Fiduciary Identity:</strong> SANGINI Women Empowerment Organization operates as the registered data fiduciary for all member and SHG records.
              </p>
              <p>
                <strong>2. Purpose Limitation:</strong> Information collected (Name, Father/Husband Name, Age, Location, Bank Details) is strictly utilized for SHG formation, credit scoring, microloan disbursement, and training certifications.
              </p>
              <p>
                <strong>3. Aadhaar Verification Policy:</strong> Physical Aadhaar cards are sighted exclusively for visual KYC verification by authorized field staff; Aadhaar numbers are never stored in raw form in adherence to Supreme Court guidelines.
              </p>
              <p>
                <strong>4. Right to Correction &amp; Erasure:</strong> Any member can request correction or deletion of inactive records through their assigned Field Officer or the Grievance Redressal desk.
              </p>
              <p>
                <strong>5. Data Protection Officer (DPO):</strong> contact@sangini.org · Toll-Free: 1800-SANGINI.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setShowPolicyModal(false);
                  handleAccept();
                }}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg cursor-pointer"
              >
                I Understand &amp; Agree
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
