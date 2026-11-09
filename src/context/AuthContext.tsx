import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../types';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  mobile: string;
  assignedState?: string;
  assignedDistrict?: string;
  assignedBlock?: string;
  assignedPanchayat?: string;
  assignedShgId?: string;
  assignedMemberId?: string;
}

export const PRESET_USERS: Record<UserRole, UserProfile> = {
  'Super Admin': {
    id: 'user-admin-01',
    name: 'Dr. Radhika Sharma (HQ Director)',
    role: 'Super Admin',
    mobile: '9811002233',
  },
  'State Admin': {
    id: 'user-state-01',
    name: 'Rajeev Singhania (MP State Mission)',
    role: 'State Admin',
    assignedState: 'Madhya Pradesh',
    mobile: '9826001122',
  },
  'District Manager': {
    id: 'user-dist-01',
    name: 'Kavita Saxena (District Mission Lead)',
    role: 'District Manager',
    assignedState: 'Madhya Pradesh',
    assignedDistrict: 'Sehore',
    mobile: '9826112233',
  },
  'Block Manager': {
    id: 'user-blk-01',
    name: 'Dileep Rathore (Block Coordinator)',
    role: 'Block Manager',
    assignedState: 'Madhya Pradesh',
    assignedDistrict: 'Sehore',
    assignedBlock: 'Ichhawar',
    mobile: '9826223344',
  },
  'Panchayat Coordinator': {
    id: 'user-panch-01',
    name: 'Santosh Malviya',
    role: 'Panchayat Coordinator',
    assignedState: 'Madhya Pradesh',
    assignedDistrict: 'Sehore',
    assignedBlock: 'Ichhawar',
    assignedPanchayat: 'Amlaha Gram',
    mobile: '9826334455',
  },
  'Field Officer': {
    id: 'fo-001',
    name: 'Pooja Verma (Field Officer)',
    role: 'Field Officer',
    assignedState: 'Madhya Pradesh',
    assignedDistrict: 'Sehore',
    assignedBlock: 'Ichhawar',
    mobile: '9826198421',
  },
  'SHG President': {
    id: 'mem-001',
    name: 'Sunita Devi (President - Kiran SHG)',
    role: 'SHG President',
    assignedShgId: 'SHG-MP-001',
    assignedMemberId: 'SNG-2026-0041',
    mobile: '9826145290',
  },
  'SHG Secretary': {
    id: 'mem-002',
    name: 'Meena Bai Parmar (Secretary - Kiran SHG)',
    role: 'SHG Secretary',
    assignedShgId: 'SHG-MP-001',
    assignedMemberId: 'SNG-2026-0042',
    mobile: '9827301145',
  },
  'SHG Treasurer': {
    id: 'mem-003',
    name: 'Rekha Ahirwar (Treasurer - Kiran SHG)',
    role: 'SHG Treasurer',
    assignedShgId: 'SHG-MP-001',
    assignedMemberId: 'SNG-2026-0043',
    mobile: '9179234812',
  },
  Member: {
    id: 'mem-002',
    name: 'Meena Bai Parmar (Artisan & SHG Member)',
    role: 'Member',
    assignedMemberId: 'SNG-2026-0042',
    assignedShgId: 'SHG-MP-001',
    mobile: '9827301145',
  },
};

interface AuthContextType {
  currentUser: UserProfile;
  switchRole: (role: UserRole) => void;
  isSuperAdmin: boolean;
  isFieldWorker: boolean;
  isMemberOnly: boolean;
  canApproveLoans: boolean;
  activeView: string;
  setActiveView: (view: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: PRESET_USERS['Super Admin'],
  switchRole: () => {},
  isSuperAdmin: true,
  isFieldWorker: false,
  isMemberOnly: false,
  canApproveLoans: true,
  activeView: 'home',
  setActiveView: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const savedRole = localStorage.getItem('sangini_current_role') as UserRole;
    return savedRole && PRESET_USERS[savedRole] ? PRESET_USERS[savedRole] : PRESET_USERS['Super Admin'];
  });

  const [activeView, setActiveView] = useState<string>('home');

  const switchRole = (role: UserRole) => {
    const user = PRESET_USERS[role];
    setCurrentUser(user);
    localStorage.setItem('sangini_current_role', role);
    if (role === 'Member') {
      setActiveView('portal');
    } else if (activeView === 'portal') {
      setActiveView('dashboard');
    }
  };

  const isSuperAdmin = currentUser.role === 'Super Admin';
  const isFieldWorker = currentUser.role === 'Field Officer' || currentUser.role === 'Panchayat Coordinator';
  const isMemberOnly = currentUser.role === 'Member';
  const canApproveLoans =
    currentUser.role === 'Super Admin' ||
    currentUser.role === 'State Admin' ||
    currentUser.role === 'District Manager' ||
    currentUser.role === 'Block Manager' ||
    currentUser.role === 'Field Officer';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        switchRole,
        isSuperAdmin,
        isFieldWorker,
        isMemberOnly,
        canApproveLoans,
        activeView,
        setActiveView,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
