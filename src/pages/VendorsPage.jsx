// src/pages/VendorProductsPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVendorProductsGrouped } from "../api/api";

export default function VendorProductsPage() {
  const { vendorId } = useParams();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    if (!vendorId) return;
    setLoading(true);
    getVendorProductsGrouped(vendorId)
      .then((data) => {
        setGroups(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to fetch products");
        setLoading(false);
      });
  }, [vendorId]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Vendor Products</h2>
      {groups.length === 0 ? (
        <p>No products for this vendor.</p>
      ) : (
        groups.map((g) => (
          <section key={g.category._id} style={{ marginBottom: 20 }}>
            <h3
              onClick={() => toggleCategory(g.category._id)}
              style={{
                cursor: "pointer",
                background: "#f0f0f0",
                padding: "8px 12px",
                borderRadius: 4,
              }}
            >
              {g.category.name} {expandedCategories[g.category._id] ? "▼" : "▶"}
            </h3>
            {expandedCategories[g.category._id] && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: 12,
                  marginTop: 8,
                }}
              >
                {g.products.map((p) => (
                  <div
                    key={p._id}
                    style={{
                      border: "1px solid #ddd",
                      padding: 12,
                      borderRadius: 4,
                      transition: "transform 0.2s",
                    }}
                  >
                    <h4>{p.name}</h4>
                    <p>Price: ₹{p.price}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))
      )}
    </div>
  );
}
