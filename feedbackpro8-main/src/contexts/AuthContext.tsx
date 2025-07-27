
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load user and registered users from localStorage
    const storedUser = localStorage.getItem('user');
    const storedRegisteredUsers = localStorage.getItem('registeredUsers');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedRegisteredUsers) {
      setRegisteredUsers(JSON.parse(storedRegisteredUsers));
    } else {
      // Add default admin user
      const defaultAdmin: User = {
        id: '1',
        email: 'admin@feedback.com',
        name: 'Admin User',
        role: 'admin'
      };
      setRegisteredUsers([defaultAdmin]);
      localStorage.setItem('registeredUsers', JSON.stringify([defaultAdmin]));
    }
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Check if user exists in registered users
    const foundUser = registeredUsers.find(u => u.email === email);
    
    if (!foundUser) {
      return false; // User not registered
    }

    // For demo purposes, accept any password for registered users
    // In real app, you'd verify the actual password
    if (email === 'admin@feedback.com' && password === 'admin123') {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    } else if (foundUser && password.length >= 6) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
    // Check if user already exists
    const existingUser = registeredUsers.find(u => u.email === email);
    if (existingUser) {
      return false; // User already exists
    }

    if (email && password.length >= 6 && name) {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: 'user'
      };
      
      const updatedUsers = [...registeredUsers, newUser];
      setRegisteredUsers(updatedUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      signIn,
      signOut,
      signUp
    }}>
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
