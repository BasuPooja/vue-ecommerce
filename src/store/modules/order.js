import { placeOrderApi } from "@/services/orderApi";

export default {
  namespaced: true,

  state: () => ({
    status: "idle", // idle | loading | success | error | partial
    error: null,
    orderId: null,
    retryCount: 0
  }),

    actions: {
        async placeOrder({ commit, state }) {
            commit("SET_STATUS", "loading");
            commit("SET_ERROR", null);

            try {
            const res = await placeOrderApi();

            commit("SET_ORDER_ID", res.orderId);

            if (res.payment === "FAILED") {
                commit("SET_STATUS", "partial");
                commit("SET_ERROR", "Payment failed. Retry payment.");
            } else {
                commit("SET_STATUS", "success");
            }

            } catch (err) {
            commit("SET_STATUS", "error");
            commit("SET_ERROR", "Network error. Please try again.");
            commit("INCREMENT_RETRY");
            }
        }
    },

    mutations: {
        SET_STATUS(state, status) {
        state.status = status;
        },
        SET_ERROR(state, error) {
        state.error = error;
        },
        SET_ORDER_ID(state, id) {
        state.orderId = id;
        },
        INCREMENT_RETRY(state) {
        state.retryCount++;
        },
        RESET(state) {
        state.status = "idle";
        state.error = null;
        state.orderId = null;
        state.retryCount = 0;
        }
    }
};

