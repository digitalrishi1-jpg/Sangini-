import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { WomanEnterprise } from '../../types';
import {
  Briefcase,
  TrendingUp,
  MapPin,
  Users,
  Search,
  Plus,
  DollarSign,
  Tag,
  CheckCircle,
  ExternalLink,
  Building,
} from 'lucide-react';

export const EntrepreneurshipManagement: React.FC = () => {
  const { language, t } = useLanguage();
  const { enterprises, registerEnterprise, members } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Form state
  const [businessName, setBusinessName] = useState('');
  const [ownerMemberId, setOwnerMemberId] = useState(members[0]?.memberId || '');
  const [category, setCategory] = useState('Food Processing');
  const [productsStr, setProductsStr] = useState('Pickles, Organic Spices, Papad');
  const [annualTurnover, setAnnualTurnover] = useState<number>(300000);
  const [fundingRequirement, setFundingRequirement] = useState<number>(50000);
  const [fundingReceived, setFundingReceived] = useState<number>(20000);
  const [mentorshipAssigned, setMentorshipAssigned] = useState('District Agro-Science Center');
  const [marketLinkage, setMarketLinkage] = useState('Local Kirana Stores & Weekly Haat');
  const [womenEmployedCount, setWomenEmployedCount] = useState<number>(4);
  const [registrationNumber, setRegistrationNumber] = useState('UDYAM-MP-38-0098421');

  const selectedOwner = members.find((m) => m.memberId === ownerMemberId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !ownerMemberId) {
      alert('Please provide enterprise name and select member.');
      return;
    }

    registerEnterprise({
      businessName,
      ownerMemberId,
      ownerName: selectedOwner ? selectedOwner.fullName : 'SANGINI Member',
      category,
      state: selectedOwner?.location.state || 'Madhya Pradesh',
      district: selectedOwner?.location.district || 'Sehore',
      village: selectedOwner?.location.village || 'Amlaha',
      establishedYear: 2026,
      productsServices: productsStr.split(',').map((p) => p.trim()),
      annualTurnover,
      fundingRequirement,
      fundingReceived,
      mentorshipAssigned,
      marketLinkage,
      womenEmployedCount,
      registrationNumber: registrationNumber.trim() || undefined,
    });

    alert('Women-led enterprise successfully registered into SANGINI marketplace!');
    setShowRegisterModal(false);
  };

  const filtered = enterprises.filter((ent) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        ent.businessName.toLowerCase().includes(q) ||
        ent.ownerName.toLowerCase().includes(q) ||
        ent.category.toLowerCase().includes(q) ||
        ent.village.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs text-slate-500">
            SANGINI / Economic Empowerment / Women-Led Enterprises
          </div>
          <h1 className="text-2xl font-bold text-indigo-950 font-brand mt-1">
            {language === 'hi' ? 'महिला उद्यमिता एवं आजीविका मंच' : 'Women Entrepreneurship & Livelihood'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'लखपति दीदी उद्यम डायरेक्टरी, सूक्ष्म-अनुदान, उत्पाद विपणन एवं ग्रामीण रोजगार।'
              : 'Digital showcase of women-owned rural micro-businesses with Udyam MSME linkage and mentor support.'}
          </p>
        </div>

        <button
          onClick={() => setShowRegisterModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'hi' ? '+ नया महिला उद्यम जोड़ें' : '+ Register Enterprise'}</span>
        </button>
      </div>

      {/* Hero Showcase Card */}
      <div className="bg-gradient-to-r from-pink-950 via-purple-950 to-slate-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-3 max-w-xl">
          <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">
            {language === 'hi' ? 'लखपति दीदी अभियान' : 'Lakhpati Didi Mission'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-brand text-balance">
            {language === 'hi'
              ? 'ग्रामीण महिलाओं को उपभोक्ता से उत्पादक और मालिक बनाना'
              : 'Empowering Women from Consumers to Enterprise Owners'}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            SANGINI connects women-run micro-units with institutional buyers, retail exhibitions (Saras Mela), and ONDC digital commerce networks. Every enterprise provides dignified employment to fellow village women.
          </p>
          <div className="flex gap-6 text-xs pt-1">
            <div>
              <span className="text-2xl font-bold font-mono text-pink-400 block">₹14.8L</span>
              <span className="text-slate-300 text-[11px]">Cumulative Annual Turnover</span>
            </div>
            <div>
              <span className="text-2xl font-bold font-mono text-emerald-400 block">18+</span>
              <span className="text-slate-300 text-[11px]">Rural Women Employed</span>
            </div>
            <div>
              <span className="text-2xl font-bold font-mono text-purple-300 block">100%</span>
              <span className="text-slate-300 text-[11px]">MSME Udyam Verified</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-72 h-44 rounded-xl overflow-hidden border border-white/20 shadow-md shrink-0">
          <img
            src="/src/assets/images/sangini_entrepreneur_story_1794067671459.jpg"
            alt="Woman Entrepreneur Shop"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between gap-3 text-xs">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={
              language === 'hi'
                ? 'उद्यम नाम, उद्यमी सदस्या या श्रेणी से खोजें...'
                : 'Search by enterprise name, founder, product category, or village...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-pink-600 text-xs"
          />
        </div>
      </div>

      {/* Enterprises Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((ent) => (
          <div
            key={ent.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-pink-700 bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
                  {ent.enterpriseId}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {ent.registrationNumber || 'MSME Pending'}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base">{ent.businessName}</h3>
                <div className="text-xs text-indigo-950 font-semibold mt-0.5">
                  Founder: {ent.ownerName}
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>
                    {ent.village}, {ent.district}, {ent.state}
                  </span>
                </div>
              </div>

              {/* Products tags */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Products / Services:</span>
                <div className="flex flex-wrap gap-1 text-[11px]">
                  {ent.productsServices.map((prod, i) => (
                    <span
                      key={i}
                      className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium"
                    >
                      {prod}
                    </span>
                  ))}
                </div>
              </div>

              {/* Financial & Livelihood Metrics */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Annual Turnover</span>
                  <span className="font-mono font-bold text-emerald-700 text-sm">
                    ₹{ent.annualTurnover.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Women Employed</span>
                  <span className="font-mono font-bold text-indigo-950 text-sm">
                    {ent.womenEmployedCount} Artisans
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                <div>
                  <span className="font-semibold text-slate-800">Market Linkage: </span>
                  <span>{ent.marketLinkage}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-800">Mentor: </span>
                  <span>{ent.mentorshipAssigned}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>Active Rural Enterprise</span>
              </span>
              <span className="font-mono text-slate-500 text-[11px]">Est. {ent.establishedYear}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Register Enterprise */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 border border-slate-200 text-xs space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-slate-900 text-sm">Register Women-Led Micro-Enterprise</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Laxmi Gramin Food Products"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Founder / Owner (Member) *</label>
                <select
                  value={ownerMemberId}
                  onChange={(e) => setOwnerMemberId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                >
                  {members.map((m) => (
                    <option key={m.id} value={m.memberId}>
                      {m.fullName} ({m.memberId}) - {m.location.village}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  >
                    <option value="Food Processing">Food Processing</option>
                    <option value="Apparel & Fashion">Apparel &amp; Fashion</option>
                    <option value="Handicrafts & Handloom">Handicrafts &amp; Handloom</option>
                    <option value="Dairy & Livestock">Dairy &amp; Livestock</option>
                    <option value="Organic Farming">Organic Farming</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Annual Turnover (₹)</label>
                  <input
                    type="number"
                    value={annualTurnover}
                    onChange={(e) => setAnnualTurnover(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Products / Services (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Pure Ghee, Paneer, Cow Milk packaging"
                  value={productsStr}
                  onChange={(e) => setProductsStr(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Women Employed</label>
                  <input
                    type="number"
                    value={womenEmployedCount}
                    onChange={(e) => setWomenEmployedCount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Udyam MSME Number</label>
                  <input
                    type="text"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Market Linkage</label>
                <input
                  type="text"
                  value={marketLinkage}
                  onChange={(e) => setMarketLinkage(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Register Enterprise
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
