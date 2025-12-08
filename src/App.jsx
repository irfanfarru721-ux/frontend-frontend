import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import VendorProductsPage from "./pages/VendorProductsPage";
import ProductDetails from "./pages/ProductDetails";
import ModulesPage from "./pages/ModulesPage";
import CheckoutPage from "./pages/CheckoutPage";

// Optional: you can add a simple Home page
function Home() {
  return <h2 style={{ padding: 16 }}>Welcome to Your Store</h2>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Vendor Products Page */}
        <Route path="/vendor/:vendorId" element={<VendorProductsPage />} />

        {/* Product Details Page */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Modules Page */}
        <Route path="/modules" element={<ModulesPage />} />
        <Route path="/modules/:id" element={<ModulesPage />} /> {/* Optional detail view */}

        {/* Checkout Page */}
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
