import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVendorProductsGrouped } from "../api/api";

export default function VendorProductsPage() {
  const { vendorId } = useParams();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    if (!vendorId) return;
    setLoading(true);
    getVendorProductsGrouped(vendorId)
      .then((data) => {
        setGroups(data || []);
        const initExpanded = {};
        (data || []).forEach((g) => (initExpanded[g.category._id] = true));
        setExpanded(initExpanded);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [vendorId]);

  const toggleCategory = (catId) => {
    setExpanded((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (groups.length === 0) return <p>No products for this vendor.</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Vendor Products</h2>
      {groups.map((group) => (
        <section key={group.category._id} style={{ marginBottom: 24 }}>
          <h3
            onClick={() => toggleCategory(group.category._id)}
            style={{
              cursor: "pointer",
              background: "#f0f0f0",
              padding: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{group.category.name}</span>
            <span>
              {group.products.length} item{group.products.length > 1 ? "s" : ""}{" "}
              {expanded[group.category._id] ? "▼" : "▶"}
            </span>
          </h3>
          {expanded[group.category._id] && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 12,
                marginTop: 8,
              }}
            >
              {group.products.map((product) => (
                <div
                  key={product._id}
                  style={{ border: "1px solid #ddd", padding: 12, borderRadius: 4 }}
                >
                  <h4>{product.name}</h4>
                  <p>Price: ₹{product.price}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
