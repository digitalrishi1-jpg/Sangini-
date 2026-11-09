import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Brand & Top Navigation
    appName: 'SANGINI',
    tagline: 'Empowering Women. Transforming Communities.',
    navHome: 'Home',
    navDashboard: 'Admin Dashboard',
    navMembers: 'Member Registration',
    navSHG: 'SHG Management',
    navSavings: 'Savings Ledger',
    navLoans: 'Loans & Microfinance',
    navSkills: 'Skill Development',
    navEnterprises: 'Enterprises & Livelihood',
    navSchemes: 'Govt Schemes',
    navFieldOfficers: 'Field Staff',
    navReports: 'Reports & Analytics',
    navPortal: 'Member Portal',
    
    // Actions & Buttons
    btnRegisterMember: 'Register New Member',
    btnCreateSHG: 'Create New SHG',
    btnDepositSavings: 'Record Savings Deposit',
    btnApplyLoan: 'Apply for Loan',
    btnCalculateEMI: 'EMI Calculator',
    btnDownloadCard: 'Download Digital ID',
    btnPrintReceipt: 'Print Official Receipt',
    btnIssueCertificate: 'Issue Skill Certificate',
    btnExportCSV: 'Export to CSV',
    btnPrintReport: 'Print Report',
    btnResolve: 'Mark Resolved',
    btnFilter: 'Apply Filter',
    btnReset: 'Reset',
    btnSubmit: 'Submit Application',
    btnSearch: 'Search...',
    btnSwitchRole: 'Switch Role',
    btnLoginMember: 'Member OTP Login',

    // Key Performance Indicators (Admin Dashboard)
    kpiRegisteredWomen: 'Total Registered Women',
    kpiActiveMembers: 'Total Active Members',
    kpiTotalSHGs: 'Self Help Groups (SHGs)',
    kpiVillagesCovered: 'Villages Covered',
    kpiPanchayatsCovered: 'Panchayats Covered',
    kpiBlocksCovered: 'Blocks Covered',
    kpiDistrictsCovered: 'Districts Covered',
    kpiStatesCovered: 'States Covered',
    kpiTotalSavings: 'Total Group Savings',
    kpiLoansDisbursed: 'Total Loans Disbursed',
    kpiOutstandingLoans: 'Outstanding Balance',
    kpiLoansRepaid: 'Total Loans Repaid',
    kpiRecoveryRate: 'Repayment Recovery Rate',
    kpiWomenTrained: 'Women Trained',
    kpiWomenEmployed: 'Women Employed / Placed',
    kpiActiveEnterprises: 'Active Enterprises',

    // Statuses
    statusActive: 'Active',
    statusInactive: 'Inactive',
    statusSuspended: 'Suspended',
    statusSubmitted: 'Submitted',
    statusFieldVerified: 'Field Verified',
    statusBlockApproved: 'Block Approved',
    statusDisbursed: 'Disbursed',
    statusInRepayment: 'In Repayment',
    statusCompleted: 'Completed',
    statusRejected: 'Rejected',

    // Sections
    secHeroTitle: 'Empowering Rural Women Through Digital Financial Inclusion',
    secHeroSub: 'SANGINI is India’s modern technology-driven ecosystem for Self Help Groups, microfinance, skill vocational training, and women-led rural micro-enterprises.',
    secAboutTitle: 'About SANGINI Organization',
    secMission: 'Our Mission & Vision',
    secPrograms: 'Comprehensive Women Empowerment Programs',
    secImpact: 'Grassroots Impact Dashboard',
    secSuccessStories: 'Inspiring Stories of Change',
    secCompliance: 'Data Security & Compliance (DPDPA 2023)',
  },
  hi: {
    // Brand & Top Navigation
    appName: 'संगिनी (SANGINI)',
    tagline: 'सशक्त नारी, समृद्ध समाज',
    navHome: 'मुख्य पृष्ठ',
    navDashboard: 'केंद्रीय डैशबोर्ड',
    navMembers: 'महिला पंजीकरण',
    navSHG: 'स्वयं सहायता समूह (SHG)',
    navSavings: 'बचत खाता (लेजर)',
    navLoans: 'ऋण एवं माइक्रोफाइनेंस',
    navSkills: 'कौशल विकास एवं प्रशिक्षण',
    navEnterprises: 'महिला उद्यम एवं आजीविका',
    navSchemes: 'सरकारी योजनाएं',
    navFieldOfficers: 'फील्ड अधिकारी प्रबंधन',
    navReports: 'रिपोर्ट एवं विश्लेषण',
    navPortal: 'सदस्य पोर्टल (पासबुक)',

    // Actions & Buttons
    btnRegisterMember: 'नई सदस्या पंजीकृत करें',
    btnCreateSHG: 'नया समूह (SHG) बनाएं',
    btnDepositSavings: 'बचत जमा दर्ज करें',
    btnApplyLoan: 'ऋण हेतु आवेदन करें',
    btnCalculateEMI: 'ईएमआई (EMI) कैलकुलेटर',
    btnDownloadCard: 'डिजिटल पहचान पत्र डाउनलोड करें',
    btnPrintReceipt: 'रसीद प्रिंट करें',
    btnIssueCertificate: 'कौशल प्रमाण पत्र जारी करें',
    btnExportCSV: 'CSV डाउनलोड करें',
    btnPrintReport: 'रिपोर्ट प्रिंट करें',
    btnResolve: 'समाधान दर्ज करें',
    btnFilter: 'फ़िल्टर लागू करें',
    btnReset: 'रीसेट',
    btnSubmit: 'आवेदन जमा करें',
    btnSearch: 'खोजें...',
    btnSwitchRole: 'भूमिका बदलें',
    btnLoginMember: 'सदस्य ओटीपी लॉगिन',

    // Key Performance Indicators (Admin Dashboard)
    kpiRegisteredWomen: 'कुल पंजीकृत महिलाएं',
    kpiActiveMembers: 'कुल सक्रिय सदस्याएं',
    kpiTotalSHGs: 'कुल स्वयं सहायता समूह',
    kpiVillagesCovered: 'आच्छादित गांव',
    kpiPanchayatsCovered: 'आच्छादित ग्राम पंचायतें',
    kpiBlocksCovered: 'आच्छादित विकासखंड (ब्लॉक)',
    kpiDistrictsCovered: 'आच्छादित जिले',
    kpiStatesCovered: 'आच्छादित राज्य',
    kpiTotalSavings: 'कुल संचित समूह बचत',
    kpiLoansDisbursed: 'कुल वितरित ऋण',
    kpiOutstandingLoans: 'बकाया ऋण राशि',
    kpiLoansRepaid: 'कुल चुकाया गया ऋण',
    kpiRecoveryRate: 'ऋण वसूली दर',
    kpiWomenTrained: 'प्रशिक्षित महिलाएं',
    kpiWomenEmployed: 'रोज़गार/स्थानन प्राप्त महिलाएं',
    kpiActiveEnterprises: 'सक्रिय महिला उद्यम',

    // Statuses
    statusActive: 'सक्रिय',
    statusInactive: 'निष्क्रिय',
    statusSuspended: 'निलंबित',
    statusSubmitted: 'आवेदन प्राप्त',
    statusFieldVerified: 'फील्ड अधिकारी द्वारा सत्यापित',
    statusBlockApproved: 'ब्लॉक द्वारा स्वीकृत',
    statusDisbursed: 'ऋण राशि वितरित',
    statusInRepayment: 'किश्त भुगतान चालू',
    statusCompleted: 'पूर्ण / चुकता',
    statusRejected: 'अस्वीकृत',

    // Sections
    secHeroTitle: 'डिजिटल वित्तीय समावेशन से ग्रामीण नारी का स्वावलंबन',
    secHeroSub: 'संगिनी (SANGINI) भारत का अग्रणी डिजिटल मंच है जो स्वयं सहायता समूहों (SHG), पारदर्शी बचत, आसान माइक्रोलोन, कौशल विकास और महिला उद्यमिता को सशक्त बनाता है।',
    secAboutTitle: 'संगिनी संस्था के बारे में',
    secMission: 'हमारा उद्देश्य और दूरदृष्टि (Mission & Vision)',
    secPrograms: 'महिला सशक्तिकरण के प्रमुख कार्यक्रम',
    secImpact: 'जमीनी प्रभाव एवं उपलब्धियां (Impact)',
    secSuccessStories: 'सफलता और स्वावलंबन की प्रेरक कहानियां',
    secCompliance: 'डेटा सुरक्षा एवं भारतीय डिजिटल अधिनियम (DPDPA 2023) अनुपालन',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('sangini_lang') as Language;
    return saved === 'hi' || saved === 'en' ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('sangini_lang', lang);
  };

  const t = (key: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
