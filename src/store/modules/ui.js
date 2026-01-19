// store/modules/ui.js
export default {
  namespaced: true,
  state: () => ({
    showLoginModal: false,
    pendingAction: null,
    pendingProduct: null,
  }),
  mutations: {
    OPEN_LOGIN_MODAL(state) {
      state.showLoginModal = true;
    },
    CLOSE_LOGIN_MODAL(state) {
      state.showLoginModal = false;
    },
    SET_PENDING_ACTION(state, action) {
      state.pendingAction = action;
    },
    CLEAR_PENDING(state) {
      state.pendingAction = null;
      state.pendingProduct = null;
    },
    ADD_PENDING_PRODUCT(state, product) {
      state.pendingProduct = product;
    }
  }
};
