import React, { useEffect, useState } from "react";

// Component to display each product
const ProductCard = ({ product }) => {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-gray-600">{product.vendor}</p>
      <p className="text-green-700 font-semibold">₹{product.price}</p>
    </div>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch all categories for filter dropdown
  const fetchCategories = async () => {
    try {
      const res = await fetch("https://your-backend.com/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch products, optionally by category
  const fetchProducts = async (category = "") => {
    try {
      const url = category
        ? `https://your-backend.com/api/products?category=${category}`
        : "https://your-backend.com/api/products";
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Load categories on mount
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // When category changes
  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="mr-2 font-medium">Filter by Category:</label>
        <select
          className="border rounded p-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products available in this category.</p>
      )}
    </div>
  );
};

export default ProductsPage;
