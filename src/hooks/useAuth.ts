import { useState, useEffect } from 'react';

export interface User {
  name: string;
  phone: string;
  language: 'en' | 'ha';
  createdAt: string;
}

const STORAGE_KEYS = {
  legacyUser: 'digilearn_user',
  users: 'digilearn_users',
  activePhone: 'digilearn_active_phone',
} as const;

const normalizePhone = (value: string) => value.replace(/\s+/g, '').trim();

const readUsers = (): User[] => {
  const usersJson = localStorage.getItem(STORAGE_KEYS.users);
  if (!usersJson) {
    return [];
  }

  try {
    const parsed = JSON.parse(usersJson) as User[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeUsers = (users: User[]) => {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const legacyUserJson = localStorage.getItem(STORAGE_KEYS.legacyUser);
    const users = readUsers();

    // One-time migration from the old single-user storage model.
    if (legacyUserJson && users.length === 0) {
      try {
        const legacyUser = JSON.parse(legacyUserJson) as User;
        writeUsers([legacyUser]);
      } catch {
        // Ignore malformed legacy payloads and continue with empty users list.
      }
    }

    const activePhone = localStorage.getItem(STORAGE_KEYS.activePhone);
    if (activePhone) {
      const allUsers = readUsers();
      const activeUser = allUsers.find(
        (savedUser) => normalizePhone(savedUser.phone) === normalizePhone(activePhone)
      );
      if (activeUser) {
        setUser(activeUser);
      }
    }

    setLoading(false);
  }, []);

  const register = (userData: User) => {
    const allUsers = readUsers();
    const normalizedPhone = normalizePhone(userData.phone);
    const nextUsers = allUsers.filter(
      (savedUser) => normalizePhone(savedUser.phone) !== normalizedPhone
    );
    nextUsers.push(userData);
    writeUsers(nextUsers);

    localStorage.setItem(STORAGE_KEYS.activePhone, userData.phone);
    localStorage.setItem(STORAGE_KEYS.legacyUser, JSON.stringify(userData));
    setUser(userData);
  };

  const login = (phone: string) => {
    const allUsers = readUsers();
    const matchedUser = allUsers.find(
      (savedUser) => normalizePhone(savedUser.phone) === normalizePhone(phone)
    );

    if (matchedUser) {
      localStorage.setItem(STORAGE_KEYS.activePhone, matchedUser.phone);
      localStorage.setItem(STORAGE_KEYS.legacyUser, JSON.stringify(matchedUser));
      setUser(matchedUser);
      return matchedUser;
    }

    return null;
  };

  const logout = () => {
    // Keep saved accounts; only clear the active session.
    localStorage.removeItem(STORAGE_KEYS.activePhone);
    setUser(null);
  };

  return { user, loading, register, login, logout, isAuthenticated: !!user };
};
