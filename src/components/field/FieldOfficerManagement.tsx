import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { FieldOfficer, FieldVisitReport } from '../../types';
import {
  Users,
  Target,
  MapPin,
  Calendar,
  Plus,
  CheckCircle,
  FileText,
  Award,
  Phone,
  Mail,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const FieldOfficerManagement: React.FC = () => {
  const { language, t } = useLanguage();
  const { fieldOfficers, visitReports, logFieldVisit } = useData();

  const [selectedOfficer, setSelectedOfficer] = useState<FieldOfficer>(fieldOfficers[0] || null);
  const [showVisitModal, setShowVisitModal] = useState(false);

  // Visit log state
  const [village, setVillage] = useState('Amlaha Kalan');
  const [panchayat, setPanchayat] = useState('Amlaha Gram');
  const [shgVisited, setShgVisited] = useState('Kiran Mahila SHG');
  const [purpose, setPurpose] = useState<FieldVisitReport['purpose']>('Savings Collection');
  const [womenAttended, setWomenAttended] = useState<number>(14);
  const [findings, setFindings] = useState('All passbooks up to date and signed.');
  const [actionItems, setActionItems] = useState('Submit microloan document dossier to branch.');

  const handleLogVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOfficer) return;

    logFieldVisit({
      fieldOfficerId: selectedOfficer.id,
      fieldOfficerName: selectedOfficer.name,
      village,
      panchayat,
      shgVisited,
      purpose,
      womenAttended,
      findings,
      actionItems,
    });

    alert('Daily field visit report logged successfully!');
    setShowVisitModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs text-slate-500">
            SANGINI / Grassroots Field Force / Staff Management
          </div>
          <h1 className="text-2xl font-bold text-indigo-950 font-brand mt-1">
            {language === 'hi' ? 'क्षेत्रीय फील्ड अधिकारी प्रबंधन' : 'Field Officer & Village Staff Management'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'क्षेत्रीय लक्ष्य, दैनिक गाँव दौरा रिपोर्ट, समूह गठन प्रगति एवं मासिक प्रोत्साहन राशि।'
              : 'Jurisdictional coverage, targets vs achievements, daily field reports, and performance incentives.'}
          </p>
        </div>

        <button
          onClick={() => setShowVisitModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'hi' ? '+ दैनिक दौरा रिपोर्ट दर्ज करें' : '+ Log Daily Field Visit'}</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Officer Roster */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Field Coordinators ({fieldOfficers.length})
          </div>

          <div className="space-y-3">
            {fieldOfficers.map((fo) => {
              const isSelected = selectedOfficer?.id === fo.id;
              const memberPercent = Math.min(100, Math.round((fo.memberAchieved / fo.memberTarget) * 100));
              return (
                <div
                  key={fo.id}
                  onClick={() => setSelectedOfficer(fo)}
                  className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-pink-500 ring-2 ring-pink-500/20 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-pink-700 font-bold bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
                      {fo.employeeId}
                    </span>
                    <span className="text-emerald-700 font-bold text-[11px]">★ {fo.rating} Rating</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mt-1">{fo.name}</h3>

                  <div className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>
                      {fo.assignedDistrict} ({fo.assignedBlocks.join(', ')})
                    </span>
                  </div>

                  {/* Progress bars */}
                  <div className="mt-3 space-y-1.5 pt-2 border-t border-slate-100">
                    <div>
                      <div className="flex justify-between text-[10px] font-semibold text-slate-600 mb-0.5">
                        <span>Member Target ({fo.memberAchieved} / {fo.memberTarget})</span>
                        <span className="font-mono">{memberPercent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-pink-600 rounded-full"
                          style={{ width: `${memberPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[11px] pt-1 text-slate-500">
                      <span>SHGs Formed: <strong>{fo.shgAchieved}/{fo.shgTarget}</strong></span>
                      <span className="text-indigo-950 font-bold font-mono">
                        Incentive: ₹{fo.monthlyIncentive.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Officer Detail & Daily Visit Log */}
        {selectedOfficer ? (
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="font-mono text-xs font-bold text-pink-700">{selectedOfficer.employeeId}</span>
                  <h2 className="text-xl font-bold text-indigo-950 font-brand mt-0.5">
                    {selectedOfficer.name}
                  </h2>
                  <div className="text-xs text-slate-500 flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{selectedOfficer.mobile}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{selectedOfficer.email}</span>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Earned Monthly Incentive</span>
                  <span className="text-xl font-bold font-mono text-emerald-700">
                    ₹{selectedOfficer.monthlyIncentive.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Geographical Jurisdiction */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                  Assigned Geographic Territory
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Assigned District:</span>
                    <span className="font-medium text-slate-900">{selectedOfficer.assignedDistrict}, {selectedOfficer.assignedState}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Assigned Blocks:</span>
                    <span className="font-medium text-slate-900">{selectedOfficer.assignedBlocks.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Assigned Panchayats:</span>
                    <span className="font-medium text-slate-900">{selectedOfficer.assignedPanchayats.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Daily Field Visits Logged:</span>
                    <span className="font-bold text-indigo-950 font-mono">{selectedOfficer.dailyVisitsCount} Visits</span>
                  </div>
                </div>
              </div>

              {/* Visit Reports Feed */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Recent Daily Field Visit Reports
                  </h4>
                  <button
                    onClick={() => setShowVisitModal(true)}
                    className="text-xs font-semibold text-pink-600 hover:text-pink-700 cursor-pointer"
                  >
                    + Add Report
                  </button>
                </div>

                <div className="space-y-3">
                  {visitReports.map((report) => (
                    <div
                      key={report.id}
                      className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <span>{report.village} ({report.panchayat})</span>
                          <span className="text-[10px] font-semibold text-pink-700 bg-pink-50 px-2 py-0.2 rounded border border-pink-200">
                            {report.purpose}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{report.date}</span>
                      </div>

                      <div className="text-slate-600">
                        <span className="font-semibold text-slate-700">Findings: </span>
                        <span>{report.findings}</span>
                      </div>

                      <div className="text-slate-600">
                        <span className="font-semibold text-slate-700">Action Items: </span>
                        <span>{report.actionItems}</span>
                      </div>

                      <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Women Attended: {report.womenAttended}</span>
                        <span>Officer: {report.fieldOfficerName}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Modal: Log Field Visit */}
      {showVisitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 border border-slate-200 text-xs space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-slate-900 text-sm">
              Log Daily Field Visit Report ({selectedOfficer?.name})
            </h3>

            <form onSubmit={handleLogVisitSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Village *</label>
                  <input
                    type="text"
                    required
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Gram Panchayat *</label>
                  <input
                    type="text"
                    required
                    value={panchayat}
                    onChange={(e) => setPanchayat(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Visit Purpose *</label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  >
                    <option value="Savings Collection">Savings Collection</option>
                    <option value="SHG Formation">SHG Formation</option>
                    <option value="Loan Verification">Loan Verification</option>
                    <option value="Financial Literacy">Financial Literacy</option>
                    <option value="Scheme Enrollment">Scheme Enrollment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Women Attended *</label>
                  <input
                    type="number"
                    required
                    value={womenAttended}
                    onChange={(e) => setWomenAttended(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Key Observations / Findings *</label>
                <textarea
                  rows={2}
                  required
                  value={findings}
                  onChange={(e) => setFindings(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Action Items &amp; Follow-up *</label>
                <textarea
                  rows={2}
                  required
                  value={actionItems}
                  onChange={(e) => setActionItems(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowVisitModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Save Field Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
