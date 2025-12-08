import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../api/api.js";

export default function CategoryProductsPage() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!categoryId) return;

    getProductsByCategory(categoryId)
      .then((res) => {
        console.log("Category Products:", res.data); // debug
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, [categoryId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Category Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
            gap: 12,
          }}
        >
          {products.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ddd",
                padding: 12,
                borderRadius: 8,
              }}
            >
              <div style={{ fontWeight: 700 }}>{p.name}</div>
              <div>Category: {p.categoryId.name}</div>
              <div>Vendor: {p.vendorId.name}</div>
              <div>Price: ₹ {p.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
