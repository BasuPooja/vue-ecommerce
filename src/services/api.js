import axios from "axios";
import store from "@/store/cart";
import router from "@/router";


const API = axios.create({
  baseURL: "https://dummyjson.com",
});

<<<<<<< HEAD
=======
// ================== REQUEST INTERCEPTOR ====================== 
API.interceptors.request.use(
  (config) => {
    const token = store.state.auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ==========Attach access token to every request=========
const PUBLIC_ENDPOINTS = ["/products", "/products/"];

API.interceptors.request.use(
  (config) => {
     const isPublic = PUBLIC_ENDPOINTS.some((url) =>
      config.url.startsWith(url)
    );
    if (!isPublic) {
      const token = store.state.auth?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===============Token refresh handling=========
 
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) =>
    error ? prom.reject(error) : prom.resolve(token)
  );
  failedQueue = [];
};

// =============Response interceptor=============
 
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    
     if (
      originalRequest?.url?.startsWith("/products")
      ) {
        return Promise.reject(error);
      }

    // If access token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = "Bearer " + token;
          return API(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await store.dispatch("auth/refreshToken");

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization =
          "Bearer " + newAccessToken;

        return API(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // Refresh failed → logout
        store.dispatch("auth/logout");
        store.commit("ui/OPEN_LOGIN_MODAL", null, { root: true });

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
>>>>>>> 718e8e8 (all conflict removed)
export const getProducts = () => API.get("/products");

export default API;
