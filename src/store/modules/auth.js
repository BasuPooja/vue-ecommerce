<<<<<<< HEAD

=======
import API from "@/services/api";
>>>>>>> 718e8e8 (all conflict removed)

export default {
  namespaced: true,

  state() {
    return {
      accessToken: localStorage.getItem("accessToken") || null,
<<<<<<< HEAD
      user: JSON.parse(localStorage.getItem("user")) || null,    };
=======
      user: JSON.parse(localStorage.getItem("user")) || null,
      refreshToken: localStorage.getItem("refreshToken") || null,
    };
>>>>>>> 718e8e8 (all conflict removed)
  },

  mutations: {
    SET_AUTH(state, payload) {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
<<<<<<< HEAD

      localStorage.setItem("accessToken", payload.accessToken);
=======
      state.refreshToken = payload.refreshToken;

      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("refreshToken", payload.refreshToken);
>>>>>>> 718e8e8 (all conflict removed)
      localStorage.setItem("user", JSON.stringify(payload.user));
    },

    LOGOUT(state) {
      state.accessToken = null;
      state.user = null;
<<<<<<< HEAD
=======
      state.refreshToken = null;
>>>>>>> 718e8e8 (all conflict removed)

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },

  actions: {
    async login({ commit }, credentials) {
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
        user: {
          username: foundUser.username,
          role: foundUser.role,
          // avatar: "https://i.pravatar.cc/150?img=3"
        },
      });
      
      return true;
<<<<<<< HEAD
=======
    },
    
    async refreshToken({ state, commit }) {
      if (!state.refreshToken) {
        throw new Error("No refresh token");
      }

      // Demo refresh logic
      const newAccessToken = "demo-access-token-" + Date.now();

      commit("SET_AUTH", {
        accessToken: newAccessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      });

      return newAccessToken;
>>>>>>> 718e8e8 (all conflict removed)
    },

    logout({ commit }) {
      commit("LOGOUT");
    },
  },
  getters: {
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
};
