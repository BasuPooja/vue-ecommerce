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
        class="grid grid-cols-1 md:grid-cols-[1fr_1fr_80px_80px] 
        items-center gap-6 border-b pt-6 pb-10 min-h-[140px]"
      >
        <div class="flex justify-center mb-6">
          <img
            :src="item.image"
            class="w-28 h-28 object-contain bg-gray-50 rounded"
          />
        </div>
        
        <div>
          <h3 class="font-semibold">
            {{ item.title }}
          </h3>
          <p class="text-sm text-gray-500">
            ₹ {{ item.price }}
          </p>
        </div>

        <select
          :value="item.qty"
          @change="updateQty(item.id, $event.target.value)"
          class="w-14 min-w-[56px] max-w-[56px] 
          border rounded px-1 py-2 text-center bg-white"
        >
          <option v-for="n in 10" :key="n" :value="n">
            {{ n }}
          </option>
        </select>

        <button
          @click="remove(item.id)"
          class="text-red-500 hover:underline mb-6 w-fit justify-self-end"
        >
          Remove
        </button>
      </div>

      <div class="flex justify-between items-center mt-10">
        <div class="text-2xl font-bold">
          Total: ₹ {{ totalPrice }}
        </div>

        <router-link
          to="/checkout"
          class="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700"
        >
          Checkout
        </router-link>
      </div>
    </div>
  </div>
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
