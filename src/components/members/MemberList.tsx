import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { Member } from '../../types';
import {
  Search,
  Filter,
  CreditCard,
  Download,
  Plus,
  Eye,
  CheckCircle,
  Phone,
  Building,
  UserCheck,
} from 'lucide-react';
import { DigitalCardModal } from '../common/DigitalCardModal';
import { MemberRegistration } from './MemberRegistration';

export const MemberList: React.FC = () => {
  const { language, t } = useLanguage();
  const { visibleMembers } = useData();

  const [activeTab, setActiveTab] = useState<'list' | 'register'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [selectedMemberForCard, setSelectedMemberForCard] = useState<Member | null>(null);

  // Filtered members
  const filtered = visibleMembers.filter((m) => {
    if (statusFilter !== 'All' && m.status !== statusFilter) return false;
    if (districtFilter !== 'All' && m.location.district !== districtFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = m.fullName.toLowerCase().includes(q);
      const matchHindi = m.hindiName?.toLowerCase().includes(q);
      const matchId = m.memberId.toLowerCase().includes(q);
      const matchMobile = m.mobile.includes(q);
      const matchVillage = m.location.village.toLowerCase().includes(q);
      const matchShg = m.shgName.toLowerCase().includes(q);
      return matchName || matchHindi || matchId || matchMobile || matchVillage || matchShg;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs text-slate-500">
            SANGINI / Grassroots Roster / Members Directory
          </div>
          <h1 className="text-2xl font-bold text-indigo-950 font-brand mt-1">
            {language === 'hi' ? 'महिला सदस्या डायरेक्टरी एवं प्रबंधन' : 'Women Member Directory & KYC'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'कुल पंजीकृत सदस्याएं, स्वयं सहायता समूह संबद्धता, डिजिटल आईडी कार्ड एवं बचत स्थिति।'
              : 'Verified women members database with instant digital membership cards and thrift balance tracking.'}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'list'
                ? 'bg-indigo-950 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {language === 'hi' ? 'सदस्या सूची' : 'Members Directory'} ({visibleMembers.length})
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'register'
                ? 'bg-pink-600 text-white'
                : 'bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'नई सदस्या जोड़ें' : '+ Register Member'}</span>
          </button>
        </div>
      </div>

      {activeTab === 'register' ? (
        <MemberRegistration
          onSuccessView={(newId) => {
            setActiveTab('list');
            setSearchQuery(newId);
          }}
        />
      ) : (
        <div className="space-y-4">
          {/* Search & Filter Toolbar */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex-1 min-w-[260px] relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={
                  language === 'hi'
                    ? 'नाम, आईडी (SNG-...), मोबाइल या गांव से खोजें...'
                    : 'Search by member name, ID, phone, village, or SHG...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-pink-600 focus:bg-white text-xs"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">District:</span>
                <select
                  value={districtFilter}
                  onChange={(e) => setDistrictFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 cursor-pointer"
                >
                  <option value="All">All Districts</option>
                  <option value="Sehore">Sehore (MP)</option>
                  <option value="Raisen">Raisen (MP)</option>
                  <option value="Varanasi">Varanasi (UP)</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table View */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Member ID & Photo</th>
                    <th className="py-3 px-4">Full Name / Details</th>
                    <th className="py-3 px-4">Location (Village / Block)</th>
                    <th className="py-3 px-4">SHG Affiliation</th>
                    <th className="py-3 px-4 text-right">Savings Balance</th>
                    <th className="py-3 px-4 text-right">Active Loan</th>
                    <th className="py-3 px-4 text-center">Digital Card</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No members found matching filters.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((member) => (
                      <tr key={member.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Member ID & Photo */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <img
                              src={member.photoUrl}
                              alt={member.fullName}
                              className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80';
                              }}
                            />
                            <div>
                              <span className="font-mono font-bold text-indigo-950 block">
                                {member.memberId}
                              </span>
                              <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-medium">
                                <CheckCircle className="w-2.5 h-2.5" />
                                <span>KYC Verified</span>
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Name & Personal */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{member.fullName}</div>
                          {member.hindiName && (
                            <div className="text-[11px] text-pink-700 font-hindi">{member.hindiName}</div>
                          )}
                          <div className="text-[11px] text-slate-500">
                            Age: {member.age} Yrs · {member.occupation}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                            <Phone className="w-2.5 h-2.5" />
                            <span>{member.mobile}</span>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-800">{member.location.village}</div>
                          <div className="text-[11px] text-slate-500">
                            {member.location.panchayat}, {member.location.block}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {member.location.district}, {member.location.state}
                          </div>
                        </td>

                        {/* SHG */}
                        <td className="py-3 px-4">
                          <div className="font-medium text-indigo-950 truncate max-w-[180px]">
                            {member.shgName}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">{member.shgId}</div>
                          <div className="text-[10px] text-slate-500">
                            Officer: {member.assignedFieldOfficerName}
                          </div>
                        </td>

                        {/* Savings Balance */}
                        <td className="py-3 px-4 text-right">
                          <span className="font-mono font-bold text-emerald-700 text-sm">
                            ₹{member.totalSavings.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-slate-400 block">Regular Thrift</span>
                        </td>

                        {/* Active Loan */}
                        <td className="py-3 px-4 text-right">
                          <span className="font-mono font-bold text-slate-900 text-sm">
                            {member.activeLoanAmount > 0
                              ? `₹${member.activeLoanAmount.toLocaleString('en-IN')}`
                              : '₹0'}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            CIBIL/Score: {member.creditScore}
                          </span>
                        </td>

                        {/* Action: Digital Card */}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => setSelectedMemberForCard(member)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-lg font-semibold text-[11px] border border-pink-200 transition-colors cursor-pointer"
                            title="Generate Digital ID Card"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Digital ID</span>
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

      {/* Digital ID Card Modal */}
      {selectedMemberForCard && (
        <DigitalCardModal
          member={selectedMemberForCard}
          onClose={() => setSelectedMemberForCard(null)}
        />
      )}
    </div>
  );
};
