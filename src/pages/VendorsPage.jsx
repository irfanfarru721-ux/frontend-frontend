import React, { useEffect, useState } from "react";
import { getVendorsByModule } from "../api/api";
import { useParams, Link } from "react-router-dom";

export default function VendorsPage() {
  const { moduleId } = useParams();
  const [vendors, setVendors] = useState([]);
  useEffect(() => {
    if (!moduleId) return;
    getVendorsByModule(moduleId).then((r)=>setVendors(r.data || []));
  }, [moduleId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Vendors</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
        {vendors.map(v => (
          <Link key={v._id} to={`/products/${v._id}`} style={{ border:'1px solid #ddd', padding:12, borderRadius:8, textDecoration:'none', color:'#111' }}>
            <div style={{fontWeight:700}}>{v.name}</div>
            <div style={{fontSize:12, color:'#666'}}>Shop</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
