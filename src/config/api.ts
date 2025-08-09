// API Configuration
export const API_BASE_URL = 'http://localhost:3001';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  
  // Products
  PRODUCTS: `${API_BASE_URL}/api/products`,
  CATEGORIES: `${API_BASE_URL}/api/categories`,
  
  // Orders
  ORDERS: `${API_BASE_URL}/api/orders`,
  CREATE_PAYMENT_INTENT: `${API_BASE_URL}/api/create-payment-intent`,
  
  // Admin
  ADMIN_STATS: `${API_BASE_URL}/api/admin/stats`,
  ADMIN_USERS: `${API_BASE_URL}/api/admin/users`,
  ADMIN_PRODUCTS: `${API_BASE_URL}/api/admin/products`,
  
  // Seller
  SELLER_PRODUCTS: `${API_BASE_URL}/api/seller/products`,
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
}; 