<template>
  <div class="max-w-5xl mx-auto px-10 py-12">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div class="relative w-full h-96 bg-gray-50 rounded-lg overflow-hidden">
        <img
                :src="product.image"
                class="absolute inset-0 w-full h-full object-contain"
              />
      </div>
      

      <div>
        <h1 class="text-2xl font-semibold mb-3">
          {{ product.title }}
        </h1>

        <p class="text-sm text-gray-500 mb-6 leading-relaxed">
          {{ product.description }}
        </p>

        <p class="text-xl font-semibold text-green-600 mb-8">
          ₹ {{ product.price }}
        </p>

        <button 
        @click="addToCart"
        class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
          Add to Cart
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
      product: null
    };
  },

  created() {
    const id = Number(this.$route.params.id);
    this.product = products.find(p => p.id === id);
  },

  methods: {
    addToCart() {
      this.$store.commit("addItem", this.product);
    }
  }
};
</script>
