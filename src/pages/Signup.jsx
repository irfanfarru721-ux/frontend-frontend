import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup(){
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await signup(name, email, password);
    if (res.success) {
      alert("Registered — please login");
      navigate("/login");
    } else alert(res.error);
  };

  return (
    <div style={{padding:20, maxWidth:480}}>
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} style={{display:'block', width:'100%', padding:8, marginBottom:8}}/>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{display:'block', width:'100%', padding:8, marginBottom:8}}/>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{display:'block', width:'100%', padding:8, marginBottom:8}}/>
        <button type="submit" style={{padding:'8px 12px', background:'#0369a1', color:'#fff'}}>Signup</button>
      </form>
    </div>
  );
}
