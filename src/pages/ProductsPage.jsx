import React, { useEffect, useState, useContext } from "react";
import { getProductsByVendor } from "../api/api";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductsPage() {
  const { vendorId } = useParams();
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (!vendorId) return;
    getProductsByVendor(vendorId).then((r)=>setProducts(r.data || []));
  }, [vendorId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
        {products.map(p => (
          <div key={p._id} style={{ border:'1px solid #ddd', padding:12, borderRadius:8 }}>
            <div style={{fontWeight:700}}>{p.name}</div>
            <div>₹ {p.price}</div>
            <button onClick={()=>addToCart(p)} style={{marginTop:8, padding:'8px 10px', background:'#0369a1', color:'white', border:'none', borderRadius:6}}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
