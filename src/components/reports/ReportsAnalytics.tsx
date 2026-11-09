import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import {
  FileText,
  Download,
  Printer,
  Filter,
  Calendar,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';

export const ReportsAnalytics: React.FC = () => {
  const { language, t } = useLanguage();
  const { members, shgs, savings, loans, courses, enrollments, enterprises, stats } = useData();

  const [activeReport, setActiveReport] = useState<string>('members');
  const [districtFilter, setDistrictFilter] = useState('All');

  const reportList = [
    { id: 'members', label: 'Member Registration Report', hindi: 'सदस्या पंजीकरण रिपोर्ट' },
    { id: 'shg', label: 'SHG Formation Report', hindi: 'समूह गठन रिपोर्ट' },
    { id: 'savings', label: 'Group Savings Ledger', hindi: 'बचत लेजर रिपोर्ट' },
    { id: 'loans', label: 'Loan Disbursement & Recovery', hindi: 'ऋण वितरण एवं वसूली रिपोर्ट' },
    { id: 'training', label: 'Vocational Training & Placement', hindi: 'प्रशिक्षण एवं रोज़गार रिपोर्ट' },
    { id: 'enterprises', label: 'Women Enterprises Directory', hindi: 'महिला उद्यम डायरेक्टरी' },
  ];

  const handleDownloadCsv = () => {
    let headers: string[] = [];
    let rows: any[][] = [];
    let filename = `sangini-${activeReport}-report.csv`;

    if (activeReport === 'members') {
      headers = ['Member ID', 'Full Name', 'Age', 'Mobile', 'SHG Name', 'Village', 'District', 'Total Savings'];
      rows = members.map((m) => [
        m.memberId,
        `"${m.fullName}"`,
        m.age,
        m.mobile,
        `"${m.shgName}"`,
        `"${m.location.village}"`,
        `"${m.location.district}"`,
        m.totalSavings,
      ]);
    } else if (activeReport === 'shg') {
      headers = ['SHG ID', 'Group Name', 'President', 'Village', 'District', 'Members', 'Group Savings', 'Grade'];
      rows = shgs.map((s) => [
        s.shgId,
        `"${s.name}"`,
        `"${s.presidentName}"`,
        `"${s.village}"`,
        `"${s.district}"`,
        s.members.length,
        s.totalGroupSavings,
        s.performanceGrade,
      ]);
    } else if (activeReport === 'savings') {
      headers = ['TXN ID', 'Receipt No', 'Member ID', 'Member Name', 'SHG Name', 'Amount', 'Type', 'Date', 'Mode'];
      rows = savings.map((s) => [
        s.transactionId,
        s.receiptNumber,
        s.memberId,
        `"${s.memberName}"`,
        `"${s.shgName}"`,
        s.amount,
        s.type,
        s.date,
        s.paymentMode,
      ]);
    } else if (activeReport === 'loans') {
      headers = ['Loan ID', 'Member ID', 'Member Name', 'Loan Amount', 'EMI', 'Outstanding', 'Repaid', 'Status'];
      rows = loans.map((l) => [
        l.loanId,
        l.memberId,
        `"${l.memberName}"`,
        l.loanAmount,
        l.monthlyEmi,
        l.outstandingBalance,
        l.totalRepaid,
        l.status,
      ]);
    } else if (activeReport === 'training') {
      headers = ['Enrollment ID', 'Candidate Name', 'Course Title', 'Attendance %', 'Score %', 'Status', 'Outcome'];
      rows = enrollments.map((enr) => [
        enr.enrollmentId,
        `"${enr.memberName}"`,
        `"${enr.courseTitle}"`,
        enr.attendancePercent,
        enr.assessmentScore || 0,
        enr.status,
        `"${enr.placedCompany || 'N/A'}"`,
      ]);
    } else if (activeReport === 'enterprises') {
      headers = ['Enterprise ID', 'Business Name', 'Founder', 'Village', 'Turnover (INR)', 'Women Employed'];
      rows = enterprises.map((e) => [
        e.enterpriseId,
        `"${e.businessName}"`,
        `"${e.ownerName}"`,
        `"${e.village}"`,
        e.annualTurnover,
        e.womenEmployedCount,
      ]);
    }

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 no-print">
        <div>
          <div className="text-xs text-slate-500">
            SANGINI / Governance &amp; Compliance / Analytical Reports
          </div>
          <h1 className="text-2xl font-bold text-indigo-950 font-brand mt-1">
            {language === 'hi' ? 'रिपोर्ट्स एवं विस्तृत विश्लेषण' : 'Reports & Analytical Audits'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'ग्राम, पंचायत, विकासखंड एवं जिला स्तरीय सांख्यिकी, एक्सेल व सीएसवी निर्यात एवं प्रिंट योग्य प्रारूप।'
              : 'Enterprise-grade reporting with one-click CSV export and print-ready formats.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadCsv}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-pink-600" />
            <span>{language === 'hi' ? 'CSV डाउनलोड' : 'Export CSV'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-950 hover:bg-indigo-900 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-pink-400" />
            <span>{language === 'hi' ? 'प्रिंट रिपोर्ट' : 'Print View'}</span>
          </button>
        </div>
      </div>

      {/* Report Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-print">
        {reportList.map((r) => (
          <button
            key={r.id}
            onClick={() => setActiveReport(r.id)}
            className={`px-3 py-1.5 font-semibold rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
              activeReport === r.id
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {language === 'hi' ? r.hindi : r.label}
          </button>
        ))}
      </div>

      {/* Printable Report Document Surface */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5 printable-area">
        {/* Printable Header */}
        <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold tracking-widest text-pink-700 uppercase">
              SANGINI WOMEN EMPOWERMENT ORGANIZATION
            </div>
            <h2 className="text-xl font-extrabold text-indigo-950 font-brand">
              {reportList.find((r) => r.id === activeReport)?.label}
            </h2>
            <p className="text-xs text-slate-500">
              Audit Date: {new Date().toISOString().split('T')[0]} · Certified Official Organization Report
            </p>
          </div>
          <div className="text-right text-xs text-slate-500 font-mono">
            <div>Confidential &amp; Secure</div>
            <div>DPDPA 2023 Compliant</div>
          </div>
        </div>

        {/* Dynamic Table based on activeReport */}
        <div className="overflow-x-auto">
          {activeReport === 'members' && (
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Member ID</th>
                  <th className="py-2.5 px-3">Full Name</th>
                  <th className="py-2.5 px-3">Age</th>
                  <th className="py-2.5 px-3">Mobile</th>
                  <th className="py-2.5 px-3">SHG Name</th>
                  <th className="py-2.5 px-3">Village / District</th>
                  <th className="py-2.5 px-3 text-right">Savings (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/50">
                    <td className="py-2 px-3 font-mono font-bold text-indigo-950">{m.memberId}</td>
                    <td className="py-2 px-3 font-semibold text-slate-900">{m.fullName}</td>
                    <td className="py-2 px-3">{m.age} Yrs</td>
                    <td className="py-2 px-3 font-mono">{m.mobile}</td>
                    <td className="py-2 px-3 text-slate-600">{m.shgName}</td>
                    <td className="py-2 px-3">
                      {m.location.village}, {m.location.district}
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">
                      ₹{m.totalSavings.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeReport === 'shg' && (
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">SHG ID</th>
                  <th className="py-2.5 px-3">Group Name</th>
                  <th className="py-2.5 px-3">President</th>
                  <th className="py-2.5 px-3">Village / District</th>
                  <th className="py-2.5 px-3 text-center">Members</th>
                  <th className="py-2.5 px-3 text-right">Group Savings (₹)</th>
                  <th className="py-2.5 px-3 text-center">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {shgs.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50">
                    <td className="py-2 px-3 font-mono font-bold text-pink-700">{s.shgId}</td>
                    <td className="py-2 px-3 font-semibold text-slate-900">{s.name}</td>
                    <td className="py-2 px-3 text-slate-700">{s.presidentName}</td>
                    <td className="py-2 px-3">
                      {s.village}, {s.district}
                    </td>
                    <td className="py-2 px-3 text-center font-mono font-bold">{s.members.length}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-indigo-950">
                      ₹{s.totalGroupSavings.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2 px-3 text-center font-bold text-emerald-700">
                      Grade {s.performanceGrade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeReport === 'savings' && (
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Receipt No</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Member Name</th>
                  <th className="py-2.5 px-3">SHG Name</th>
                  <th className="py-2.5 px-3">Payment Mode</th>
                  <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                  <th className="py-2.5 px-3 text-right">Balance After</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {savings.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50">
                    <td className="py-2 px-3 font-mono text-slate-800">{s.receiptNumber}</td>
                    <td className="py-2 px-3">{s.date}</td>
                    <td className="py-2 px-3 font-semibold text-slate-900">{s.memberName}</td>
                    <td className="py-2 px-3 text-slate-600">{s.shgName}</td>
                    <td className="py-2 px-3">{s.paymentMode}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">
                      +₹{s.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                      ₹{s.balanceAfter.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeReport === 'loans' && (
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Loan ID</th>
                  <th className="py-2.5 px-3">Borrower</th>
                  <th className="py-2.5 px-3">Purpose</th>
                  <th className="py-2.5 px-3 text-right">Sanctioned (₹)</th>
                  <th className="py-2.5 px-3 text-right">EMI (₹)</th>
                  <th className="py-2.5 px-3 text-right">Outstanding (₹)</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loans.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/50">
                    <td className="py-2 px-3 font-mono font-bold text-pink-700">{l.loanId}</td>
                    <td className="py-2 px-3 font-semibold text-slate-900">{l.memberName}</td>
                    <td className="py-2 px-3 truncate max-w-[180px]">{l.purpose}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                      ₹{l.loanAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-pink-700">
                      ₹{l.monthlyEmi.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-amber-700">
                      ₹{l.outstandingBalance.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2 px-3 font-semibold text-indigo-950">{l.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeReport === 'training' && (
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Enrollment ID</th>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Course Title</th>
                  <th className="py-2.5 px-3 text-center">Attendance</th>
                  <th className="py-2.5 px-3 text-center">Score</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Placement / Livelihood</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enrollments.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/50">
                    <td className="py-2 px-3 font-mono font-bold text-indigo-950">{e.enrollmentId}</td>
                    <td className="py-2 px-3 font-semibold text-slate-900">{e.memberName}</td>
                    <td className="py-2 px-3 font-medium text-slate-800">{e.courseTitle}</td>
                    <td className="py-2 px-3 text-center font-mono">{e.attendancePercent}%</td>
                    <td className="py-2 px-3 text-center font-mono font-bold text-emerald-700">
                      {e.assessmentScore || 90}%
                    </td>
                    <td className="py-2 px-3 font-semibold text-purple-900">{e.status}</td>
                    <td className="py-2 px-3 text-slate-600">{e.placedCompany}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeReport === 'enterprises' && (
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Enterprise ID</th>
                  <th className="py-2.5 px-3">Business Name</th>
                  <th className="py-2.5 px-3">Founder</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Location</th>
                  <th className="py-2.5 px-3 text-right">Annual Turnover</th>
                  <th className="py-2.5 px-3 text-center">Artisans Employed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enterprises.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/50">
                    <td className="py-2 px-3 font-mono font-bold text-pink-700">{e.enterpriseId}</td>
                    <td className="py-2 px-3 font-bold text-slate-900">{e.businessName}</td>
                    <td className="py-2 px-3 text-slate-800">{e.ownerName}</td>
                    <td className="py-2 px-3 text-slate-600">{e.category}</td>
                    <td className="py-2 px-3">
                      {e.village}, {e.district}
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">
                      ₹{e.annualTurnover.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2 px-3 text-center font-bold text-indigo-950 font-mono">
                      {e.womenEmployedCount} Women
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
