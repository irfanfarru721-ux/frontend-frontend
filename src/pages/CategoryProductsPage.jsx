// src/pages/CategoryProductsPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../api/api";

export default function CategoryProductsPage() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;
    setLoading(true);
    getProductsByCategory(categoryId)
      .then(res => { setProducts(res.data || []); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, [categoryId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Category Products</h2>
      {products.length === 0 ? <p>No products</p> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
          {products.map(p => (
            <div key={p._id} style={{ border: "1px solid #ddd", padding: 12 }}>
              <h4>{p.name}</h4>
              <p>Vendor: {p.vendorId?.name}</p>
              <p>Price: ₹{p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
