// src/api/api.js
const BASE_URL = "/api";

/* ===========================
   PRODUCTS
=========================== */

export const getAllProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const getProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

export const getProductsByCategory = async (categoryId) => {
  const res = await fetch(`${BASE_URL}/products/category/${categoryId}`);
  if (!res.ok) throw new Error("Failed to fetch products by category");
  return res.json();
};

export const getProductsByVendor = async (vendorId) => {
  const res = await fetch(`${BASE_URL}/products/vendor/${vendorId}`);
  if (!res.ok) throw new Error("Failed to fetch products by vendor");
  return res.json();
};

export const getProductsByVendorAndCategory = async (vendorId, categoryId) => {
  const res = await fetch(`${BASE_URL}/products/vendor/${vendorId}/category/${categoryId}`);
  if (!res.ok) throw new Error("Failed to fetch products by vendor and category");
  return res.json();
};

export const getVendorProductsGrouped = async (vendorId) => {
  const res = await fetch(`${BASE_URL}/products/vendor-grouped/${vendorId}`);
  if (!res.ok) throw new Error("Failed to fetch vendor products grouped");
  return res.json();
};

/* ===========================
   MODULES
=========================== */

export const getModules = async () => {
  const res = await fetch(`${BASE_URL}/modules`);
  if (!res.ok) throw new Error("Failed to fetch modules");
  return res.json();
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
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
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
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
};
