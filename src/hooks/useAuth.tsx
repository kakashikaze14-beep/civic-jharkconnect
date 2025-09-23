import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CitizenUser {
  id: string;
  name: string;
  phone: string;
  role: 'citizen';
}

interface AdminUser {
  id: string;
  user_id: string;
  role: 'admin';
}

interface MunicipalityUser {
  id: string;
  user_id: string;
  municipality: string;
  role: 'municipality';
}

type User = CitizenUser | AdminUser | MunicipalityUser | null;

interface AuthContextType {
  user: User;
  loading: boolean;
  loginCitizen: (name: string, phone: string) => Promise<{ success: boolean; error?: string }>;
  loginAdmin: (userId: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signupAdmin: (userId: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginMunicipality: (userId: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signupMunicipality: (userId: string, password: string, municipality: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing sessions
    const citizenSession = localStorage.getItem('citizen_session');
    const adminSession = localStorage.getItem('admin_session');
    const municipalitySession = localStorage.getItem('municipality_session');

    if (citizenSession) {
      setUser(JSON.parse(citizenSession));
    } else if (adminSession) {
      setUser(JSON.parse(adminSession));
    } else if (municipalitySession) {
      setUser(JSON.parse(municipalitySession));
    }

    setLoading(false);
  }, []);

  const loginCitizen = async (name: string, phone: string) => {
    try {
      const { data, error } = await supabase
        .from('citizens')
        .select('*')
        .eq('name', name)
        .eq('phone', phone)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        return { success: false, error: 'Invalid Name or Phone' };
      }

      const citizenUser: CitizenUser = {
        id: data.id,
        name: data.name,
        phone: data.phone,
        role: 'citizen'
      };

      localStorage.setItem('citizen_session', JSON.stringify(citizenUser));
      setUser(citizenUser);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const loginAdmin = async (userId: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('user_id', userId)
        .eq('password_hash', password)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        return { success: false, error: 'Invalid User ID or Password' };
      }

      const adminUser: AdminUser = {
        id: data.id,
        user_id: data.user_id,
        role: 'admin'
      };

      localStorage.setItem('admin_session', JSON.stringify(adminUser));
      setUser(adminUser);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signupAdmin = async (userId: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from('admins')
        .insert({ user_id: userId, password_hash: password })
        .select()
        .single();

      if (error) throw error;

      const adminUser: AdminUser = {
        id: data.id,
        user_id: data.user_id,
        role: 'admin'
      };

      localStorage.setItem('admin_session', JSON.stringify(adminUser));
      setUser(adminUser);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const loginMunicipality = async (userId: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from('municipality_users')
        .select('*')
        .eq('user_id', userId)
        .eq('password_hash', password)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        return { success: false, error: 'Invalid User ID or Password' };
      }

      const municipalityUser: MunicipalityUser = {
        id: data.id,
        user_id: data.user_id,
        municipality: data.municipality,
        role: 'municipality'
      };

      localStorage.setItem('municipality_session', JSON.stringify(municipalityUser));
      setUser(municipalityUser);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signupMunicipality = async (userId: string, password: string, municipality: string) => {
    try {
      const { data, error } = await supabase
        .from('municipality_users')
        .insert({ user_id: userId, password_hash: password, municipality })
        .select()
        .single();

      if (error) throw error;

      const municipalityUser: MunicipalityUser = {
        id: data.id,
        user_id: data.user_id,
        municipality: data.municipality,
        role: 'municipality'
      };

      localStorage.setItem('municipality_session', JSON.stringify(municipalityUser));
      setUser(municipalityUser);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signOut = () => {
    localStorage.removeItem('citizen_session');
    localStorage.removeItem('admin_session');
    localStorage.removeItem('municipality_session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      loginCitizen,
      loginAdmin,
      signupAdmin,
      loginMunicipality,
      signupMunicipality,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};