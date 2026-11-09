import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { Member } from '../../types';
import {
  UserPlus,
  CheckCircle,
  MapPin,
  Calendar,
  Phone,
  Shield,
  Briefcase,
  GraduationCap,
  Plus,
  Sparkles,
} from 'lucide-react';
import { DigitalCardModal } from '../common/DigitalCardModal';

export const MemberRegistration: React.FC<{ onSuccessView?: (memberId: string) => void }> = ({
  onSuccessView,
}) => {
  const { language, t } = useLanguage();
  const { locations, shgs, fieldOfficers, registerMember, addLocationEntity } = useData();

  // Form State
  const [fullName, setFullName] = useState('');
  const [hindiName, setHindiName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [husbandName, setHusbandName] = useState('');
  const [dob, setDob] = useState('1994-06-15');
  const [mobile, setMobile] = useState('');
  const [alternateMobile, setAlternateMobile] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState('10th Standard');
  const [occupation, setOccupation] = useState('Tailoring & Handicrafts');
  const [maritalStatus, setMaritalStatus] = useState<Member['maritalStatus']>('Married');
  const [aadhaarVerified, setAadhaarVerified] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
  );

  // Hierarchical Location State
  const [state, setState] = useState('Madhya Pradesh');
  const [district, setDistrict] = useState('Sehore');
  const [block, setBlock] = useState('Ichhawar');
  const [panchayat, setPanchayat] = useState('Amlaha Gram');
  const [village, setVillage] = useState('Amlaha Kalan');
  const [ward, setWard] = useState('Ward 1');
  const [pinCode, setPinCode] = useState('466115');

  // SHG & Field Officer
  const [shgId, setShgId] = useState(shgs[0]?.shgId || 'SHG-MP-001');
  const [assignedFieldOfficerId, setAssignedFieldOfficerId] = useState(fieldOfficers[0]?.id || 'fo-001');

  // Location Modal State
  const [showAddLocationModal, setShowAddLocationModal] = useState(false);
  const [newVillageName, setNewVillageName] = useState('');
  const [newPanchayatName, setNewPanchayatName] = useState('');

  // Created Member Modal
  const [createdMember, setCreatedMember] = useState<Member | null>(null);

  // Auto-calculate Age
  const calculateAge = (dobString: string): number => {
    if (!dobString) return 30;
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return Math.max(18, age);
  };

  const calculatedAge = calculateAge(dob);

  // Available Hierarchy options
  const stateData = (locations as any)[state] || {};
  const districtList = Object.keys(stateData.districts || {});
  const districtData = stateData.districts?.[district] || {};
  const blockList = Object.keys(districtData.blocks || {});
  const blockData = districtData.blocks?.[block] || {};
  const panchayatList = Object.keys(blockData.panchayats || {});
  const villageList = blockData.panchayats?.[panchayat] || ['Main Village', 'Ward 1'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !fatherName.trim() || !mobile.trim()) {
      alert('Please fill in required fields: Full Name, Father/Husband Name, and Mobile Number.');
      return;
    }

    const selectedShg = shgs.find((s) => s.shgId === shgId);
    const selectedFo = fieldOfficers.find((f) => f.id === assignedFieldOfficerId);

    const newMember = registerMember({
      fullName,
      hindiName: hindiName || undefined,
      fatherName,
      motherName: motherName || undefined,
      husbandName: husbandName || undefined,
      dob,
      age: calculatedAge,
      mobile,
      alternateMobile: alternateMobile || undefined,
      email: email || undefined,
      photoUrl,
      aadhaarVerified,
      education,
      occupation,
      maritalStatus,
      location: {
        state,
        district,
        block,
        panchayat,
        village,
        ward,
        pinCode,
      },
      shgId: selectedShg ? selectedShg.shgId : 'SHG-MP-001',
      shgName: selectedShg ? selectedShg.name : 'Kiran Mahila Samuh',
      membershipDate: new Date().toISOString().split('T')[0],
      assignedFieldOfficerId: selectedFo ? selectedFo.id : 'fo-001',
      assignedFieldOfficerName: selectedFo ? selectedFo.name : 'Pooja Verma',
      status: 'Active',
    });

    setCreatedMember(newMember);
  };

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (newVillageName.trim()) {
      addLocationEntity(
        state,
        district,
        block,
        newPanchayatName.trim() || panchayat,
        newVillageName.trim()
      );
      setVillage(newVillageName.trim());
      setNewVillageName('');
      setShowAddLocationModal(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-indigo-950 font-brand">
              {language === 'hi' ? 'महिला सदस्या डिजिटल पंजीकरण फॉर्म' : 'Women Member Digital Registration'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'नया सदस्य पहचान पत्र, स्वयं सहायता समूह आवंटन एवं डिजिटल पहचान निर्माण।'
                : 'Enroll rural woman member, assign SHG collective, calculate age, and generate instant digital membership ID card.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 mt-6">
          {/* Section 1: Personal Details */}
          <div>
            <h3 className="text-xs font-bold text-pink-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-800 text-[11px] flex items-center justify-center font-bold">1</span>
              <span>Personal Information / व्यक्तिगत विवरण</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Full Name (English) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meena Bai Parmar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-pink-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  पूरा नाम (हिन्दी में)
                </label>
                <input
                  type="text"
                  placeholder="उदा. मीना बाई परमार"
                  value={hindiName}
                  onChange={(e) => setHindiName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-pink-600 focus:bg-white font-hindi"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Father's Name (पिता का नाम) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mohanlal Parmar"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-pink-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Husband's Name (पति का नाम)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dinesh Parmar"
                  value={husbandName}
                  onChange={(e) => setHusbandName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-pink-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Date of Birth (जन्म तिथि) *
                </label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-pink-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Calculated Age (आयु)
                </label>
                <input
                  type="text"
                  disabled
                  value={`${calculatedAge} Years (वयस्क)`}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Mobile Number (मोबाइल नंबर) *
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  placeholder="10-digit mobile (e.g. 9827301145)"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-pink-600 focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Alternate Mobile (वैकल्पिक नंबर)
                </label>
                <input
                  type="tel"
                  placeholder="Optional 10-digit mobile"
                  value={alternateMobile}
                  onChange={(e) => setAlternateMobile(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-pink-600 focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Marital Status (वैवाहिक स्थिति)
                </label>
                <select
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-pink-600 focus:bg-white"
                >
                  <option value="Married">Married (विवाहित)</option>
                  <option value="Unmarried">Unmarried (अविवाहित)</option>
                  <option value="Widow">Widow (विधवा)</option>
                  <option value="Divorced">Divorced (परित्यक्ता)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Educational Qualification (शिक्षा)
                </label>
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-pink-600 focus:bg-white"
                >
                  <option value="Literate (Can Read/Write)">Literate (साक्षर)</option>
                  <option value="5th Standard">Primary (5th Pass)</option>
                  <option value="8th Standard">Middle School (8th Pass)</option>
                  <option value="10th Standard">10th Standard (High School)</option>
                  <option value="12th Pass">12th Pass (Higher Secondary)</option>
                  <option value="Graduate (B.A./B.Com/B.Sc)">Graduate (स्नातक)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Primary Occupation (मुख्य व्यवसाय)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tailoring, Dairy, Handicrafts"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-pink-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Aadhaar Verification (DPDPA Compliant)
                </label>
                <div className="flex items-center gap-2 pt-1.5">
                  <input
                    type="checkbox"
                    id="aadhaarVer"
                    checked={aadhaarVerified}
                    onChange={(e) => setAadhaarVerified(e.target.checked)}
                    className="w-4 h-4 text-pink-600 rounded accent-pink-600 cursor-pointer"
                  />
                  <label htmlFor="aadhaarVer" className="text-slate-600 text-xs cursor-pointer">
                    Physical Aadhaar sighted & verified by Field Officer
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Hierarchical Address */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-pink-700 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-800 text-[11px] flex items-center justify-center font-bold">2</span>
                <span>Address Hierarchy (State → District → Block → Panchayat → Village → Ward)</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddLocationModal(true)}
                className="text-xs text-indigo-700 hover:text-indigo-900 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Custom Village</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              {/* State */}
              <div>
                <label className="block text-slate-600 font-semibold mb-1">State (राज्य)</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                >
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Rajasthan">Rajasthan</option>
                </select>
              </div>

              {/* District */}
              <div>
                <label className="block text-slate-600 font-semibold mb-1">District (जिला)</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                >
                  {districtList.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Block */}
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Block (विकासखंड)</label>
                <select
                  value={block}
                  onChange={(e) => setBlock(e.target.value)}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                >
                  {blockList.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Panchayat */}
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Panchayat (ग्राम पंचायत)</label>
                <select
                  value={panchayat}
                  onChange={(e) => setPanchayat(e.target.value)}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                >
                  {panchayatList.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Village */}
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Village (गांव)</label>
                <select
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold text-pink-700"
                >
                  {villageList.map((v: string) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ward / PIN */}
              <div>
                <label className="block text-slate-600 font-semibold mb-1">PIN Code (पिन कोड)</label>
                <input
                  type="text"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 3: SHG Affiliation & Field Officer */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-xs font-bold text-pink-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-800 text-[11px] flex items-center justify-center font-bold">3</span>
              <span>Self Help Group Allocation & Field Officer</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Assign to Self Help Group (स्वयं सहायता समूह) *
                </label>
                <select
                  value={shgId}
                  onChange={(e) => setShgId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                >
                  {shgs.map((s) => (
                    <option key={s.id} value={s.shgId}>
                      {s.name} ({s.shgId}) - {s.village}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Assigned Field Officer (क्षेत्रीय अधिकारी) *
                </label>
                <select
                  value={assignedFieldOfficerId}
                  onChange={(e) => setAssignedFieldOfficerId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                >
                  {fieldOfficers.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.assignedDistrict})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{language === 'hi' ? 'सदस्या पंजीकृत करें एवं डिजिटल कार्ड बनाएं' : 'Register Member & Issue Digital Card'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Add Custom Location Modal */}
      {showAddLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-2xs">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-200 text-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">
              Add New Village / Habitation to Hierarchy
            </h3>
            <p className="text-slate-500">
              Adding new rural habitation under {block} Block, {district} District.
            </p>
            <form onSubmit={handleAddLocation} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Panchayat Name</label>
                <input
                  type="text"
                  placeholder="e.g. Kalyanpur Gram"
                  value={newPanchayatName}
                  onChange={(e) => setNewPanchayatName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">New Village Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rampura Khurd"
                  value={newVillageName}
                  onChange={(e) => setNewVillageName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLocationModal(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold cursor-pointer"
                >
                  Add Village
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pop-up modal with generated Digital ID card upon submission */}
      {createdMember && (
        <DigitalCardModal
          member={createdMember}
          onClose={() => {
            setCreatedMember(null);
            if (onSuccessView) onSuccessView(createdMember.memberId);
          }}
        />
      )}
    </div>
  );
};
