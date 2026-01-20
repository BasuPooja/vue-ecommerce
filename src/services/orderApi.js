let ordersDB = [];

export const orderApi = {
  placeOrder() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        const orderId = Date.now();

        // ---------------- NETWORK FAILURE ----------------
        if (random < 0.3) {
          reject({ type: "NETWORK_ERROR", message: "Network error" });
          return;
        }

        // ---------------CREATE ORDER----------------
        const order = {
          id: orderId,
          status: "CREATED",
          paymentStatus: "PENDING"
        };

        // ---------------- PAYMENT FAILURE ----------------
        if (random < 0.6) {
          order.paymentStatus = "FAILED";
          ordersDB.push({ ...order, status: "CANCELLED" });

          resolve({
            success: false,
            orderId,
            payment: "FAILED"
          });
          return;
        }

        // ---------------- PAYMENT SUCCESS ----------------
        order.paymentStatus = "SUCCESS";
        order.status = "PAID";
        ordersDB.push(order);

        resolve({
          success: true,
          orderId,
          payment: "SUCCESS"
        });
      }, 1200);
    });
  },

  rollbackOrder(orderId) {
    return new Promise(resolve => {
      setTimeout(() => {
        ordersDB = ordersDB.map(order =>
          order.id === orderId
            ? { ...order, status: "CANCELLED", paymentStatus: "FAILED" }
            : order
        );
        resolve();
      }, 500);
    });
  },

  getOrder(orderId) {
    return ordersDB.find(o => o.id === Number(orderId));
  }
};
