import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) navigate("/");
    else alert(res.error);
  };

  return (
    <div style={{padding:20, maxWidth:480}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{display:'block', width:'100%', padding:8, marginBottom:8}}/>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{display:'block', width:'100%', padding:8, marginBottom:8}}/>
        <button type="submit" style={{padding:'8px 12px', background:'#0369a1', color:'#fff'}}>Login</button>
      </form>
    </div>
  );
}
