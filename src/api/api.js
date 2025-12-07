import axios from "axios";

export const API_BASE = "https://completed-backend.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// AUTH
export const registerUser = (data) => axiosInstance.post("/users/register", data);
export const loginUser = (data) => axiosInstance.post("/users/login", data);

// MODULES
export const getModules = () => axiosInstance.get("/modules");

// VENDORS
export const getVendorsByModule = (moduleId) =>
  axiosInstance.get(`/vendors/module/${moduleId}`);

// PRODUCTS
export const getProductsByVendor = (vendorId) =>
  axiosInstance.get(`/products/vendor/${vendorId}`);
export const getProduct = (id) => axiosInstance.get(`/products/${id}`);
export const getAllProducts = () => axiosInstance.get("/products");

// CATEGORIES 
export const getCategoriesByVendor = (vendorId) =>
  axiosInstance.get(`/categories/vendor/${vendorId}`);

// ORDERS (placeholder)
export const createOrder = (data) => axiosInstance.post("/orders", data);
export const getMyOrders = () => axiosInstance.get("/orders/me");

export default axiosInstance;
