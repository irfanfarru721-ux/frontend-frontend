import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/api.js";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = async (email, password) => {
    try {
      const res = await loginUser({ email, password });
      if (res.data && res.data.token && res.data.user) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        return { success: true };
      }
      return { success: false, error: res?.data?.message || "Login failed" };
    } catch (e) {
      return { success: false, error: e.response?.data?.message || e.message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await registerUser({ name, email, password });
      // your backend returns user object; no token — require login
      if (res.data && res.data.user) return { success: true };
      return { success: false, error: res?.data?.message || "Registration failed" };
    } catch (e) {
      return { success: false, error: e.response?.data?.message || e.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
};
