<<<<<<< HEAD

=======
import API from "@/services/api";
>>>>>>> 3668239 (Initial commit for JWT Authentication)

export default {
  namespaced: true,

  state() {
    return {
<<<<<<< HEAD
      accessToken: localStorage.getItem("accessToken") || null,
      refreshToken: localStorage.getItem("refreshToken") || null,
      user: JSON.parse(localStorage.getItem("user")) || null,    };
=======
      accessToken: null,
      refreshToken: localStorage.getItem("refreshToken") || null,
      user: null,
    };
>>>>>>> 3668239 (Initial commit for JWT Authentication)
  },

  mutations: {
    SET_AUTH(state, payload) {
      state.accessToken = payload.accessToken;
<<<<<<< HEAD
<<<<<<< HEAD
=======
      state.refreshToken = payload.refreshToken;
>>>>>>> 7a10bb5 (Admin Dashbord added)
      state.user = payload.user;

      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("refreshToken", payload.refreshToken);
      localStorage.setItem("user", JSON.stringify(payload.user));
=======
      state.refreshToken = payload.refreshToken;
      state.user = payload.user;
>>>>>>> 3668239 (Initial commit for JWT Authentication)
    },

    LOGOUT(state) {
      state.accessToken = null;
<<<<<<< HEAD
      state.user = null;
      state.refreshToken = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
=======
      state.refreshToken = null;
      state.user = null;
>>>>>>> 3668239 (Initial commit for JWT Authentication)
    },
  },

  actions: {
    async login({ commit }, credentials) {
<<<<<<< HEAD
      const users = [
      { username: "Pooja", password: "Pooja", role: "admin" },
      { username: "User", password: "User", role: "user" },
    ];
    const foundUser = users.find(
      (u) =>
        credentials.username.trim() === u.username &&
        credentials.password.trim() === u.password
      ) 

      if (!foundUser) {
        throw new Error("Invalid credentials");
      }

      commit("SET_AUTH", {
        accessToken: "local-demo-token",
        refreshToken: "demo-refresh-token",
        user: {
          username: foundUser.username,
          role: foundUser.role,
        },
      });
      
      return true;
=======
      const res = await API.post("/auth/login", {
        username: credentials.username,
        password: credentials.password,
      });

      commit("SET_AUTH", {
        accessToken: res.data.token,
        refreshToken: res.data.refreshToken,
        user: res.data,
      });

      localStorage.setItem("refreshToken", res.data.refreshToken);
    },

    async refreshToken({ state, commit }) {
      const res = await API.post("/auth/refresh", {
        refreshToken: state.refreshToken,
      });

      commit("SET_AUTH", {
        accessToken: res.data.token,
        refreshToken: res.data.refreshToken,
        user: state.user,
      });

      localStorage.setItem("refreshToken", res.data.refreshToken);
>>>>>>> 3668239 (Initial commit for JWT Authentication)
    },
    async refreshToken({ state, commit, dispatch }) {
      try {
        const res = await api.post("/auth/refresh", { token: state.refreshToken });
        commit("SET_AUTH", { 
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          user: state.user
        });
        return res.data.accessToken;
      } catch (err) {
        dispatch("logout", null, { root: true });
        throw err;
      }
    },

    logout({ commit }) {
      commit("LOGOUT");
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
      rootCommit("clearCart");
>>>>>>> aa68310 (before add to cart checkout it will ccheck for login and after logout cart will clear and store item in cart user basis)
=======
      // dispatch("clearAuthData"); 
>>>>>>> 7a10bb5 (Admin Dashbord added)
    },

  },
  getters: {
    isAdmin: (state) => state.user?.role === "admin",
    
    isAuthenticated(state) {
      return !!state.accessToken;
    },
    currentUser(state) {
      return state.user;
    },
    username(state) {
      return state.user?.username || "";
    }
  }
=======
      localStorage.removeItem("refreshToken");
    },
  },
>>>>>>> 3668239 (Initial commit for JWT Authentication)
};
