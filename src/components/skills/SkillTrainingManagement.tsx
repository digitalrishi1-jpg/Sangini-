import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { TrainingCourse, TrainingEnrollment } from '../../types';
import {
  GraduationCap,
  Award,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Users,
  Briefcase,
  Printer,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { CertificateModal } from '../common/CertificateModal';

export const SkillTrainingManagement: React.FC = () => {
  const { language, t } = useLanguage();
  const { courses, enrollments, enrollInCourse, issueCertificate, members } = useData();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedEnrollmentForCert, setSelectedEnrollmentForCert] = useState<TrainingEnrollment | null>(null);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.courseId || '');
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.memberId || '');

  const categories = [
    'All',
    'Tailoring & Textiles',
    'Beauty & Salon',
    'Computer Education',
    'Food Processing',
    'Digital Marketing',
    'Handicrafts & Art',
  ];

  const filteredCourses = courses.filter((c) => {
    if (activeCategory !== 'All' && c.category !== activeCategory) return false;
    return true;
  });

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMemberId || !selectedCourseId) return;

    enrollInCourse(selectedMemberId, selectedCourseId);
    alert('Member successfully enrolled in vocational training batch.');
    setShowEnrollModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs text-slate-500">
            SANGINI / Livelihood Missions / Skill Development &amp; Kaushal Vikas
          </div>
          <h1 className="text-2xl font-bold text-indigo-950 font-brand mt-1">
            {language === 'hi' ? 'कौशल विकास एवं व्यावसायिक प्रशिक्षण' : 'Skill Development & Vocational Training'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? '9 व्यावसायिक श्रेणियां, निःशुल्क प्रशिक्षण केंद्र, उपस्थिति ट्रैकिंग एवं क्यूआर-सत्यापित प्रमाण पत्र।'
              : 'Certified vocational programs with QR-verifiable diplomas and direct market/wage placements.'}
          </p>
        </div>

        <button
          onClick={() => setShowEnrollModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'hi' ? '+ सदस्या को दाखिला दें' : '+ Enroll in Course'}</span>
        </button>
      </div>

      {/* Visual Image Banner & Statistics */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-3 max-w-xl">
          <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">
            Skill India &amp; SANGINI Kaushal Mission
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-brand text-balance">
            {language === 'hi'
              ? 'हुनर से स्वावलंबन: हर गाँव की दीदी बनेगी आत्मनिर्भर'
              : 'Vocational Mastery for Sustainable Rural Livelihoods'}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            All programs are 100% subsidized for active SHG members. Training centers operate on a dual model: 60% hands-on practical workshop and 40% business and digital marketing fundamentals.
          </p>
          <div className="flex gap-6 text-xs pt-1">
            <div>
              <span className="text-2xl font-bold font-mono text-pink-400 block">340+</span>
              <span className="text-slate-300 text-[11px]">Women Certified</span>
            </div>
            <div>
              <span className="text-2xl font-bold font-mono text-emerald-400 block">82%</span>
              <span className="text-slate-300 text-[11px]">Placement/Self-Employed</span>
            </div>
            <div>
              <span className="text-2xl font-bold font-mono text-amber-400 block">9</span>
              <span className="text-slate-300 text-[11px]">Certified Trades</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-72 h-44 rounded-xl overflow-hidden border border-white/20 shadow-md shrink-0">
          <img
            src="/src/assets/images/sangini_artisan_craft_1794067670240.jpg"
            alt="Artisan Training Workshop"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 font-semibold rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
              activeCategory === cat
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  {c.courseId}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  100% Subsidized
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm">{c.title}</h3>
              {c.hindiTitle && (
                <div className="text-xs text-pink-700 font-hindi font-medium">{c.hindiTitle}</div>
              )}

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {c.description}
              </p>

              <div className="pt-2 text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Duration: {c.durationWeeks} Weeks</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{c.trainingCenter}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Trainer: {c.trainerName}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Enrolled / Seats:</span>
                <span className="font-bold font-mono text-slate-800">
                  {c.enrolledCount} / {c.totalSeats}
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedCourseId(c.courseId);
                  setShowEnrollModal(true);
                }}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-semibold rounded-lg cursor-pointer"
              >
                Enroll Member
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Certified Students Roster & Issued Certificates */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              {language === 'hi' ? 'प्रमाणित प्रशिक्षणार्थी एवं स्थानन पंजी' : 'Certified Students & Placement Register'}
            </h3>
            <p className="text-xs text-slate-500">
              Instant digital verification and downloadable certificates with unique QR credential.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-3 px-4">Enrollment ID</th>
                <th className="py-3 px-4">Candidate Name</th>
                <th className="py-3 px-4">Course Program</th>
                <th className="py-3 px-4 text-center">Attendance / Score</th>
                <th className="py-3 px-4">Placement / Enterprise Outcome</th>
                <th className="py-3 px-4 text-center">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enrollments.map((enr) => (
                <tr key={enr.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-indigo-950">
                    {enr.enrollmentId}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{enr.memberName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{enr.memberId}</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {enr.courseTitle}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-mono font-semibold text-slate-800">
                      {enr.attendancePercent}% Att.
                    </span>
                    {enr.assessmentScore && (
                      <span className="text-[10px] text-emerald-700 block font-bold">
                        Score: {enr.assessmentScore}%
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-purple-950">{enr.placedCompany}</div>
                    {enr.monthlySalary && (
                      <span className="text-[10px] text-emerald-700 font-mono font-bold">
                        Earns ₹{enr.monthlySalary.toLocaleString('en-IN')}/mo
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {enr.status === 'Certified' || enr.status === 'Placed' ? (
                      <button
                        onClick={() => setSelectedEnrollmentForCert(enr)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded font-semibold text-[11px] border border-amber-200 transition-colors cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>View Diploma</span>
                      </button>
                    ) : (
                      <span className="text-slate-400 text-[11px] italic">In Progress</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enroll Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200 text-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Enroll Member in Vocational Course</h3>
            <form onSubmit={handleEnrollSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Select Member</label>
                <select
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                >
                  {members.map((m) => (
                    <option key={m.id} value={m.memberId}>
                      {m.fullName} ({m.memberId}) - {m.location.village}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Select Course</label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.courseId}>
                      {c.title} ({c.durationWeeks} Weeks)
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEnrollModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Confirm Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Certificate Modal */}
      {selectedEnrollmentForCert && (
        <CertificateModal
          enrollment={selectedEnrollmentForCert}
          onClose={() => setSelectedEnrollmentForCert(null)}
        />
      )}
    </div>
  );
};
