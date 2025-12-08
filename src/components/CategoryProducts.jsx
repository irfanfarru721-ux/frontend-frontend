// src/components/CategoryProducts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryProducts = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://completed-backend.onrender.com/api/products/category/${categoryId}`
        );
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    if (categoryId) fetchProducts();
  }, [categoryId]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0) return <p>No products found in this category.</p>;

  return (
    <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
      {products.map((product) => (
        <div key={product._id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
          <h3>{product.name}</h3>
          <p>Price: ₹{product.price}</p>
          <p>Vendor: {product.vendorId.name}</p>
          {product.image && <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: "5px" }} />}
        </div>
      ))}
    </div>
  );
};

export default CategoryProducts;
