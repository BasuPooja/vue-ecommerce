<template>
  <div class="max-w-4xl mx-auto p-8">
    <h1 class="text-3xl font-bold mb-6">Order Summary</h1>

    <!--============ Customer Details ============-->
    <div class="mb-6 border p-4 rounded">
      <h3><b>Order ID:</b> {{ orderId }}</h3>
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

      <div class="space-y-2 text-sm">
      <div class="flex justify-between">
        <span>Subtotal</span>
        <span>₹{{ subtotal }}</span>
      </div>

      <div v-if="discount > 0" class="flex justify-between text-green-600">
        <span>Discount</span>
        <span>- ₹{{ discount }}</span>
      </div>

      <div class="flex justify-between">
        <span>Tax (18%)</span>
        <span>₹{{ tax }}</span>
      </div>

      <div class="flex justify-between">
        <span>Shipping</span>
        <span>
          <span v-if="shipping === 0" class="text-green-600">Free</span>
          <span v-else>₹{{ shipping }}</span>
        </span>
      </div>
    </div>

    <hr class="my-4" />

    <h3 class="text-xl font-bold text-right">
      Final Paid Amount: ₹{{ finalPaidAmount }}
    </h3>

    <button
      @click="$router.push('/orders')"
      class="mt-8 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
    >
      Go to My Orders
    </button>    
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
    orderId() {
        return this.$store.state.orderId;
    },
    orderSummary() {
      return this.$store.getters.orderSummary;
    },

    subtotal() {
      return this.orderSummary.subtotal;
    },

    discount() {
      return this.orderSummary.discount;
    },

    tax() {
      return this.orderSummary.tax;
    },

    shipping() {
      return this.orderSummary.shipping;
    },

    finalPaidAmount() {
      return this.orderSummary.finalTotal;
    }
  }
};
</script>
