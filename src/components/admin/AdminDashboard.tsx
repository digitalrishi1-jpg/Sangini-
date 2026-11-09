import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  Users,
  Building,
  TrendingUp,
  CreditCard,
  GraduationCap,
  Briefcase,
  Layers,
  MapPin,
  Calendar,
  Filter,
  Download,
  PlusCircle,
  FileText,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { language, t } = useLanguage();
  const { currentUser, setActiveView } = useAuth();
  const { stats, members, shgs, loans, savings, courses, enterprises } = useData();

  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [timeRange, setTimeRange] = useState<'month' | 'quarter' | 'year'>('month');

  // Filter calculations
  const filteredMembers = members.filter((m) => {
    if (selectedState !== 'All' && m.location.state !== selectedState) return false;
    if (selectedDistrict !== 'All' && m.location.district !== selectedDistrict) return false;
    return true;
  });

  const filteredSHGs = shgs.filter((s) => {
    if (selectedState !== 'All' && s.state !== selectedState) return false;
    if (selectedDistrict !== 'All' && s.district !== selectedDistrict) return false;
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Top Header & Breadcrumb Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span>SANGINI</span>
            <span>/</span>
            <span>Central Operations</span>
            <span>/</span>
            <span className="text-pink-600 font-semibold">{currentUser.role} Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-950 font-brand mt-1">
            {language === 'hi' ? 'केंद्रीय प्रशासनिक डैशबोर्ड' : 'Central Admin Impact Dashboard'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'hi'
              ? 'राष्ट्रीय, राज्य एवं जिला स्तरीय स्वयं सहायता समूह व वित्तीय प्रगति का वास्तविक समय डेटा।'
              : 'Real-time monitoring of grassroots SHG mobilization, thrift capital, credit discipline, and livelihood ventures.'}
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveView('members')}
            className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer whitespace-nowrap"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? '+ सदस्या जोड़ें' : '+ Register Member'}</span>
          </button>
          <button
            onClick={() => setActiveView('shg')}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg cursor-pointer whitespace-nowrap"
          >
            <Building className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? '+ नया SHG' : '+ New SHG'}</span>
          </button>
          <button
            onClick={() => setActiveView('reports')}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'रिपोर्ट्स' : 'Reports'}</span>
          </button>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <Filter className="w-3.5 h-3.5 text-pink-600" />
            <span>Filters:</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">State:</span>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict('All');
              }}
              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs font-medium text-slate-800 focus:outline-pink-500 cursor-pointer"
            >
              <option value="All">All States</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Rajasthan">Rajasthan</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs font-medium text-slate-800 focus:outline-pink-500 cursor-pointer"
            >
              <option value="All">All Districts</option>
              {selectedState === 'Madhya Pradesh' && (
                <>
                  <option value="Sehore">Sehore</option>
                  <option value="Raisen">Raisen</option>
                </>
              )}
              {selectedState === 'Uttar Pradesh' && <option value="Varanasi">Varanasi</option>}
              {selectedState === 'Rajasthan' && <option value="Alwar">Alwar</option>}
              {selectedState === 'All' && (
                <>
                  <option value="Sehore">Sehore</option>
                  <option value="Raisen">Raisen</option>
                  <option value="Varanasi">Varanasi</option>
                  <option value="Alwar">Alwar</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Time Segmented Buttons */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg">
          <button
            onClick={() => setTimeRange('month')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded cursor-pointer ${
              timeRange === 'month' ? 'bg-white text-pink-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setTimeRange('quarter')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded cursor-pointer ${
              timeRange === 'quarter' ? 'bg-white text-pink-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            This Quarter
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded cursor-pointer ${
              timeRange === 'year' ? 'bg-white text-pink-700 shadow-2xs' : 'text-slate-600'
            }`}
          >
            FY 2026-27
          </button>
        </div>
      </div>

      {/* 15 Essential KPI Grid as explicitly required */}
      <div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          {language === 'hi' ? '15 मुख्य परिचालन संकेतक (Key Performance Indicators)' : '15 Core Management Statistics'}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* 1. Total Registered Women */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 block truncate">{t('kpiRegisteredWomen')}</span>
            <div className="text-2xl font-bold font-mono text-indigo-950 mt-1 tabular-nums">
              {stats.totalRegisteredWomen}
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">100% KYC Verified</span>
          </div>

          {/* 2. Total Active Members */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 block truncate">{t('kpiActiveMembers')}</span>
            <div className="text-2xl font-bold font-mono text-pink-700 mt-1 tabular-nums">
              {stats.totalActiveMembers}
            </div>
            <span className="text-[10px] text-slate-400">Regular passbook activity</span>
          </div>

          {/* 3. Total SHGs */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 block truncate">{t('kpiTotalSHGs')}</span>
            <div className="text-2xl font-bold font-mono text-indigo-950 mt-1 tabular-nums">
              {stats.totalSHGs}
            </div>
            <span className="text-[10px] text-purple-700 font-medium">100% Panchasutra Compliant</span>
          </div>

          {/* 4. Total Villages Covered */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 block truncate">{t('kpiVillagesCovered')}</span>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
              {stats.totalVillages}
            </div>
            <span className="text-[10px] text-slate-400">Rural habitations</span>
          </div>

          {/* 5. Total Panchayats Covered */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 block truncate">{t('kpiPanchayatsCovered')}</span>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
              {stats.totalPanchayats}
            </div>
            <span className="text-[10px] text-slate-400">Gram Panchayats</span>
          </div>

          {/* 6. Total Blocks Covered */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 block truncate">{t('kpiBlocksCovered')}</span>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
              {stats.totalBlocks}
            </div>
            <span className="text-[10px] text-slate-400">Development Blocks</span>
          </div>

          {/* 7. Total Districts Covered */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 block truncate">{t('kpiDistrictsCovered')}</span>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
              {stats.totalDistricts}
            </div>
            <span className="text-[10px] text-slate-400">Field Administrative units</span>
          </div>

          {/* 8. Total States Covered */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 block truncate">{t('kpiStatesCovered')}</span>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
              {stats.totalStates}
            </div>
            <span className="text-[10px] text-indigo-700 font-medium">MP, UP, Rajasthan</span>
          </div>

          {/* 9. Total Savings */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 block truncate">{t('kpiTotalSavings')}</span>
            <div className="text-2xl font-bold font-mono text-emerald-700 mt-1 tabular-nums">
              ₹{(stats.totalSavings / 100000).toFixed(2)}L
            </div>
            <span className="text-[10px] text-slate-400">In group bank accounts</span>
          </div>

          {/* 10. Total Loans Disbursed */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 block truncate">{t('kpiLoansDisbursed')}</span>
            <div className="text-2xl font-bold font-mono text-indigo-950 mt-1 tabular-nums">
              ₹{(stats.totalLoansDisbursed / 100000).toFixed(2)}L
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">Low interest</span>
          </div>

          {/* 11. Total Outstanding Loans */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 block truncate">{t('kpiOutstandingLoans')}</span>
            <div className="text-2xl font-bold font-mono text-amber-700 mt-1 tabular-nums">
              ₹{(stats.totalOutstanding / 1000).toFixed(0)}k
            </div>
            <span className="text-[10px] text-slate-400">Active repayment cycle</span>
          </div>

          {/* 12. Total Loan Repaid */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 block truncate">{t('kpiLoansRepaid')}</span>
            <div className="text-2xl font-bold font-mono text-pink-700 mt-1 tabular-nums">
              ₹{(stats.totalLoansRepaid / 1000).toFixed(0)}k
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">
              {stats.overallRecoveryRate}% {t('kpiRecoveryRate')}
            </span>
          </div>

          {/* 13. Total Women Trained */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 block truncate">{t('kpiWomenTrained')}</span>
            <div className="text-2xl font-bold font-mono text-indigo-950 mt-1 tabular-nums">
              {stats.totalWomenTrained}
            </div>
            <span className="text-[10px] text-slate-400">9 vocational trades</span>
          </div>

          {/* 14. Total Women Employed */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 block truncate">{t('kpiWomenEmployed')}</span>
            <div className="text-2xl font-bold font-mono text-emerald-700 mt-1 tabular-nums">
              {stats.totalWomenEmployed}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">Self & Wage placement</span>
          </div>

          {/* 15. Total Active Entrepreneurs */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 block truncate">{t('kpiActiveEnterprises')}</span>
            <div className="text-2xl font-bold font-mono text-purple-700 mt-1 tabular-nums">
              {stats.totalActiveEnterprises}
            </div>
            <span className="text-[10px] text-slate-400">MSME / Udyam verified</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics & Graphs Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chart: Monthly Savings vs Loan Flow */}
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                {language === 'hi' ? 'वित्तीय प्रवाह: मासिक बचत बनाम ऋण वितरण' : 'Financial Flow: Monthly Thrift vs Credit Disbursal'}
              </h3>
              <p className="text-xs text-slate-500">Amounts in thousands (₹ INR)</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-pink-500"></span>
                <span className="text-slate-600">Savings</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-indigo-700"></span>
                <span className="text-slate-600">Disbursed</span>
              </div>
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-4 pt-6 pb-2 px-2 border-b border-slate-200">
            {[
              { month: 'Jun', savings: 120, loans: 180 },
              { month: 'Jul', savings: 145, loans: 210 },
              { month: 'Aug', savings: 175, loans: 260 },
              { month: 'Sep', savings: 210, loans: 320 },
              { month: 'Oct', savings: 250, loans: 380 },
              { month: 'Nov', savings: 285, loans: 410 },
            ].map((col) => (
              <div key={col.month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="flex items-end gap-1.5 w-full justify-center h-full">
                  <div
                    style={{ height: `${(col.savings / 450) * 100}%` }}
                    className="w-4 sm:w-6 bg-pink-500 rounded-t transition-all hover:bg-pink-600 cursor-pointer"
                    title={`Savings: ₹${col.savings}k`}
                  ></div>
                  <div
                    style={{ height: `${(col.loans / 450) * 100}%` }}
                    className="w-4 sm:w-6 bg-indigo-900 rounded-t transition-all hover:bg-indigo-950 cursor-pointer"
                    title={`Loans: ₹${col.loans}k`}
                  ></div>
                </div>
                <span className="text-[11px] font-medium text-slate-500 mt-1">{col.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Steady 18% compound quarterly thrift growth</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Low NPA (Non-Performing Assets &lt; 1.2%)
            </span>
          </div>
        </div>

        {/* Right Chart: SHG Performance Grading & Categories */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              {language === 'hi' ? 'समूह प्रदर्शन ग्रेडिंग' : 'SHG Performance Grading'}
            </h3>
            <p className="text-xs text-slate-500">Based on regular attendance and recovery</p>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-700">Grade A+ (Exemplary 99%+ Recovery)</span>
                <span className="font-mono text-slate-700">65%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-indigo-900">Grade A (Disciplined 95–98%)</span>
                <span className="font-mono text-slate-700">25%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-700 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-700">Grade B (Mentorship Needed)</span>
                <span className="font-mono text-slate-700">10%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-pink-50 rounded-xl border border-pink-100 text-xs text-pink-900 space-y-1 mt-4">
            <span className="font-bold block">Panchasutra Adherence Note:</span>
            <span>All Grade A/A+ groups are pre-approved for bank credit linkage under DAY-NRLM with zero collateral.</span>
          </div>
        </div>
      </div>

      {/* Operational Roster Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active SHGs Table */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">
              {language === 'hi' ? 'सक्रिय स्वयं सहायता समूह (SHG Roster)' : 'Active Self Help Groups'}
            </h3>
            <button
              onClick={() => setActiveView('shg')}
              className="text-xs font-semibold text-pink-600 hover:text-pink-700 cursor-pointer"
            >
              View All SHGs →
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {filteredSHGs.slice(0, 4).map((s) => (
              <div key={s.id} className="py-2.5 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900">{s.name}</div>
                  <div className="text-slate-500 text-[11px]">
                    {s.village}, {s.district} · {s.meetingFrequency} ({s.meetingDay})
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-pink-700 text-sm block">
                    ₹{s.totalGroupSavings.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Grade {s.performanceGrade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loan Queue Pending Approval */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">
              {language === 'hi' ? 'ऋण स्वीकृति पाइपलाइन (Loan Pipeline)' : 'Microfinance Approval Pipeline'}
            </h3>
            <button
              onClick={() => setActiveView('loans')}
              className="text-xs font-semibold text-pink-600 hover:text-pink-700 cursor-pointer"
            >
              Manage Loans →
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {loans.slice(0, 4).map((l) => (
              <div key={l.id} className="py-2.5 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900">{l.memberName}</div>
                  <div className="text-slate-500 text-[11px] truncate max-w-[200px]">
                    {l.purpose}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">{l.loanId}</div>
                </div>
                <div className="text-right space-y-0.5">
                  <div className="font-mono font-bold text-slate-900">
                    ₹{l.loanAmount.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] font-semibold text-purple-700 block">
                    {l.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
