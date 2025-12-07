import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../api"; // your axios file

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const { data } = await loginUser({ email, password });  // <-- FIXED

      localStorage.setItem("token", data.token);
      setUser(data.user);

      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Login failed" };
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await registerUser({ name, email, password });

      localStorage.setItem("token", data.token);
      setUser(data.user);

      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Register failed" };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
