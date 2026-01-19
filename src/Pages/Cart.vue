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

          <span
            v-if="item.stock === 0"
            class="absolute top-1 left-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
          >
            Out of Stock
          </span>
        </div>
        
        <div>
          <h3 class="font-semibold">
            {{ item.title }}
          </h3>
          <p
            v-if="item.stock === 0"
            class="text-red-500 text-sm font-semibold"
          >
            Out of Stock
          </p>

          <p v-if="item.stock > 0" class="text-sm text-gray-500">
            ₹ {{ item.price }}
          </p>
          <p v-else class="text-sm text-red-500 font-semibold">
            Currently unavailable
          </p>
        </div>

        <select
          :value="item.qty"
          :disabled="item.stock === 0"
          @change="updateQty(item.id, $event.target.value)"
          class = "w-14 min-w-[56px] max-w-[56px] 
                  border rounded px-1 py-2 text-center bg-white
                  disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          <option 
            v-for="n in Math.max(item.stock, 1)" 
            :key="n" 
            :value="n"
          >
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

      <!-- COUPON SECTION -->
      <div class="mt-8 max-w-sm">
        <input
          v-model="couponCode"
          placeholder="Enter coupon code"
          class="border px-4 py-2 rounded w-full"
        />

        <button
          @click="applyCoupon"
          class="mt-3 bg-blue-600 text-white px-5 py-2 rounded w-full"
        >
          Apply Coupon
        </button>

        <p v-if="couponError" class="text-red-500 mt-2 text-sm">
          {{ couponError }}
        </p>

        <p v-if="coupon" class="text-green-600 mt-2 text-sm">
          Coupon applied: {{ coupon.code }}
        </p>
      </div>

      <!-- TOTALS -->
      <div class="mt-10 max-w-sm border-t pt-6">
      <div class="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>₹ {{ subtotal }}</span>
      </div>

      <div v-if="coupon" class="flex justify-between mb-2 text-green-600">
        <span>Discount:</span>
        <span>- ₹ {{ discount }}</span>
      </div>

      <div class="flex justify-between mb-2">
        <span>Tax ({{ (taxRate*100).toFixed(0) }}%):</span>
        <span>₹ {{ tax }}</span>
      </div>

      <div class="flex justify-between mb-2">
        <span>Shipping:</span>
        <span>₹ {{ shipping }}</span>
      </div>

      <div class="flex justify-between mt-4 text-2xl font-bold">
        <span>Payable:</span>
        <span>₹ {{ finalTotal }}</span>
      </div>

        <button
          @click="goToCheckout"
          class="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { products } from "@/services/products";
export default {
  data() {
    return {
      couponCode: ""
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart.map(item => {
        const product = products.find(p => p.id === item.id);

        return {
          ...item,
          stock: product ? product.stock : 0
        };
      });
    },

    subtotal() {
      return this.$store.getters.subtotal;
    },

    tax() {
      return this.$store.getters.tax;
    },

    shipping() {
      return this.$store.getters.shipping;
    },

    taxRate() {
      return this.$store.state.taxRate;
    },

    finalTotal(){
      return this.$store.getters.finalTotal;
    },
    coupon() {
      return this.$store.state.coupon;
    },
    discount() {
      return this.$store.getters.discountAmount;
    },
    couponError() {
      return this.$store.state.couponError;
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
    },
    applyCoupon() {
      this.$store.commit("applyCoupon", this.couponCode);
    },
    goToCheckout() {
      const isAuth = this.$store.getters["auth/isAuthenticated"];

      if (!isAuth) {
        // 🔥 open login modal via event bus or store
        this.$store.commit("ui/OPEN_LOGIN_MODAL");
      } else {
        this.$router.push("/checkout");
      }
    }
  }
};
</script>
