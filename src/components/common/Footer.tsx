import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Heart, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const { setActiveView } = useAuth();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand & Mission */}
        <div className="space-y-3">
          <div className="text-xl font-bold tracking-tight text-white font-brand">
            SANGINI · संगिनी
          </div>
          <p className="text-pink-400 font-medium text-xs">
            {language === 'hi' ? 'सशक्त नारी, समृद्ध समाज' : 'Empowering Women. Transforming Communities.'}
          </p>
          <p className="text-slate-400 text-xs leading-relaxed">
            {language === 'hi'
              ? 'संगिनी ग्रामीण एवं अर्ध-शहरी महिलाओं के आर्थिक, सामाजिक और डिजिटल सशक्तिकरण हेतु भारत का अग्रणी मंच है।'
              : 'SANGINI is India’s enterprise-grade platform for rural women empowerment through SHG formation, microfinance, transparent thrift savings, and skill livelihoods.'}
          </p>
        </div>

        {/* Col 2: Core Programs */}
        <div className="space-y-2">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">
            {language === 'hi' ? 'प्रमुख कार्यक्रम' : 'Key Programs'}
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button
                onClick={() => setActiveView('shg')}
                className="hover:text-pink-400 transition-colors cursor-pointer text-left"
              >
                {language === 'hi' ? 'स्वयं सहायता समूह (SHG) गठन' : 'Self Help Group Formation'}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('savings')}
                className="hover:text-pink-400 transition-colors cursor-pointer text-left"
              >
                {language === 'hi' ? 'डिजिटल बचत खाता एवं लेजर' : 'Digital Savings Management'}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('loans')}
                className="hover:text-pink-400 transition-colors cursor-pointer text-left"
              >
                {language === 'hi' ? 'माइक्रोफाइनेंस एवं आसान ऋण' : 'Microloans & Financial Inclusion'}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('skills')}
                className="hover:text-pink-400 transition-colors cursor-pointer text-left"
              >
                {language === 'hi' ? 'कौशल विकास एवं रोजगार प्रशिक्षण' : 'Vocational Skill Development'}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('schemes')}
                className="hover:text-pink-400 transition-colors cursor-pointer text-left"
              >
                {language === 'hi' ? 'लखपति दीदी एवं सरकारी योजनाएं' : 'Lakhpati Didi & Govt Schemes'}
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Contact & Field Network */}
        <div className="space-y-2.5">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">
            {language === 'hi' ? 'संपर्क एवं सहायता' : 'Helpline & Office'}
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-pink-400 shrink-0" />
              <span>1800-SANGINI (1800-726-4464)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-pink-400 shrink-0" />
              <span>contact@sangini.org</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
              <span>National Mission Center: Sehore / Bhopal Road, Madhya Pradesh, India</span>
            </div>
          </div>
        </div>

        {/* Col 4: Compliance & Data Protection */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>DPDPA 2023 Compliant</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            {language === 'hi'
              ? 'महिलाओं की व्यक्तिगत और वित्तीय जानकारी का संरक्षण भारत के डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDPA 2023) के अनुसार पूरी तरह सुरक्षित एवं गोपनीय रखा जाता है।'
              : 'All women members’ personal and financial records are strictly protected under India’s Digital Personal Data Protection Act 2023. Explicit consent is verified.'}
          </p>
          <div className="pt-2 text-[11px] text-slate-500">
            Audit logs &amp; role-based isolation enforced across field and state databases.
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 py-4 px-6 text-center text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2">
        <span>© 2026 SANGINI Women Empowerment Organization. All rights reserved.</span>
        <span className="flex items-center gap-1">
          Made for rural women empowerment in India with <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-600" />
        </span>
      </div>
    </footer>
  );
};
