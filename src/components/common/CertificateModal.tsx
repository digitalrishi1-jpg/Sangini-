import React from 'react';
import { TrainingEnrollment } from '../../types';
import { QrCodeSvg } from './QrCodeSvg';
import { X, Printer, Award, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface CertificateModalProps {
  enrollment: TrainingEnrollment;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ enrollment, onClose }) => {
  const { language } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 no-print">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-slate-900 text-sm">
              {language === 'hi' ? 'डिजिटल कौशल प्रमाण पत्र' : 'Digital Skill Vocational Certificate'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'सर्टिफिकेट प्रिंट करें' : 'Print Certificate'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Surface */}
        <div className="p-8 bg-slate-100 flex justify-center printable-area">
          <div className="w-[580px] bg-[#fdfbf7] border-8 border-double border-amber-800/40 rounded-lg p-8 relative shadow-md text-slate-900 font-sans">
            {/* Corner embellishments */}
            <div className="absolute top-2 left-2 text-amber-700/50 text-xs">✦</div>
            <div className="absolute top-2 right-2 text-amber-700/50 text-xs">✦</div>
            <div className="absolute bottom-2 left-2 text-amber-700/50 text-xs">✦</div>
            <div className="absolute bottom-2 right-2 text-amber-700/50 text-xs">✦</div>

            {/* Header */}
            <div className="text-center space-y-1">
              <div className="text-[11px] font-bold tracking-widest text-pink-700 uppercase">
                SANGINI SKILL DEVELOPMENT INITIATIVE · कौशल भारत
              </div>
              <h1 className="text-2xl font-bold font-brand text-indigo-950 tracking-wide">
                CERTIFICATE OF VOCATIONAL EXCELLENCE
              </h1>
              <p className="text-xs text-amber-900 font-hindi italic">
                कौशल एवं व्यावसायिक प्रशिक्षण पूर्णता प्रमाण पत्र
              </p>
            </div>

            {/* Body */}
            <div className="text-center my-6 space-y-3">
              <p className="text-xs text-slate-600">This is to proudly certify that</p>
              <div className="text-2xl font-extrabold text-pink-900 border-b-2 border-amber-300 pb-1 max-w-md mx-auto">
                {enrollment.memberName}
              </div>
              <p className="text-xs text-slate-500 font-mono">
                Member ID: {enrollment.memberId}
              </p>
              <p className="text-xs text-slate-700 max-w-lg mx-auto leading-relaxed">
                has successfully completed the comprehensive vocational program in
              </p>
              <div className="text-lg font-bold text-indigo-950 bg-amber-100/50 py-1.5 px-4 rounded border border-amber-200 inline-block">
                {enrollment.courseTitle}
              </div>
              <div className="flex justify-center items-center gap-6 text-xs text-slate-600 pt-1">
                <span>Assessment Score: <strong className="text-emerald-700 font-mono">{enrollment.assessmentScore || 90}%</strong></span>
                <span>·</span>
                <span>Attendance: <strong className="text-indigo-950 font-mono">{enrollment.attendancePercent}%</strong></span>
                <span>·</span>
                <span>Grade: <strong className="text-pink-700 font-bold">Grade A</strong></span>
              </div>
            </div>

            {/* Verification & Signatures */}
            <div className="flex items-end justify-between pt-6 border-t border-amber-200 mt-6">
              <div className="text-left space-y-1">
                <div className="text-xs font-serif italic text-slate-800 border-b border-slate-400 pb-0.5 w-32">
                  Pooja Verma
                </div>
                <div className="text-[10px] text-slate-500 font-medium">Head of Training & Placements</div>
                <div className="text-[9px] text-slate-400">Date: {enrollment.certificateDate || '2026-10-28'}</div>
              </div>

              {/* QR verification */}
              <div className="flex flex-col items-center">
                <div className="border border-amber-300 p-1 bg-white rounded shadow-2xs">
                  <QrCodeSvg
                    value={`https://sangini.org/verify/certificate/${enrollment.certificateId || enrollment.enrollmentId}`}
                    size={68}
                  />
                </div>
                <span className="text-[9px] font-mono text-slate-400 mt-1">
                  {enrollment.certificateId || 'CERT-SNG-2026'}
                </span>
              </div>

              <div className="text-right space-y-1">
                <div className="text-xs font-serif italic text-slate-800 border-b border-slate-400 pb-0.5 w-32 ml-auto">
                  Dr. Radhika Sharma
                </div>
                <div className="text-[10px] text-slate-500 font-medium">Mission Director, SANGINI</div>
                <div className="text-[9px] text-emerald-600 flex items-center justify-end gap-1">
                  <CheckCircle className="w-2.5 h-2.5" />
                  <span>Verified Credential</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
