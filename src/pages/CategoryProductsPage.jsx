// src/pages/CategoryProductsPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByVendorAndCategory } from "../api/api";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const CategoryProductsPage = () => {
  const { vendorId, categoryId } = useParams(); // expecting both vendorId and categoryId in URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (!vendorId || !categoryId) return;

    setLoading(true);
    setError("");

    getProductsByVendorAndCategory(vendorId, categoryId)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, [vendorId, categoryId]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Products</h1>

      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {products.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <h3>{p.name}</h3>
              <p>Price: ₹{p.price}</p>
              <p>Vendor: {p.vendorId.name}</p>
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: "100%", borderRadius: "5px" }}
                />
              )}
              <button
                onClick={() => addToCart(p)}
                style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#007bff",
                  color: "#fff",
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
};

export default CategoryProductsPage;
