<template>
  <div class="max-w-5xl mx-auto px-10 py-12">
    <div class="grid grid-cols-2 gap-10">
      <img
        :src="product.image"
        class="w-full h-80 object-contain"
      />

      <div>
        <h1 class="text-3xl font-bold mb-4">
          {{ product.title }}
        </h1>

        <p class="text-gray-600 mb-4">
          {{ product.description }}
        </p>

        <p class="text-2xl font-bold text-green-600 mb-6">
          ₹ {{ product.price }}
        </p>

        <button 
        @click="addToCart"
        class="bg-blue-600 text-white px-6 py-3 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { products } from "@/services/products";

export default {
    data(){
        return {
            product: null
        };
    },
    created(){
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

