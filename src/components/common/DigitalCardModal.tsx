import React from 'react';
import { Member } from '../../types';
import { QrCodeSvg } from './QrCodeSvg';
import { X, Printer, CheckCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface DigitalCardModalProps {
  member: Member;
  onClose: () => void;
}

export const DigitalCardModal: React.FC<DigitalCardModalProps> = ({ member, onClose }) => {
  const { language } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 no-print">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-pink-600" />
            <h3 className="font-semibold text-slate-900 text-sm">
              {language === 'hi' ? 'डिजिटल संगिनी सदस्या पहचान पत्र' : 'Digital SANGINI Member ID Card'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-pink-700 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'प्रिंट करें' : 'Print Card'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Card Container */}
        <div className="p-6 flex flex-col items-center justify-center bg-slate-100/70 printable-area">
          <div className="w-[360px] bg-white rounded-xl shadow-md border border-slate-300 overflow-hidden text-slate-800">
            {/* Top Brand Banner */}
            <div className="bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-900 px-4 py-3 text-white flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider font-semibold opacity-90">
                  {language === 'hi' ? 'महिला सशक्तिकरण मंच' : 'Women Empowerment Platform'}
                </div>
                <div className="text-lg font-extrabold tracking-tight font-brand">
                  SANGINI · संगिनी
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/30 text-white font-bold text-xs">
                SNG
              </div>
            </div>

            {/* Sub-strip */}
            <div className="bg-pink-50 px-4 py-1 text-[11px] font-medium text-pink-900 flex justify-between border-b border-pink-100">
              <span>{language === 'hi' ? 'आधिकारिक सदस्या पहचान पत्र' : 'Official Member Identity Card'}</span>
              <span className="font-mono">{member.memberId}</span>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3">
              <div className="flex gap-3 items-center">
                <div className="relative shrink-0">
                  <img
                    src={member.photoUrl}
                    alt={member.fullName}
                    className="w-20 h-24 object-cover rounded-md border-2 border-pink-500 shadow-xs"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-0.5 shadow-xs">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                      {language === 'hi' ? 'नाम / Name' : 'Full Name'}
                    </span>
                    <span className="font-bold text-sm text-slate-900">{member.fullName}</span>
                    {member.hindiName && (
                      <span className="block text-xs font-medium text-pink-700">{member.hindiName}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">
                      {language === 'hi' ? 'पति / पिता का नाम' : 'Husband / Father'}
                    </span>
                    <span className="font-medium text-slate-700">
                      {member.husbandName || member.fatherName}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">
                        {language === 'hi' ? 'आयु / Age' : 'Age'}
                      </span>
                      <span className="font-medium text-slate-700">{member.age} Yrs</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">
                        {language === 'hi' ? 'स्थिति / Status' : 'Status'}
                      </span>
                      <span className="font-semibold text-emerald-700">{member.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SHG & Location Info */}
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs space-y-1">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    {language === 'hi' ? 'समूह का नाम / SHG Name' : 'Self Help Group'}
                  </span>
                  <span className="font-semibold text-indigo-950 block truncate">
                    {member.shgName} ({member.shgId})
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 block">
                      {language === 'hi' ? 'गाँव / Village' : 'Village'}
                    </span>
                    <span className="font-medium text-slate-800">{member.location.village}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">
                      {language === 'hi' ? 'जिला / District' : 'District'}
                    </span>
                    <span className="font-medium text-slate-800">
                      {member.location.district}, {member.location.state}
                    </span>
                  </div>
                </div>
              </div>

              {/* QR and Security Strip */}
              <div className="flex items-center justify-between pt-1">
                <div className="space-y-0.5 text-[10px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Aadhaar KYC Verified</span>
                  </div>
                  <div>
                    <span>Registered: {member.registrationDate}</span>
                  </div>
                  <div>
                    <span>Officer: {member.assignedFieldOfficerName}</span>
                  </div>
                </div>

                <div className="border border-slate-200 p-1 rounded bg-white shadow-2xs">
                  <QrCodeSvg
                    value={`https://sangini.org/verify/member/${member.memberId}`}
                    size={64}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Footer Notice */}
            <div className="bg-slate-900 text-[9px] text-slate-300 px-3 py-1.5 text-center">
              SANGINI Digital SHG Ecosystem · Helpline: 1800-SANGINI (Toll-Free)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
