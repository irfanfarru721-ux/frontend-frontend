import React, { useEffect, useState } from "react";
import { getModules } from "../api/api";
import { Link } from "react-router-dom";

export default function ModulesPage() {
  const [modules, setModules] = useState([]);
  useEffect(() => { getModules().then((r)=>setModules(r.data || [])); }, []);
  return (
    <div style={{padding:20}}>
      <h2>Modules</h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:12}}>
        {modules.map(m => (
          <Link key={m._id} to={`/vendors/${m._id}`} style={{ padding:12, border:'1px solid #ddd', borderRadius:8, textDecoration:'none', color:'#111' }}>
            {m.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
