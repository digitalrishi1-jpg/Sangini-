import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { PrivacyConsentBanner } from './components/compliance/PrivacyConsentBanner';

import { LandingPage } from './components/public/LandingPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MemberList } from './components/members/MemberList';
import { ShgManagement } from './components/shg/ShgManagement';
import { SavingsManagement } from './components/savings/SavingsManagement';
import { LoanManagement } from './components/loans/LoanManagement';
import { SkillTrainingManagement } from './components/skills/SkillTrainingManagement';
import { EntrepreneurshipManagement } from './components/entrepreneurs/EntrepreneurshipManagement';
import { GovernmentSchemesManagement } from './components/schemes/GovernmentSchemesManagement';
import { FieldOfficerManagement } from './components/field/FieldOfficerManagement';
import { ReportsAnalytics } from './components/reports/ReportsAnalytics';
import { MemberPortal } from './components/portal/MemberPortal';

const MainContent: React.FC = () => {
  const { activeView } = useAuth();

  return (
    <main className="min-h-[calc(100vh-140px)]">
      {activeView === 'home' && <LandingPage />}
      {activeView === 'dashboard' && <AdminDashboard />}
      {activeView === 'members' && <MemberList />}
      {activeView === 'shg' && <ShgManagement />}
      {activeView === 'savings' && <SavingsManagement />}
      {activeView === 'loans' && <LoanManagement />}
      {activeView === 'skills' && <SkillTrainingManagement />}
      {activeView === 'enterprises' && <EntrepreneurshipManagement />}
      {activeView === 'schemes' && <GovernmentSchemesManagement />}
      {activeView === 'fieldOfficers' && <FieldOfficerManagement />}
      {activeView === 'reports' && <ReportsAnalytics />}
      {activeView === 'portal' && <MemberPortal />}
    </main>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <DataProvider>
          <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
            <Navbar />
            <div className="flex-1">
              <MainContent />
            </div>
            <Footer />
            <PrivacyConsentBanner />
          </div>
        </DataProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
