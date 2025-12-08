// src/api/api.js
const BASE_URL = "/api";

// Helper to safely parse JSON
const safeJson = async (res) => {
  const contentType = res.headers.get("content-type");
  if (!res.ok) {
    let text = "";
    try { text = await res.text(); } catch {}
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    const text = await res.text();
    console.error("Expected JSON but got:", text);
    throw new Error("Invalid JSON response from server");
  }
};

/* ===========================
   PRODUCTS
=========================== */

export const getAllProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  return safeJson(res);
};

export const getProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return safeJson(res);
};

export const getProductsByCategory = async (categoryId) => {
  const res = await fetch(`${BASE_URL}/products/category/${categoryId}`);
  return safeJson(res);
};

export const getProductsByVendor = async (vendorId) => {
  const res = await fetch(`${BASE_URL}/products/vendor/${vendorId}`);
  return safeJson(res);
};

export const getProductsByVendorAndCategory = async (vendorId, categoryId) => {
  const res = await fetch(`${BASE_URL}/products/vendor/${vendorId}/category/${categoryId}`);
  return safeJson(res);
};

export const getVendorProductsGrouped = async (vendorId) => {
  const res = await fetch(`${BASE_URL}/products/vendor-grouped/${vendorId}`);
  return safeJson(res);
};

/* ===========================
   MODULES
=========================== */

export const getModules = async () => {
  const res = await fetch(`${BASE_URL}/modules`);
  return safeJson(res);
};

/* ===========================
   USERS
=========================== */

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return safeJson(res);
};

export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return safeJson(res);
};

/* ===========================
   ORDERS
=========================== */

export const createOrder = async (orderData) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return safeJson(res);
};
