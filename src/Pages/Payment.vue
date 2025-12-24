<template>
  <div class="max-w-xl mx-auto p-8 text-center">
    <h1 class="text-2xl font-bold mb-6">Payment</h1>

    <p class="mb-4">Order ID: <b>{{ orderId }}</b></p>
    <p class="mb-6">Amount to Pay: ₹ {{ totalPrice }}</p>

    <button
      class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      @click="confirmPayment"
    >
      Pay Now
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    orderId() {
      return this.$store.state.orderId;
    },
    totalPrice() {
      return this.$store.state.orderTotal;
    }
  },
  methods: {
    confirmPayment() {
      alert("Payment Successful (Mock)");
      this.$router.push("/orderSummary");
    }
  }
};
</script>
