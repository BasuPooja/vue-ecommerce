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
  },
  (error) => Promise.reject(error)
);
// ==========RESPONSE INTERCEPTOR ====================== 

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

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
    return Promise.reject(error);
  }
);

export const getProducts = () => API.get("/products");

export default API;
