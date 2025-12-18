<template>
  <div class="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
    <!-- Product Image -->
    <img
      :src="product.image"
      :alt="product.title"
      class="w-full h-40 object-contain mb-4"
    />

    <!-- Product Title -->
    <h3 class="text-lg font-semibold mb-1">
      {{ product.title }}
    </h3>

    <!-- Category -->
    <p class="text-sm text-gray-500 mb-2 capitalize">
      {{ product.category }}
    </p>

    <!-- Description -->
    <p class="text-sm text-gray-600 mb-3 line-clamp-2">
      {{ product.description }}
    </p>

    <!-- Price -->
    <div class="flex justify-between items-center">
      <span class="text-lg font-bold text-green-600">
        ₹ {{ product.price }}
      </span>

      <button
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
       @click="addCart">
        Add to Cart
      </button>
    </div>

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

