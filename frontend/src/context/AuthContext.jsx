import { createContext, useContext, useEffect, useState } from "react";
import {
  login as loginApi,
  logout as logoutApi,
  getCurrentUser,
} from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check login when app starts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login
  const login = async (credentials) => {
    const data = await loginApi(credentials);
    setUser(data.user);
    return data;
  };

  // Logout
  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);