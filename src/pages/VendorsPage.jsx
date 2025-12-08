import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VendorProductsPage() {
  const { vendorId } = useParams();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getVendorProductsGrouped = async (vendorId) => {
    const res = await fetch(`/api/products/vendor-grouped/${vendorId}`);
    if (!res.ok) throw new Error("Failed to fetch vendor products");
    return res.json();
  };

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
        setError(err.message);
        setLoading(false);
      });
  }, [vendorId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (groups.length === 0) return <p>No products for this vendor.</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Vendor Products</h2>
      {groups.map((group) => (
        <section key={group.category._id} style={{ marginBottom: 24 }}>
          <h3 style={{ background: "#f0f0f0", padding: 8 }}>{group.category.name}</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 12,
              marginTop: 8,
            }}
          >
            {group.products.map((product) => (
              <div key={product._id} style={{ border: "1px solid #ddd", padding: 12 }}>
                <h4>{product.name}</h4>
                <p>Price: ₹{product.price}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
