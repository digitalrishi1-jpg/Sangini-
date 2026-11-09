import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  Users,
  ShieldCheck,
  TrendingUp,
  Award,
  Briefcase,
  Layers,
  ArrowRight,
  CheckCircle,
  Calculator,
  ChevronRight,
  Building,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { EmiCalculatorModal } from '../common/EmiCalculatorModal';

export const LandingPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { setActiveView } = useAuth();
  const { stats } = useData();
  const [showEmiModal, setShowEmiModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'shg' | 'finance' | 'skills' | 'enterprises'>('shg');

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-950 via-indigo-950 to-slate-950 text-white pt-10 pb-16 px-6 lg:px-12 rounded-b-3xl shadow-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-pink-400 uppercase tracking-widest">
              <span>{language === 'hi' ? 'संगिनी महिला सशक्तिकरण अभियान' : 'SANGINI Women Empowerment'}</span>
              <span>·</span>
              <span className="text-purple-300">
                {language === 'hi' ? 'सशक्त नारी, समृद्ध समाज' : 'Empowering Women. Transforming Communities.'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-balance font-brand">
              {language === 'hi'
                ? 'डिजिटल वित्तीय समावेशन से ग्रामीण नारी का स्वावलंबन'
                : 'Empowering Rural Women Through Digital Financial Inclusion'}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {language === 'hi'
                ? 'संगिनी भारत का अग्रणी डिजिटल स्वयं सहायता समूह (SHG) प्रबंधन, सूक्ष्म वित्त, कौशल विकास एवं महिला आजीविका मंच है, जो गांव-गांव तक पारदर्शिता और आत्मनिर्भरता ला रहा है।'
                : 'SANGINI is India’s premier digital Self Help Group platform, transforming rural lives through transparent thrift savings, microloans, vocational training, and women-led rural micro-enterprises.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveView('members')}
                className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{language === 'hi' ? 'नई सदस्या का पंजीकरण' : 'Register New Member'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveView('dashboard')}
                className="px-5 py-3 text-sm font-semibold text-purple-200 bg-white/10 hover:bg-white/15 rounded-xl border border-white/20 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>{language === 'hi' ? 'केंद्रीय डैशबोर्ड देखें' : 'View Admin Dashboard'}</span>
              </button>

              <button
                onClick={() => setShowEmiModal(true)}
                className="px-4 py-3 text-sm font-medium text-pink-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>{language === 'hi' ? 'ईएमआई कैलकुलेटर' : 'EMI Calculator'}</span>
              </button>
            </div>

            {/* Grassroots Trust Markers */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Aadhaar KYC Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>RBI SHG Guidelines Aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-pink-400" />
                <span>98.4% Loan Recovery Rate</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Res Generated Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-indigo-900/50">
              <img
                src="/src/assets/images/sangini_hero_women_1794067669275.jpg"
                alt="Empowered Indian Women in Self Help Group Meeting"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-xs text-white">
                <p className="font-semibold text-pink-300">Kiran Mahila SHG, Amlaha Village (Sehore)</p>
                <p className="text-[11px] text-slate-200">
                  Weekly thrift collection and micro-credit sanction meeting in progress.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-KPI Row Strip */}
        <div className="max-w-7xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
            <div className="text-xs uppercase text-slate-400 font-medium">
              {language === 'hi' ? 'कुल पंजीकृत महिलाएं' : 'Registered Women'}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1 tabular-nums">
              {stats.totalRegisteredWomen}+
            </div>
            <div className="text-[11px] text-pink-400 mt-0.5">Grassroots mobilization</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
            <div className="text-xs uppercase text-slate-400 font-medium">
              {language === 'hi' ? 'सक्रिय स्वयं सहायता समूह' : 'Active SHGs'}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1 tabular-nums">
              {stats.totalSHGs} Groups
            </div>
            <div className="text-[11px] text-purple-300 mt-0.5">Democratic collectives</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
            <div className="text-xs uppercase text-slate-400 font-medium">
              {language === 'hi' ? 'कुल संचित समूह बचत' : 'Group Savings'}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-pink-400 font-mono mt-1 tabular-nums">
              ₹{(stats.totalSavings / 100000).toFixed(2)} Lakhs
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">Direct in group bank pool</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
            <div className="text-xs uppercase text-slate-400 font-medium">
              {language === 'hi' ? 'ऋण वसूली दर' : 'Repayment Rate'}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono mt-1 tabular-nums">
              {stats.overallRecoveryRate}%
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">Peer accountability</div>
          </div>
        </div>
      </section>

      {/* 2. About SANGINI & Vision / Mission */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">
            {language === 'hi' ? 'संगिनी संस्था परिचय' : 'About Organization'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-brand">
            {language === 'hi' ? 'संगिनी: स्वावलंबन और सम्मान की नई सुबह' : 'SANGINI: Transforming Rural Communities'}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {language === 'hi'
              ? 'संगिनी भारत की ग्रामीण एवं छोटे कस्बों की महिलाओं को आर्थिक रूप से सशक्त, तकनीकी रूप से दक्ष और सामाजिक रूप से जागरूक बनाने वाला एक मिशन-आधारित मंच है।'
              : 'SANGINI is a women-centric social and economic empowerment ecosystem. We believe that when a woman earns and manages finances, her entire family and village prosper.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {language === 'hi' ? 'हमारा मिशन (Our Mission)' : 'Our Mission'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'hi'
                ? 'गाँव-गाँव में स्वयं सहायता समूहों (SHGs) का गठन करना, नियमित बचत को बढ़ावा देना, आसान एवं किफायती ऋण उपलब्ध कराना, महिलाओं को व्यावसायिक प्रशिक्षण देकर उन्हें सफल उद्यमी बनाना और सरकारी कल्याणकारी योजनाओं से जोड़ना।'
                : 'To mobilize, organize, and support rural women through disciplined Self Help Groups, zero-exploitation microcredit, vocational certifications, market linkages, and direct access to government development schemes.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {language === 'hi' ? 'हमारी दूरदृष्टि (Our Vision)' : 'Our Vision'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'hi'
                ? 'भारत के 1 करोड़ (10 Million) ग्रामीण महिलाओं को डिजिटल रूप से साक्षर और आर्थिक रूप से स्वतंत्र बनाकर देश के सबसे बड़े पारदर्शी एवं तकनीकी-संचालित महिला सशक्तिकरण मंच का निर्माण करना।'
                : 'To build India’s most transparent, high-performing digital women empowerment platform, empowering over 10 million rural women from poverty into self-reliant entrepreneurs and community leaders.'}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Core Empowerment Programs (Interactive Showcase) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">
              {language === 'hi' ? 'कार्यक्रम एवं कार्यक्षेत्र' : 'Integrated Programs'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-brand mt-1">
              {language === 'hi' ? 'संगिनी के 4 प्रमुख सशक्तिकरण स्तंभ' : '4 Pillars of Women Empowerment'}
            </h2>
          </div>

          {/* Interactive Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
            <button
              onClick={() => setActiveTab('shg')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'shg' ? 'bg-white text-pink-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              SHG Formation
            </button>
            <button
              onClick={() => setActiveTab('finance')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'finance' ? 'bg-white text-pink-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Savings & Microloans
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'skills' ? 'bg-white text-pink-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Skill Training
            </button>
            <button
              onClick={() => setActiveTab('enterprises')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'enterprises' ? 'bg-white text-pink-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Enterprises
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        {activeTab === 'shg' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-xs">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-pink-600 uppercase">Self Help Group Movement</span>
              <h3 className="text-xl font-bold text-slate-900">
                {language === 'hi'
                  ? 'गाँव में 10-20 महिलाओं का लोकतांत्रिक और आत्मनिर्भर समूह'
                  : 'Democratic SHGs of 10–20 Village Women'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'प्रत्येक समूह का अपना अध्यक्ष, सचिव और कोषाध्यक्ष होता है। हर हफ्ते बैठकें आयोजित होती हैं, जहां महिलाएं अपनी बचत जमा करती हैं और आपसी सहमति से कम ब्याज पर ऋण लेती हैं।'
                  : 'Each SHG elects its President, Secretary, and Treasurer. Weekly meetings foster mutual trust, transparent book-keeping, peer accountability, and joint bank accounts in nationalized banks.'}
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Weekly meetings with attendance register & digital minutes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Joint bank account with masked digits for financial privacy</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Panchasutra compliance for national NRLM grading</span>
                </li>
              </ul>
              <button
                onClick={() => setActiveView('shg')}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-pink-700 hover:text-pink-800 cursor-pointer"
              >
                <span>{language === 'hi' ? 'समूह प्रबंधन मॉड्यूल देखें' : 'Explore SHG Management Module'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              <img
                src="/src/assets/images/sangini_hero_women_1794067669275.jpg"
                alt="SHG Roster and Activity"
                className="w-full h-64 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-xs">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-indigo-700 uppercase">Microfinance & Savings</span>
              <h3 className="text-xl font-bold text-slate-900">
                {language === 'hi'
                  ? 'पारदर्शी बचत खाता और बिना गिरवी आसान माइक्रोलोन'
                  : 'Transparent Digital Savings & Collateral-Free Microloans'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'साहूकारों के शोषण से मुक्ति दिलाते हुए मात्र ₹100 से ₹500 की साप्ताहिक बचत से महिलाओं के नाम पर सुरक्षित पूंजी तैयार होती है। व्यवसाय, सिलाई मशीन, मवेशी और बच्चों की शिक्षा हेतु सुलभ ऋण।'
                  : 'Eliminating predatory informal moneylenders through disciplined micro-savings. Loans are disbursed with multi-tier approval workflow (Field Officer → Block Manager → District Lead).'}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowEmiModal(true)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-900 hover:bg-indigo-950 rounded-lg cursor-pointer flex items-center gap-1.5"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Calculate EMI & Repayments</span>
                </button>
                <button
                  onClick={() => setActiveView('loans')}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                >
                  View Loan Pipeline
                </button>
              </div>
            </div>
            <div className="bg-indigo-50/70 p-6 rounded-xl border border-indigo-100 space-y-3">
              <h4 className="font-bold text-indigo-950 text-sm">Loan Pipeline & Hierarchy</h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-indigo-100 flex items-center justify-between">
                  <span className="font-medium text-slate-800">1. Member Application Submitted</span>
                  <span className="text-[11px] text-pink-600 font-semibold">Field Visit Initiated</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-indigo-100 flex items-center justify-between">
                  <span className="font-medium text-slate-800">2. Field Officer Physical KYC Check</span>
                  <span className="text-[11px] text-amber-700 font-semibold">Resolution Verified</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-indigo-100 flex items-center justify-between">
                  <span className="font-medium text-slate-800">3. Block & District Sanction</span>
                  <span className="text-[11px] text-emerald-700 font-semibold">Bank Disbursal</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-xs">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-pink-600 uppercase">Skill India & SANGINI Lab</span>
              <h3 className="text-xl font-bold text-slate-900">
                {language === 'hi'
                  ? '9 व्यावसायिक कौशल पाठ्यक्रम एवं प्रमाणित प्रशिक्षण'
                  : '9 Vocational Skill Categories with QR-Verified Certificates'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'सिलाई, ब्यूटी पार्लर, कंप्यूटर साक्षरता, खाद्य प्रसंस्करण और हस्तशिल्प में पूर्णतः निशुल्क प्रशिक्षण देकर महिलाओं को तुरंत आजीविका और स्वरोजगार से जोड़ा जाता है।'
                  : 'Offering certified vocational courses in tailoring, salon wellness, digital marketing, organic food curing, and handloom handicrafts with 80%+ direct placement or self-employment outcomes.'}
              </p>
              <button
                onClick={() => setActiveView('skills')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                <span>{language === 'hi' ? 'प्रशिक्षण केंद्र एवं कोर्स सूची' : 'Explore Courses & Certifications'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <img
                src="/src/assets/images/sangini_artisan_craft_1794067670240.jpg"
                alt="Vocational Skill Training"
                className="w-full h-64 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {activeTab === 'enterprises' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-xs">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-purple-700 uppercase">Lakhpati Didi & Enterprises</span>
              <h3 className="text-xl font-bold text-slate-900">
                {language === 'hi'
                  ? 'महिला उद्यमियों के उत्पादों की सीधी बाजार तक पहुंच'
                  : 'Market Linkage & Direct Mentorship for Rural Enterprises'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'ग्रामीण महिला उत्पादकों के मसालों, आचार, पापड़, कपड़ों और हस्तशिल्प को डिजिटल बाजार, उद्योग आधार (Udyam) और सरकारी मेलों से जोड़कर लखपति दीदी बनाने का संकल्प।'
                  : 'Fostering scalable rural micro-enterprises with MSME registration, FSSAI compliance, ONDC cataloging, and corporate mentorship.'}
              </p>
              <button
                onClick={() => setActiveView('enterprises')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                <span>{language === 'hi' ? 'महिला उद्यम डायरेक्टरी देखें' : 'View Enterprise Directory'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <img
                src="/src/assets/images/sangini_entrepreneur_story_1794067671459.jpg"
                alt="Women-Led Rural Enterprise"
                className="w-full h-64 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}
      </section>

      {/* 4. Success Stories Showcase */}
      <section className="bg-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">
              {language === 'hi' ? 'स्वावलंबन की सच्ची गाथाएं' : 'Grassroots Testimonials'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-brand">
              {language === 'hi' ? 'बदलाव की प्रेरक कहानियां' : 'Stories of Dignity & Independence'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/images/sangini_entrepreneur_story_1794067671459.jpg"
                  alt="Anita Patel"
                  className="w-12 h-12 rounded-full object-cover border-2 border-pink-500"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Anita Patel</h4>
                  <p className="text-[11px] text-pink-700 font-medium">Founder, Narmada Pure Foods</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                &ldquo;Before SANGINI, I had to borrow at 5% monthly interest from local moneylenders for crop seeds. Through my SHG, I took a ₹40,000 microloan, set up food processing, and now earn ₹35,000 monthly, employing 6 other women.&rdquo;
              </p>
              <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                Shahganj Village, Sehore · Lakhpati Didi Beneficiary
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/images/sangini_artisan_craft_1794067670240.jpg"
                  alt="Meena Bai Parmar"
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Meena Bai Parmar</h4>
                  <p className="text-[11px] text-purple-700 font-medium">Secretary, Kiran SHG & Tailor</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                &ldquo;Completing the 8-week SANGINI Tailoring certification gave me the skills to sew bridal wear and school uniforms. My digital QR membership card helped me get an instant bank loan with zero bribe or hassle.&rdquo;
              </p>
              <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                Amlaha Kalan, Ichhawar · Certified Master Tailor
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-900 text-white font-bold flex items-center justify-center text-sm border-2 border-indigo-700">
                  RA
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Rekha Ahirwar</h4>
                  <p className="text-[11px] text-indigo-700 font-medium">Village CSC Bank Sakhi</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                &ldquo;I was trained in computer operations and AePS biometric banking. Today, elderly grandmothers in my panchayat withdraw pensions directly at my desk without walking 14 km to the nearest bank branch.&rdquo;
              </p>
              <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                Ichhawar Block · Digital Literacy Graduate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Call to Action / Helpline Banner */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-900 text-white rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-brand">
            {language === 'hi'
              ? 'क्या आप अपने गाँव में नया महिला स्वयं सहायता समूह शुरू करना चाहती हैं?'
              : 'Join India’s Digital Women Empowerment Movement Today'}
          </h2>
          <p className="text-xs sm:text-sm text-pink-100 max-w-2xl mx-auto leading-relaxed">
            {language === 'hi'
              ? 'हमारे क्षेत्रीय फील्ड अधिकारी आपके गांव आकर समूह गठन, बैंक खाता खोलने और प्रशिक्षण में संपूर्ण निशुल्क मार्गदर्शन देंगे।'
              : 'Our dedicated field officers will visit your village to facilitate SHG formation, bank account opening, and free vocational training.'}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
            <button
              onClick={() => setActiveView('members')}
              className="px-6 py-3 bg-white text-pink-700 hover:bg-pink-50 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              {language === 'hi' ? 'सदस्या पंजीकरण फॉर्म भरें' : 'Register a Woman Member Now'}
            </button>
            <button
              onClick={() => setActiveView('shg')}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl border border-white/30 transition-all cursor-pointer"
            >
              {language === 'hi' ? 'नया समूह (SHG) बनाएं' : 'Create New SHG'}
            </button>
          </div>
        </div>
      </section>

      {/* Modal for EMI Calculator */}
      {showEmiModal && (
        <EmiCalculatorModal
          onClose={() => setShowEmiModal(false)}
          onApplyLoan={() => {
            setActiveView('loans');
          }}
        />
      )}
    </div>
  );
};
