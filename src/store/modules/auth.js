

export default {
  namespaced: true,

  state() {
    return {
      accessToken: localStorage.getItem("accessToken"),
      user: JSON.parse(localStorage.getItem("user")),
    };
  },

  mutations: {
    SET_AUTH(state, payload) {
      state.accessToken = payload.accessToken;
      state.user = payload.user;

      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("user", JSON.stringify(payload.user));
    },

    LOGOUT(state) {
      state.accessToken = null;
      state.user = null;
    },
  },

  actions: {
    async login({ commit }, credentials) {
      const username = "Pooja";
      const password = "Pooja";
      if(
        credentials.username.trim() === username &&
        credentials.password.trim() === password
      ) {

      commit("SET_AUTH", {
        accessToken: "local-demo-token",
        user: { username },
      });
      
      return true;
      } else {
        throw new Error("Invalid username or password");
      }

    },

    logout({ commit }) {
      commit("LOGOUT");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.accessToken;
    }
  }
};
