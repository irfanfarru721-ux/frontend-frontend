import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CategoryProductsPage() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!categoryId) return;
    axios.get(`/api/products/category/${categoryId}`)
         .then(r => setProducts(r.data || []));
  }, [categoryId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Products by Category</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))',
        gap: 12
      }}>
        {products.map(p => (
          <div key={p._id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 6 }}>
            <h4>{p.name}</h4>
            <p>₹ {p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
