import API from "@/services/api";

export default {
  namespaced: true,

  state() {
    return {
      accessToken: null,
      refreshToken: localStorage.getItem("refreshToken") || null,
      user: null,
    };
  },

  mutations: {
    SET_AUTH(state, payload) {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.user = payload.user;
    },

    LOGOUT(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
  },

  actions: {
    async login({ commit }, credentials) {
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
    },

    logout({ commit }) {
      commit("LOGOUT");
      localStorage.removeItem("refreshToken");
    },
  },
};
