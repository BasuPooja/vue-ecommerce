<template>
  <div class="max-w-4xl mx-auto p-8">
    <h1 class="text-3xl font-bold mb-6">Order Summary</h1>

    <!--============ Customer Details ============-->
    <div class="mb-6 border p-4 rounded">
      <h2 class="text-xl font-semibold mb-2">Customer Details</h2>
      <p><b>Name:</b> {{ checkout.name }}</p>
      <p><b>Email:</b> {{ checkout.email }}</p>
      <p><b>Address:</b> {{ checkout.address }}</p>
    </div>

    <!--============ Ordered Items =============-->
    
    <div class="border p-4 rounded">
      <h2 class="text-xl font-semibold mb-4">Ordered Items</h2>

      <div v-for="item in orderItems" :key="item.id" class="flex justify-between mb-2" >
        <span>{{ item.title }} (x{{ item.qty }})</span>
        <span>₹{{ item.price * item.qty }}</span>
      </div>

      <hr class="my-4" />

      <h3 class="text-lg font-bold">
        Total: ₹{{ totalPrice }}
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    checkout() {
      return this.$store.state.checkout;
    },
    orderItems() {
      return this.$store.state.orderItems;
    },
    totalPrice() {
      return this.orderItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
    }
  }
};
</script>
