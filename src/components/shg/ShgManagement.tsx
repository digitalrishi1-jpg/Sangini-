import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { SHG, Member } from '../../types';
import {
  Building,
  Users,
  Calendar,
  DollarSign,
  Plus,
  CheckCircle,
  Clock,
  Award,
  FileText,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  X,
} from 'lucide-react';

export const ShgManagement: React.FC = () => {
  const { language, t } = useLanguage();
  const { visibleSHGs, createSHG, recordMeeting, members } = useData();

  const [selectedShg, setSelectedShg] = useState<SHG>(visibleSHGs[0] || null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);

  // New SHG form state
  const [name, setName] = useState('');
  const [formationDate, setFormationDate] = useState('2026-11-01');
  const [state, setState] = useState('Madhya Pradesh');
  const [district, setDistrict] = useState('Sehore');
  const [block, setBlock] = useState('Ichhawar');
  const [panchayat, setPanchayat] = useState('Amlaha Gram');
  const [village, setVillage] = useState('Amlaha Kalan');
  const [presidentName, setPresidentName] = useState('');
  const [presidentContact, setPresidentContact] = useState('');
  const [secretaryName, setSecretaryName] = useState('');
  const [secretaryContact, setSecretaryContact] = useState('');
  const [treasurerName, setTreasurerName] = useState('');
  const [treasurerContact, setTreasurerContact] = useState('');
  const [bankName, setBankName] = useState('State Bank of India (SBI)');
  const [bankAccountMasked, setBankAccountMasked] = useState('XXXX-XXXX-7721');
  const [ifscCode, setIfscCode] = useState('SBIN0001088');
  const [meetingFrequency, setMeetingFrequency] = useState<SHG['meetingFrequency']>('Weekly');
  const [meetingDay, setMeetingDay] = useState('Every Tuesday');
  const [meetingTime, setMeetingTime] = useState('03:00 PM');
  const [monthlySavingsPerMember, setMonthlySavingsPerMember] = useState(500);

  // Meeting logger state
  const [meetingAgenda, setMeetingAgenda] = useState('Weekly savings collection & microloan discussion');
  const [meetingMinutes, setMeetingMinutes] = useState('All members gathered at panchayat hall. Thrift deposited.');
  const [presentMembers, setPresentMembers] = useState<string[]>([]);
  const [collectedAmount, setCollectedAmount] = useState(2500);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !presidentName.trim()) {
      alert('Please provide SHG name and President details.');
      return;
    }

    const created = createSHG({
      name,
      formationDate,
      state,
      district,
      block,
      panchayat,
      village,
      presidentName,
      presidentContact,
      secretaryName,
      secretaryContact,
      treasurerName,
      treasurerContact,
      bankName,
      bankAccountMasked,
      ifscCode,
      meetingFrequency,
      meetingDay,
      meetingTime,
      monthlySavingsPerMember,
    });

    setSelectedShg(created);
    setShowCreateModal(false);
  };

  const handleLogMeetingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShg) return;
    recordMeeting(selectedShg.shgId, {
      agenda: meetingAgenda,
      presentMemberIds: presentMembers.length > 0 ? presentMembers : selectedShg.members.map((m) => m.memberId),
      totalCollected: collectedAmount,
      minutes: meetingMinutes,
    });
    setShowMeetingModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs text-slate-500">
            SANGINI / Collectives / Self Help Group (SHG) Management
          </div>
          <h1 className="text-2xl font-bold text-indigo-950 font-brand mt-1">
            {language === 'hi' ? 'स्वयं सहायता समूह (SHG) प्रबंधन' : 'Self Help Group (SHG) Management'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'समूह गठन, पदाधिकारी, साप्ताहिक बैठक उपस्थिति पंजी, बैंक खाता एवं पंचसूत्र ग्रेडिंग।'
              : 'Democratic group governance, roster limits, weekly attendance registers, and group pool balances.'}
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'hi' ? '+ नया SHG समूह बनाएं' : '+ Form New SHG'}</span>
        </button>
      </div>

      {/* Main Grid: SHG List (Left) and Detailed Dashboard (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: SHG Selection Column */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {language === 'hi' ? 'समूह सूची' : 'SHG Collectives'} ({visibleSHGs.length})
          </div>

          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
            {visibleSHGs.map((shg) => {
              const isSelected = selectedShg?.shgId === shg.shgId;
              return (
                <div
                  key={shg.id}
                  onClick={() => setSelectedShg(shg)}
                  className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-pink-500 ring-2 ring-pink-500/20 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-400 font-semibold">{shg.shgId}</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                      Grade {shg.performanceGrade}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mt-1">{shg.name}</h3>

                  <div className="text-slate-500 text-[11px] mt-0.5">
                    {shg.village}, {shg.block}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Members:</span>
                      <span className="font-semibold text-slate-800">{shg.members.length || 5} Women</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">Group Savings:</span>
                      <span className="font-mono font-bold text-pink-700">
                        ₹{shg.totalGroupSavings.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected SHG Dashboard */}
        {selectedShg ? (
          <div className="lg:col-span-8 space-y-6">
            {/* Top Overview Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-pink-700 bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
                      {selectedShg.shgId}
                    </span>
                    <span className="text-xs text-slate-500">
                      Formed on {selectedShg.formationDate}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-indigo-950 font-brand mt-1">
                    {selectedShg.name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Location: {selectedShg.village}, {selectedShg.panchayat}, {selectedShg.block},{' '}
                    {selectedShg.district}, {selectedShg.state}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setPresentMembers(selectedShg.members.map((m) => m.memberId));
                    setShowMeetingModal(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-950 hover:bg-indigo-900 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer whitespace-nowrap"
                >
                  <Calendar className="w-3.5 h-3.5 text-pink-400" />
                  <span>{language === 'hi' ? 'साप्ताहिक बैठक दर्ज करें' : 'Log Weekly Meeting'}</span>
                </button>
              </div>

              {/* 4 Financial & Governance Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Group Savings</span>
                  <span className="text-xl font-bold font-mono text-pink-700 mt-1 block">
                    ₹{selectedShg.totalGroupSavings.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-500">₹{selectedShg.monthlySavingsPerMember}/mo target</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Loans Disbursed</span>
                  <span className="text-xl font-bold font-mono text-indigo-950 mt-1 block">
                    ₹{selectedShg.totalLoansDisbursed.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium">{selectedShg.activeLoansCount} active loans</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Repayment Rate</span>
                  <span className="text-xl font-bold font-mono text-emerald-700 mt-1 block">
                    {selectedShg.loanRepaymentRate}%
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Exemplary Track Record</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Meeting Cadence</span>
                  <span className="text-sm font-bold text-slate-900 mt-1 block">
                    {selectedShg.meetingFrequency}
                  </span>
                  <span className="text-[10px] text-slate-500">{selectedShg.meetingDay} @ {selectedShg.meetingTime}</span>
                </div>
              </div>

              {/* Leadership Trio & Bank Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                {/* Democratic Leadership */}
                <div className="p-4 rounded-xl border border-slate-200 bg-purple-50/40 space-y-2">
                  <h4 className="font-bold text-purple-950 text-xs uppercase tracking-wider">
                    Elected Leadership Committee (पदाधिकारी)
                  </h4>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">President (अध्यक्ष):</span>
                      <span className="font-bold text-slate-900">
                        {selectedShg.presidentName} ({selectedShg.presidentContact})
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Secretary (सचिव):</span>
                      <span className="font-bold text-slate-900">
                        {selectedShg.secretaryName} ({selectedShg.secretaryContact})
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Treasurer (कोषाध्यक्ष):</span>
                      <span className="font-bold text-slate-900">
                        {selectedShg.treasurerName} ({selectedShg.treasurerContact})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bank Account (Restricted & Masked) */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center justify-between">
                    <span>Group Pool Bank Account</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Bank Name:</span>
                      <span className="font-medium text-slate-900">{selectedShg.bankName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Account (Masked):</span>
                      <span className="font-mono font-bold text-indigo-950">
                        {selectedShg.bankAccountMasked}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">IFSC Code:</span>
                      <span className="font-mono text-slate-800">{selectedShg.ifscCode}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Member Roster in this SHG */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {language === 'hi' ? 'समूह सदस्या सूची (Member Roster)' : 'SHG Member Roster'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedShg.members.length} of max 20 allowed democratic members
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {selectedShg.members.map((m, idx) => (
                  <div key={m.memberId || idx} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-pink-100 text-pink-800 font-bold flex items-center justify-center text-xs">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <span>{m.memberName}</span>
                          <span
                            className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                              m.role === 'President'
                                ? 'bg-pink-100 text-pink-800'
                                : m.role === 'Secretary'
                                ? 'bg-purple-100 text-purple-800'
                                : m.role === 'Treasurer'
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {m.role}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          ID: {m.memberId} · Joined {m.joinedDate}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-bold text-emerald-700 text-sm block">
                        ₹{m.savingsBalance.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-400">Personal Thrift</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Meeting History Register */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">
                {language === 'hi' ? 'बैठक कार्यवाही एवं उपस्थिति पंजी' : 'Meeting Minutes & Attendance Log'}
              </h3>

              {selectedShg.meetings.length === 0 ? (
                <p className="text-xs text-slate-400 py-3">No meetings logged yet for this group.</p>
              ) : (
                <div className="space-y-3">
                  {selectedShg.meetings.map((mtg) => (
                    <div key={mtg.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{mtg.date}</span>
                        <span className="text-pink-700 font-mono font-semibold">
                          ₹{mtg.totalCollected.toLocaleString('en-IN')} Collected
                        </span>
                      </div>
                      <p className="font-medium text-slate-800">{mtg.agenda}</p>
                      <p className="text-slate-600 text-[11px] italic">{mtg.minutesOfMeeting}</p>
                      <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200">
                        Attendance: {mtg.presentMemberIds.length} members present
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {/* Modal: Form New SHG */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-6 border border-slate-200 text-xs space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">
                {language === 'hi' ? 'नया स्वयं सहायता समूह (SHG) गठित करें' : 'Form New Self Help Group (SHG)'}
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">SHG Name (समूह का नाम) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Durga Swavalamban Mahila Samuh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Formation Date *</label>
                  <input
                    type="date"
                    required
                    value={formationDate}
                    onChange={(e) => setFormationDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Monthly Savings/Member (₹)</label>
                  <input
                    type="number"
                    value={monthlySavingsPerMember}
                    onChange={(e) => setMonthlySavingsPerMember(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-600 mb-1">District</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Block</label>
                  <input
                    type="text"
                    value={block}
                    onChange={(e) => setBlock(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Village</label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded"
                  />
                </div>
              </div>

              {/* Leadership Trio */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-800 block text-xs">Elected Office Bearers</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="President Name"
                    value={presidentName}
                    onChange={(e) => setPresidentName(e.target.value)}
                    className="px-2.5 py-1.5 border border-slate-300 rounded"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="President Mobile"
                    value={presidentContact}
                    onChange={(e) => setPresidentContact(e.target.value)}
                    className="px-2.5 py-1.5 border border-slate-300 rounded font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Secretary Name"
                    value={secretaryName}
                    onChange={(e) => setSecretaryName(e.target.value)}
                    className="px-2.5 py-1.5 border border-slate-300 rounded"
                  />
                  <input
                    type="tel"
                    placeholder="Secretary Mobile"
                    value={secretaryContact}
                    onChange={(e) => setSecretaryContact(e.target.value)}
                    className="px-2.5 py-1.5 border border-slate-300 rounded font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Treasurer Name"
                    value={treasurerName}
                    onChange={(e) => setTreasurerName(e.target.value)}
                    className="px-2.5 py-1.5 border border-slate-300 rounded"
                  />
                  <input
                    type="tel"
                    placeholder="Treasurer Mobile"
                    value={treasurerContact}
                    onChange={(e) => setTreasurerContact(e.target.value)}
                    className="px-2.5 py-1.5 border border-slate-300 rounded font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Create SHG Collective
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Log Weekly Meeting */}
      {showMeetingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 border border-slate-200 text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">
                Log Meeting for {selectedShg?.name}
              </h3>
              <button onClick={() => setShowMeetingModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLogMeetingSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Meeting Agenda (बैठक का एजेंडा) *</label>
                <input
                  type="text"
                  required
                  value={meetingAgenda}
                  onChange={(e) => setMeetingAgenda(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Total Savings Collected (₹) *</label>
                <input
                  type="number"
                  required
                  value={collectedAmount}
                  onChange={(e) => setCollectedAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Minutes of Meeting (कार्यवाही विवरण) *</label>
                <textarea
                  rows={3}
                  required
                  value={meetingMinutes}
                  onChange={(e) => setMeetingMinutes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMeetingModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-950 hover:bg-indigo-900 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Record Minutes & Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
