import React, { useState } from 'react';
import { useAuth, PRESET_USERS } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { UserRole } from '../../types';
import {
  Bell,
  Globe,
  UserCheck,
  ChevronDown,
  Menu,
  X,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, switchRole, activeView, setActiveView } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { notifications, markNotificationRead } = useData();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifDrawer, setShowNotifDrawer] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleList: UserRole[] = [
    'Super Admin',
    'State Admin',
    'District Manager',
    'Block Manager',
    'Panchayat Coordinator',
    'Field Officer',
    'SHG President',
    'SHG Secretary',
    'SHG Treasurer',
    'Member',
  ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Utility Belt */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 sm:px-8 py-1.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-pink-400 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
            {language === 'hi' ? 'संगिनी महिला सशक्तिकरण मंच' : 'SANGINI Women Empowerment'}
          </span>
          <span className="hidden md:inline text-slate-500">·</span>
          <span className="hidden md:inline text-slate-400">
            {language === 'hi' ? 'टोल-फ्री हेल्पलाइन: 1800-SANGINI' : 'Toll-Free Helpline: 1800-SANGINI'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-800/80 rounded px-1.5 py-0.5 border border-slate-700">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                language === 'en' ? 'bg-pink-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                language === 'hi' ? 'bg-pink-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Interactive Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 bg-purple-950/80 hover:bg-purple-900 text-purple-200 px-2.5 py-1 rounded border border-purple-800/60 text-xs transition-colors cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-pink-400" />
              <span className="font-medium max-w-[130px] truncate">{currentUser.role}</span>
              <ChevronDown className="w-3 h-3 text-purple-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-1 w-64 bg-white text-slate-900 rounded-xl shadow-xl border border-slate-200 z-50 py-1.5 text-xs animate-in fade-in duration-150">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {language === 'hi' ? 'भूमिका चयन करें (RBAC Simulator)' : 'Simulate User Role (RBAC)'}
                </div>
                <div className="max-h-72 overflow-y-auto py-1">
                  {roleList.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        switchRole(role);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-pink-50 transition-colors cursor-pointer ${
                        currentUser.role === role ? 'bg-pink-50/70 text-pink-700 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span>{role}</span>
                      {currentUser.role === role && (
                        <span className="w-2 h-2 rounded-full bg-pink-600"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <button
            onClick={() => setShowNotifDrawer(!showNotifDrawer)}
            className="relative p-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (1 Primary Action) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single element brand mark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-xl font-bold tracking-tight text-indigo-950 font-brand whitespace-nowrap shrink-0 hover:text-pink-600 transition-colors cursor-pointer"
        >
          SANGINI · संगिनी
        </button>

        {/* Zone 2: 4-5 Concise Single-line Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <button
            onClick={() => handleNavClick('home')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeView === 'home' ? 'text-pink-600 font-bold' : 'hover:text-indigo-950'
            }`}
          >
            {t('navHome')}
          </button>
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeView === 'dashboard' ? 'text-pink-600 font-bold' : 'hover:text-indigo-950'
            }`}
          >
            {t('navDashboard')}
          </button>
          <button
            onClick={() => handleNavClick('members')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeView === 'members' ? 'text-pink-600 font-bold' : 'hover:text-indigo-950'
            }`}
          >
            {t('navMembers')}
          </button>
          <button
            onClick={() => handleNavClick('shg')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeView === 'shg' ? 'text-pink-600 font-bold' : 'hover:text-indigo-950'
            }`}
          >
            {t('navSHG')}
          </button>
          <button
            onClick={() => handleNavClick('savings')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeView === 'savings' ? 'text-pink-600 font-bold' : 'hover:text-indigo-950'
            }`}
          >
            {t('navSavings')}
          </button>
          <button
            onClick={() => handleNavClick('loans')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeView === 'loans' ? 'text-pink-600 font-bold' : 'hover:text-indigo-950'
            }`}
          >
            {t('navLoans')}
          </button>
          <button
            onClick={() => handleNavClick('skills')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeView === 'skills' ? 'text-pink-600 font-bold' : 'hover:text-indigo-950'
            }`}
          >
            {t('navSkills')}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick(currentUser.role === 'Member' ? 'portal' : 'members')}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {currentUser.role === 'Member'
              ? (language === 'hi' ? 'मेरी पासबुक' : 'My Passbook Portal')
              : (language === 'hi' ? '+ नया पंजीकरण' : '+ Register Member')}
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-md cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Sub Navigation Strip for deeper functional modules */}
      <div className="hidden lg:flex items-center gap-5 px-8 py-2 bg-slate-50 border-b border-slate-200 text-xs overflow-x-auto">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
          {language === 'hi' ? 'त्वरित मॉड्यूल:' : 'Modules:'}
        </span>
        <button
          onClick={() => handleNavClick('enterprises')}
          className={`whitespace-nowrap cursor-pointer transition-colors ${
            activeView === 'enterprises' ? 'text-pink-700 font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t('navEnterprises')}
        </button>
        <span className="text-slate-300">·</span>
        <button
          onClick={() => handleNavClick('schemes')}
          className={`whitespace-nowrap cursor-pointer transition-colors ${
            activeView === 'schemes' ? 'text-pink-700 font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t('navSchemes')}
        </button>
        <span className="text-slate-300">·</span>
        <button
          onClick={() => handleNavClick('fieldOfficers')}
          className={`whitespace-nowrap cursor-pointer transition-colors ${
            activeView === 'fieldOfficers' ? 'text-pink-700 font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t('navFieldOfficers')}
        </button>
        <span className="text-slate-300">·</span>
        <button
          onClick={() => handleNavClick('reports')}
          className={`whitespace-nowrap cursor-pointer transition-colors ${
            activeView === 'reports' ? 'text-pink-700 font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t('navReports')}
        </button>
        <span className="text-slate-300">·</span>
        <button
          onClick={() => handleNavClick('portal')}
          className={`whitespace-nowrap cursor-pointer transition-colors ${
            activeView === 'portal' ? 'text-pink-700 font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t('navPortal')}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-2 text-sm">
          {[
            { id: 'home', label: t('navHome') },
            { id: 'dashboard', label: t('navDashboard') },
            { id: 'members', label: t('navMembers') },
            { id: 'shg', label: t('navSHG') },
            { id: 'savings', label: t('navSavings') },
            { id: 'loans', label: t('navLoans') },
            { id: 'skills', label: t('navSkills') },
            { id: 'enterprises', label: t('navEnterprises') },
            { id: 'schemes', label: t('navSchemes') },
            { id: 'fieldOfficers', label: t('navFieldOfficers') },
            { id: 'reports', label: t('navReports') },
            { id: 'portal', label: t('navPortal') },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left py-2 px-3 rounded-lg font-medium cursor-pointer ${
                activeView === item.id
                  ? 'bg-pink-50 text-pink-700 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Notifications Drawer Modal */}
      {showNotifDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-2xs">
          <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-pink-600" />
                <h3 className="font-bold text-sm text-slate-900">
                  {language === 'hi' ? 'सूचनाएं एवं अलर्ट्स' : 'Notifications & Reminders'}
                </h3>
              </div>
              <button
                onClick={() => setShowNotifDrawer(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    n.read
                      ? 'bg-white border-slate-200 text-slate-600'
                      : 'bg-pink-50/70 border-pink-200 text-slate-900 font-medium'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-indigo-950">
                      {language === 'hi' && n.hindiTitle ? n.hindiTitle : n.title}
                    </span>
                    <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-700">
                    {language === 'hi' && n.hindiMessage ? n.hindiMessage : n.message}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                    <span className="font-semibold text-pink-600 uppercase">{n.channel}</span>
                    <span>·</span>
                    <span>{n.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
