import axios from "axios";
import store from "@/store/cart";
import router from "@/router";


const API = axios.create({
  baseURL: "https://dummyjson.com",
});

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
<<<<<<< HEAD
// ==========RESPONSE INTERCEPTOR ====================== 

=======

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
 
>>>>>>> 7a10bb5 (Admin Dashbord added)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

<<<<<<< HEAD
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await store.dispatch("auth/refreshToken");

        // attach new token & retry
        const newToken = store.state.auth.accessToken;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return API(originalRequest);
      } catch (err) {
        store.dispatch("auth/logout");
        router.push("/login");
        return Promise.reject(err);
      }
    }
=======
     if (
      originalRequest?.url?.startsWith("/products")
      ) {
        return Promise.reject(error);
      }

    // If access token expired
    if (
      error.response &&
      error.response.status === 401 &&
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

>>>>>>> 7a10bb5 (Admin Dashbord added)
    return Promise.reject(error);
  }
);

<<<<<<< HEAD
=======


>>>>>>> 7a10bb5 (Admin Dashbord added)
export const getProducts = () => API.get("/products");

export default API;
