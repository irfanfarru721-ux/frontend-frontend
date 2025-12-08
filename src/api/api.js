// src/api/api.js

const BASE_URL = "/api";

// -------------------- PRODUCTS --------------------

// Get all products
export const getAllProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

// Get single product by ID
export const getProduct = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (categoryId) => {
  const res = await fetch(`${BASE_URL}/products/category/${categoryId}`);
  if (!res.ok) throw new Error("Failed to fetch products by category");
  return res.json();
};

// Get products by vendor
export const getProductsByVendor = async (vendorId) => {
  const res = await fetch(`${BASE_URL}/products/vendor/${vendorId}`);
  if (!res.ok) throw new Error("Failed to fetch products by vendor");
  return res.json();
};

// Get products by vendor & category
export const getProductsByVendorAndCategory = async (vendorId, categoryId) => {
  const res = await fetch(`${BASE_URL}/products/vendor/${vendorId}/category/${categoryId}`);
  if (!res.ok) throw new Error("Failed to fetch products by vendor & category");
  return res.json();
};

// Get vendor products grouped by category
export const getVendorProductsGrouped = async (vendorId) => {
  const res = await fetch(`${BASE_URL}/products/vendor-grouped/${vendorId}`);
  if (!res.ok) throw new Error("Failed to fetch vendor products grouped by category");
  return res.json();
};

// -------------------- CATEGORIES --------------------

export const getAllCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

// -------------------- MODULES --------------------

// Get all modules
export const getModules = async () => {
  try {
    const res = await fetch(`${BASE_URL}/modules`);
    if (!res.ok) throw new Error("Failed to fetch modules");
    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// -------------------- USERS --------------------

// Login
export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

// Register
export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
};
