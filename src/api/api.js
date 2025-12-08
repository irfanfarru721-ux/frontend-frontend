import axios from "axios";

// ================== BASE URL ==================
export const API_BASE = "https://completed-backend.onrender.com/api";

// Axios Instance
const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ==================================================
//                     AUTH
// ==================================================
export const registerUser = (data) =>
  axiosInstance.post("/users/register", data);

export const loginUser = (data) =>
  axiosInstance.post("/users/login", data);

// ==================================================
//                    MODULES
// ==================================================
export const getModules = () => axiosInstance.get("/modules");

// ==================================================
//                    VENDORS
// ==================================================
export const getVendors = () => axiosInstance.get("/vendors");

export const getVendor = (id) => axiosInstance.get(`/vendors/${id}`);

export const getVendorsByModule = (moduleId) =>
  axiosInstance.get(`/vendors/module/${moduleId}`);

// ==================================================
//                    CATEGORIES
// ==================================================
export const getCategories = () => axiosInstance.get("/categories");

export const getCategory = (id) => axiosInstance.get(`/categories/${id}`);

export const createCategory = (data) =>
  axiosInstance.post("/categories", data);

export const updateCategory = (id, data) =>
  axiosInstance.put(`/categories/${id}`, data);

export const deleteCategory = (id) =>
  axiosInstance.delete(`/categories/${id}`);

export const getCategoriesByVendor = (vendorId) =>
  axiosInstance.get(`/categories/vendor/${vendorId}`);

// ==================================================
//                    PRODUCTS
// ==================================================

// → All products
export const getAllProducts = () => axiosInstance.get("/products");

// → Single product
export const getProduct = (id) => axiosInstance.get(`/products/${id}`);

// → Create product
export const createProduct = (data) =>
  axiosInstance.post("/products", data);

// → Update product
export const updateProduct = (id, data) =>
  axiosInstance.put(`/products/${id}`, data);

// → Delete product
export const deleteProduct = (id) =>
  axiosInstance.delete(`/products/${id}`);

// → Vendor-wise products
export const getProductsByVendor = (vendorId) =>
  axiosInstance.get(`/products/vendor/${vendorId}`);

// → Vendor + Category wise products
export const getProductsByVendorAndCategory = (vendorId, categoryId) =>
  axiosInstance.get(
    `/products/vendor/${vendorId}/category/${categoryId}`
  );

// ==================================================
//                      ORDERS
// ==================================================
export const createOrder = (data) =>
  axiosInstance.post("/orders", data);

export const getOrders = () => axiosInstance.get("/orders");

export const getOrder = (id) => axiosInstance.get(`/orders/${id}`);

export const updateOrder = (id, data) =>
  axiosInstance.put(`/orders/${id}`, data);

export const deleteOrder = (id) =>
  axiosInstance.delete(`/orders/${id}`);

// ==================================================
//                       CART
// ==================================================
export const getCart = () => axiosInstance.get("/cart");

export const addToCart = (data) => axiosInstance.post("/cart", data);

export const updateCartItem = (id, data) =>
  axiosInstance.put(`/cart/${id}`, data);

export const removeCartItem = (id) =>
  axiosInstance.delete(`/cart/${id}`);

export const clearCart = () =>
  axiosInstance.delete("/cart/clear");

// ==================================================
//                     REVIEWS
// ==================================================
export const getReviews = (productId) =>
  axiosInstance.get(`/reviews/${productId}`);

export const addReview = (productId, data) =>
  axiosInstance.post(`/reviews/${productId}`, data);

export const deleteReview = (reviewId) =>
  axiosInstance.delete(`/reviews/${reviewId}`);

export default axiosInstance;
