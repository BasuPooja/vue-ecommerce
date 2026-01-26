<template>
  <div class="max-w-5xl mx-auto px-6 py-10">
    <h1 class="text-3xl font-bold mb-6">My Orders</h1>

    <div v-if="orders.length === 0" class="text-gray-500">
      You have no orders yet.
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="order in orders"
        :key="order.id"
        class="border p-4 rounded flex justify-between"
      >
        <div>
          <p><b>Order ID:</b> {{ order.id }}</p>
          <p><b>Date:</b> {{ new Date(order.date).toLocaleString() }}</p>
          <p><b>Status:</b> {{ order.status }}</p>
        </div>

        <router-link to="/orderSummary" class="text-blue-600">
          View
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    orders() {
      return this.$store.state.orders;
    }
  }
};
</script>
