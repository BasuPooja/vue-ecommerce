<template>
  <div class="bg-white rounded-xl shadow hover:shadow-lg transition p-4 relative">
    <!-- Discount Badge -->
    <span
      v-if="product.discount"
      class="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
    >
      -{{ product.discount }}%
    </span>

    <!-- Product Image -->
    <img
      :src="product.image"
      alt="product"
      class="h-44 w-full object-contain mb-4"
    />

    <!-- Rating -->
    <div class="flex items-center text-yellow-400 text-sm mb-1">
      ★★★★☆
      <span class="text-gray-500 ml-2">({{ product.rating }})</span>
    </div>

    <!-- Product Name -->
    <h3 class="font-semibold text-gray-800 mb-2">
      {{ product.name }}
    </h3>

    <!-- Price -->
    <div class="flex items-center gap-2">
      <span class="text-pink-600 font-bold text-lg">
        ₹{{ product.price }}
      </span>

      <span
        v-if="product.oldPrice"
        class="text-gray-400 line-through text-sm"
      >
        ₹{{ product.oldPrice }}
      </span>
    </div>

    <!-- Add to Cart Button -->
    <button
      class="absolute bottom-4 right-4 bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full"
    >
      🛒
    </button>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>
