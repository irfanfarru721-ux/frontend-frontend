// src/pages/VendorProductsPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVendorProductsGrouped } from "../api/api";

export default function VendorProductsPage(){
  const { vendorId } = useParams();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    if(!vendorId) return;
    setLoading(true);
    getVendorProductsGrouped(vendorId)
      .then(res => { setGroups(res.data || []); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, [vendorId]);

  if(loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Vendor Products</h2>
      {groups.length === 0 ? <p>No products for this vendor</p> : (
        groups.map(g => (
          <section key={g.category._id} style={{ marginBottom: 20 }}>
            <h3>{g.category.name}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
              {g.products.map(p => (
                <div key={p._id} style={{ border: "1px solid #ddd", padding: 12 }}>
                  <h4>{p.name}</h4>
                  <p>Price: ₹{p.price}</p>
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
