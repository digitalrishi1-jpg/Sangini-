import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { GovernmentScheme } from '../../types';
import {
  Building,
  CheckCircle,
  FileText,
  ExternalLink,
  Search,
  Filter,
  ShieldCheck,
  ChevronRight,
  Send,
  AlertCircle,
} from 'lucide-react';

export const GovernmentSchemesManagement: React.FC = () => {
  const { language, t } = useLanguage();
  const { schemes, members } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<'All' | 'Central' | 'State'>('All');
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(schemes[0] || null);
  const [referringMemberId, setReferringMemberId] = useState(members[0]?.memberId || '');
  const [showApplyModal, setShowApplyModal] = useState(false);

  const filtered = schemes.filter((s) => {
    if (levelFilter !== 'All' && s.level !== levelFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.hindiTitle.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedScheme || !referringMemberId) return;

    alert(
      `Referral and document dossier logged for ${referringMemberId} under ${selectedScheme.title}. The Field Officer will assist with the official departmental portal application.`
    );
    setShowApplyModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs text-slate-500">
            SANGINI / Public Policy Linkage / Government Schemes &amp; Benefits
          </div>
          <h1 className="text-2xl font-bold text-indigo-950 font-brand mt-1">
            {language === 'hi' ? 'सरकारी योजनाएं एवं प्रत्यक्ष लाभ डायरेक्टरी' : 'Government Schemes & Direct Benefits'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'लखपति दीदी, मुद्रा योजना, आजीविका मिशन (NRLM) एवं महिला सम्मान बचत प्रमाण पत्र की विस्तृत जानकारी।'
              : 'Official criteria, document checklists, and grassroots application facilitation for rural women.'}
          </p>
        </div>

        <div className="bg-amber-50 text-amber-900 border border-amber-200 text-[11px] p-2.5 rounded-xl flex items-center gap-2 max-w-md">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            {language === 'hi'
              ? 'सूचना संवाहक: संगिनी संस्था केवल अधिकृत सरकारी योजनाओं की जागरूकता एवं आवेदन प्रक्रिया में सहायता प्रदान करती है।'
              : 'Facilitation Notice: SANGINI acts as an information and application assistance bridge to official government portals.'}
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Schemes Directory */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between gap-2 text-xs">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search schemes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-pink-600"
              />
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setLevelFilter('All')}
                className={`px-2 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                  levelFilter === 'All' ? 'bg-indigo-950 text-white' : 'text-slate-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setLevelFilter('Central')}
                className={`px-2 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                  levelFilter === 'Central' ? 'bg-indigo-950 text-white' : 'text-slate-600'
                }`}
              >
                Central
              </button>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
            {filtered.map((sch) => {
              const isSelected = selectedScheme?.id === sch.id;
              return (
                <div
                  key={sch.id}
                  onClick={() => setSelectedScheme(sch)}
                  className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-pink-500 ring-2 ring-pink-500/20 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-pink-700 font-bold bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
                      {sch.schemeCode}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">{sch.level} Scheme</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mt-1">{sch.title}</h3>
                  {sch.hindiTitle && (
                    <div className="text-xs text-purple-900 font-hindi font-medium mt-0.5">{sch.hindiTitle}</div>
                  )}

                  <p className="text-slate-600 text-xs line-clamp-2 mt-2 leading-relaxed">
                    {sch.benefitsSummary}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Category: {sch.category}</span>
                    <span className="text-emerald-700 font-semibold">{sch.approvedCount} Women Assisted</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Scheme Deep-Dive */}
        {selectedScheme ? (
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-pink-700 bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
                      {selectedScheme.schemeCode}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {selectedScheme.level} Level · {selectedScheme.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-indigo-950 font-brand mt-1">
                    {selectedScheme.title}
                  </h2>
                  <div className="text-sm text-pink-700 font-hindi font-semibold mt-0.5">
                    {selectedScheme.hindiTitle}
                  </div>
                </div>

                <button
                  onClick={() => setShowApplyModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer whitespace-nowrap shrink-0"
                >
                  + Refer Member for Scheme
                </button>
              </div>

              {/* Benefits Summary */}
              <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-100 space-y-1.5 text-xs">
                <h4 className="font-bold text-purple-950 uppercase tracking-wider text-[11px]">
                  Scheme Benefits &amp; Financial Assistance
                </h4>
                <p className="text-slate-700 leading-relaxed">{selectedScheme.benefitsSummary}</p>
              </div>

              {/* Eligibility Criteria */}
              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Eligibility Criteria (पात्रता शर्तें)
                </h4>
                <ul className="space-y-1.5 text-slate-700">
                  {selectedScheme.eligibilityCriteria.map((crit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mandatory Documents */}
              <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Required Documents Checklist (आवश्यक दस्तावेज)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedScheme.requiredDocuments.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 flex items-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Link */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                <div className="text-slate-500">
                  Referrals processed: <strong className="text-indigo-950">{selectedScheme.referralCount}</strong>
                </div>
                <a
                  href={selectedScheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-semibold text-indigo-900 hover:text-pink-600 transition-colors"
                >
                  <span>Official Government Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Refer Member Modal */}
      {showApplyModal && selectedScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200 text-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">
              Refer Member for {selectedScheme.title}
            </h3>
            <p className="text-slate-500">
              The assigned field officer will verify the documents and assist the member at the nearest CSC center or bank branch.
            </p>

            <form onSubmit={handleReferralSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Select Member</label>
                <select
                  value={referringMemberId}
                  onChange={(e) => setReferringMemberId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                >
                  {members.map((m) => (
                    <option key={m.id} value={m.memberId}>
                      {m.fullName} ({m.memberId}) - {m.shgName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Confirm Referral Dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
