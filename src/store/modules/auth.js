

export default {
  namespaced: true,

  state() {
    return {
      accessToken: localStorage.getItem("accessToken") || null,
      user: JSON.parse(localStorage.getItem("user")) || null,    };
  },

  mutations: {
    SET_AUTH(state, payload) {
      state.accessToken = payload.accessToken;
      state.user = payload.user;

      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("user", JSON.stringify(payload.user));
    },

    UPDATE_PROFILE(state, payload) {
       if (state.user) {
        state.user.username = payload.username;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },

    LOGOUT(state) {
      state.accessToken = null;
      state.user = null;

      localStorage.removeItem("accessToken");
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
