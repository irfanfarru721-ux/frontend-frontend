// src/pages/ProductsPage.jsx

import { useEffect, useState, useContext } from "react";
import { getAllProducts } from "../api/api";
import { CartContext } from "../context/CartContext";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: "1rem" }}>Loading...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>All Products</h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {products.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                background: "#fafafa",
              }}
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              )}
              <h3>{p.name}</h3>
              <p>Price: ₹{p.price}</p>
              {p.categoryId && (
                <p>
                  Category: <strong>{p.categoryId.name}</strong>
                </p>
              )}
              {p.vendorId && (
                <p>
                  Vendor: <strong>{p.vendorId.name}</strong>
                </p>
              )}

              <button
                onClick={() => addToCart(p)}
                style={{
                  marginTop: "0.5rem",
                  width: "100%",
                  padding: "0.6rem",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
