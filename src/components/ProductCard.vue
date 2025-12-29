<template>
  <div class="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col w-full max-w-[280px] mx-auto">
    <!-- Product Image -->
    <div class="relative w-full h-48 bg-gray-50 rounded-lg mb-4 overflow-hidden">
      <img
        :src="product.image"
        :alt="product.title"
        class="absolute inset-0 w-full h-full object-contain"
      />
    </div>
    <!-- Product Title -->
    <h3 class="text-lg font-semibold mb-1">
      {{ product.title }}
    </h3>

    <!-- Category -->
    <p class="text-sm text-gray-500 mb-2 capitalize">
      {{ product.category }}
    </p>

    <!-- Description -->
    <p class="text-xs text-gray-500 mb-3 line-clamp-2">
      {{ product.description }}
    </p>

    <!-- Price -->
    <div class=" mt-auto flex justify-between items-center">
      <span class="text-lg font-bold text-green-600">
        ₹ {{ product.price }}
      </span>

      <button
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
       @click="addCart">
        Add to Cart
      </button>
    </div>

    <router-link
      :to="`/product/${product.id}`"
      class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm"
    >
      View Details
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  methods: {
    addCart() {
      this.$store.commit("addItem", this.product);
    }
  }
};
</script>

