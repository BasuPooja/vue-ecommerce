<template>
  <div class="max-w-5xl mx-auto px-6 py-10">
    <h1 class="text-3xl font-bold mb-6">Your Cart</h1>

    <div v-if="cart.length === 0" class="text-gray-500">
      Your cart is empty.
    </div>

    <div v-else>
      <div
        v-for="item in cart"
        :key="item.id"
        class="flex items-center justify-between border-b py-4"
      >
        <div class="flex items-center gap-4">
          <img
            :src="item.image"
            class="w-20 h-20 object-contain"
          />
          <div>
            <h3 class="font-semibold">{{ item.title }}</h3>
            <p class="text-sm text-gray-500">
              ₹ {{ item.price }}
            </p>
          </div>
        </div>

        <input
          type="number"
          min="1"
          :value="item.qty"
          @input="updateQty(item.id, $event.target.value)"
          class="w-16 border rounded px-2 py-1"
        />

        <button
          @click="remove(item.id)"
          class="text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>

      <div class="flex justify-between mt-6 text-xl font-bold">
        <span>Total</span>
        <span>₹ {{ totalPrice }}</span>
      </div>
    </div>
  </div>

  <router-link
  to="/checkout"
  class="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
>
  Checkout
</router-link>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.state.cart;
    },

    totalPrice() {
      return this.$store.getters.totalPrice;
    }
  },

  methods: {
    remove(id) {
      this.$store.commit("removeItem", id);
    },

    updateQty(id, qty) {
      this.$store.commit("updateQuantity", {
        id,
        qty: Number(qty)
      });
    }
  }
};
</script>
