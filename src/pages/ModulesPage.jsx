import React, { useEffect, useState } from "react";
import API from "../api/adminApi";

export default function Modules() {
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Load modules on mount
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await API.getModules(); // Make sure this hits "/api/modules"
        setModules(res.data);
      } catch (err) {
        console.log("Error loading modules:", err);
      }
    };
    fetchModules();
  }, []);

  // Fetch vendors when module is selected
  const selectModule = async (module) => {
    setSelectedModule(module);
    setSelectedVendor(null);
    setCategories([]);
    setProducts([]);
    try {
      const res = await API.getVendorsByModule(module._id);
      setVendors(res.data);
    } catch (err) {
      console.log("Error loading vendors:", err);
    }
  };

  // Fetch categories when vendor is selected
  const selectVendor = async (vendor) => {
    setSelectedVendor(vendor);
    setProducts([]);
    try {
      const res = await API.getCategoriesByVendor(vendor._id); // /api/categories/vendor/:vendorId
      setCategories(res.data);
    } catch (err) {
      console.log("Error loading categories:", err);
    }
  };

  // Fetch products when category is selected
  const selectCategory = async (category) => {
    try {
      const res = await API.getProductsByVendor(selectedVendor._id);
      // Filter products by category
      const filtered = res.data.filter((p) => p.categoryId?._id === category._id);
      setProducts(filtered);
    } catch (err) {
      console.log("Error loading products:", err);
    }
  };

  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
      <div>
        <h2>Modules</h2>
        {modules.map((m) => (
          <div
            key={m._id}
            style={{
              padding: 8,
              cursor: "pointer",
              background: selectedModule?._id === m._id ? "#ddd" : "#f5f5f5",
              marginBottom: 4,
            }}
            onClick={() => selectModule(m)}
          >
            {m.name}
          </div>
        ))}
      </div>

      {vendors.length > 0 && (
        <div>
          <h2>Vendors</h2>
          {vendors.map((v) => (
            <div
              key={v._id}
              style={{
                padding: 8,
                cursor: "pointer",
                background: selectedVendor?._id === v._id ? "#ddd" : "#f5f5f5",
                marginBottom: 4,
              }}
              onClick={() => selectVendor(v)}
            >
              {v.name}
            </div>
          ))}
        </div>
      )}

      {categories.length > 0 && (
        <div>
          <h2>Categories</h2>
          {categories.map((c) => (
            <div
              key={c._id}
              style={{ padding: 8, cursor: "pointer", marginBottom: 4 }}
              onClick={() => selectCategory(c)}
            >
              {c.name}
            </div>
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div>
          <h2>Products</h2>
          {products.map((p) => (
            <div key={p._id} style={{ padding: 8, marginBottom: 4 }}>
              <strong>{p.name}</strong> - ₹{p.price}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
