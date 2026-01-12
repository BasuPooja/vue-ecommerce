<template>
  <div class="max-w-xl mx-auto p-8 text-center">
    <h1 class="text-2xl font-bold mb-6">Payment</h1>

    <p class="mb-4">Order ID: <b>{{ orderId }}</b></p>
    <p class="mb-6">Amount to Pay: ₹ {{ finalTotal }}</p>

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
    finalTotal(){
      return this.$store.getters.payableAmount;
    }
  },
  mounted() {
    console.log("Final Payable:", this.finalTotal);
  },
  methods: {
    confirmPayment() {
      alert("Payment Successful (Mock)");
      this.$store.commit("confirmPayment");
      this.$store.commit("clearCart");
      this.$router.push("/orderSummary");
    }
  }
};
</script>
