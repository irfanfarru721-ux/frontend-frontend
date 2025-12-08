// src/pages/VendorsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getVendorsByModule } from "../api/api";

const VendorsPage = () => {
  const { moduleId } = useParams(); // moduleId from route
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!moduleId) return;

    setLoading(true);
    setError("");

    getVendorsByModule(moduleId)
      .then((res) => {
        setVendors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load vendors.");
        setLoading(false);
      });
  }, [moduleId]);

  if (loading) return <p>Loading vendors...</p>;
  if (error) return <p>{error}</p>;
  if (vendors.length === 0) return <p>No vendors found for this module.</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Vendors</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {vendors.map((vendor) => (
          <div
            key={vendor._id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <h3>{vendor.name}</h3>
            <p>{vendor.description || "No description"}</p>
            <Link
              to={`/products/${vendor._id}`}
              style={{
                display: "inline-block",
                marginTop: "0.5rem",
                padding: "0.5rem 1rem",
                background: "#007bff",
                color: "#fff",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              View Products
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorsPage;
