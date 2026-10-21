import React, { createContext, useContext, useState, useEffect } from 'react';
import { staffAuthService } from '../services/staffAuth';
import type { UserProfile } from '../services/staffAuth';

interface AuthContextType {
  currentUser: UserProfile | null;
  loginWithDiscord: (returnPath?: string) => void;
  loginWithId: (discordId: string, customUsername?: string) => void;
  logout: () => void;
  isVerifying: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // Check for Discord OAuth2 access_token in URL hash
    const token = staffAuthService.parseOAuthToken();
    if (token) {
      setIsVerifying(true);
      window.history.replaceState(null, '', window.location.pathname);

      staffAuthService
        .fetchDiscordProfile(token)
        .then((profile) => {
          const res = staffAuthService.loginWithDiscordProfile(profile);
          if (res.success) {
            setCurrentUser(res.user);
          }
        })
        .catch((err) => {
          console.error('Discord OAuth error:', err);
        })
        .finally(() => {
          setIsVerifying(false);
        });
      return;
    }

    // Load active session from localStorage
    const saved = staffAuthService.getCurrentUser();
    if (saved) {
      setCurrentUser(saved);
    }
  }, []);

  const loginWithDiscord = (returnPath?: string) => {
    window.location.href = staffAuthService.getDiscordOAuthUrl(returnPath || window.location.pathname);
  };

  const loginWithId = (discordId: string, customUsername?: string) => {
    const res = staffAuthService.loginWithDiscordId(discordId, customUsername);
    if (res.success) {
      setCurrentUser(res.user);
    }
  };

  const logout = () => {
    staffAuthService.logout();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginWithDiscord,
        loginWithId,
        logout,
        isVerifying,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
