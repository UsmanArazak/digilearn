import { useState, useEffect } from 'react';

export interface User {
  name: string;
  phone: string;
  language: 'en' | 'ha';
  createdAt: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('digilearn_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const register = (userData: User) => {
    localStorage.setItem('digilearn_user', JSON.stringify(userData));
    setUser(userData);
  };

  const login = (phone: string) => {
    const savedUser = localStorage.getItem('digilearn_user');
    if (savedUser) {
      const parsedUser: User = JSON.parse(savedUser);
      if (parsedUser.phone === phone) {
        setUser(parsedUser);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('digilearn_user');
    setUser(null);
  };

  return { user, loading, register, login, logout, isAuthenticated: !!user };
};
