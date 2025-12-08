import axios from "axios";

// Base URL for backend
export const API_BASE = "https://completed-backend.onrender.com/api";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Automatically attach token if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ================== AUTH ==================
export const registerUser = (data) => axiosInstance.post("/users/register", data);
export const loginUser = (data) => axiosInstance.post("/users/login", data);

// ================== MODULES ==================
export const getModules = () => axiosInstance.get("/modules");

// ================== VENDORS ==================
export const getVendorsByModule = (moduleId) =>
  axiosInstance.get(`/vendors/module/${moduleId}`);

// ================== CATEGORIES ==================
export const getCategoriesByVendor = (vendorId) =>
  axiosInstance.get(`/categories/vendor/${vendorId}`);

// ================== PRODUCTS ==================
export const getProductsByVendor = (vendorId) =>
  axiosInstance.get(`/products/vendor/${vendorId}`);

export const getProductsByCategory = (categoryId) =>
  axiosInstance.get(`/products/category/${categoryId}`);

export const getProduct = (id) => axiosInstance.get(`/products/${id}`);
export const getAllProducts = () => axiosInstance.get("/products");

// ================== ORDERS ==================
export const createOrder = (data) => axiosInstance.post("/orders", data);
export const getMyOrders = () => axiosInstance.get("/orders/me");

// ================== EXPORT INSTANCE ==================
export default axiosInstance;
