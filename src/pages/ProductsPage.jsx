// src/pages/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProductsByVendor,
  getCategoriesByVendor,
  getProductsByVendorAndCategory,
} from "../api/api";

const ProductsPage = () => {
  const { vendorId } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!vendorId) return;

    setLoading(true);
    setError("");

    // Fetch categories for this vendor
    getCategoriesByVendor(vendorId)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));

    // Fetch products (all or by category)
    const fetchProducts = selectedCategory
      ? getProductsByVendorAndCategory(vendorId, selectedCategory)
      : getProductsByVendor(vendorId);

    fetchProducts
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, [vendorId, selectedCategory]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Products</h1>

      {/* Category Filter Buttons */}
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setSelectedCategory("")}
          style={{
            marginRight: "0.5rem",
            padding: "0.5rem 1rem",
            background: !selectedCategory ? "#007bff" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat._id)}
            style={{
              marginRight: "0.5rem",
              padding: "0.5rem 1rem",
              background: selectedCategory === cat._id ? "#007bff" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <p>No products found.</p>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
