import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "null"));
    const c = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(c.reduce((s, it) => s + (it.qty || 1), 0));
    const onStorage = () => {
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
      const cc = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cc.reduce((s, it) => s + (it.qty || 1), 0));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setUser(null);
  };

  return (
    <nav style={{ padding: 12, background: "#0369a1", color: "white", display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", gap: 12 }}>
        <Link to="/" style={{ color: "white", fontWeight: "700", textDecoration: "none" }}>Multivendor</Link>
        <Link to="/modules" style={{ color: "white", textDecoration: "none" }}>Modules</Link>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
          Cart {cartCount > 0 && <span style={{ background: "red", padding: "2px 6px", borderRadius: 12, marginLeft: 6 }}>{cartCount}</span>}
        </Link>

        {user ? (
          <>
            <span>Hi, {user.name || user.email}</span>
            <button onClick={logout} style={{ background: "red", color: "white", border: "none", padding: "6px 10px", borderRadius: 6 }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
            <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
