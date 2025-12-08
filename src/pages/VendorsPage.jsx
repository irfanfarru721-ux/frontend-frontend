import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getVendorsByModule } from "../api/api";

export default function VendorsPage() {
  const { moduleId } = useParams();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!moduleId) return;

    setLoading(true);
    getVendorsByModule(moduleId)
      .then((data) => {
        setVendors(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [moduleId]);

  if (loading) return <p>Loading vendors...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (vendors.length === 0) return <p>No vendors found for this module.</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Vendors for Module {moduleId}</h2>
      <ul>
        {vendors.map((vendor) => (
          <li key={vendor._id} style={{ marginBottom: 12 }}>
            <Link to={`/vendor/${vendor._id}`}>{vendor.name}</Link>
            <p>{vendor.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
