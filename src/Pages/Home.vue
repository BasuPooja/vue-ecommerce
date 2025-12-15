<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto px-6 py-10">
      <!-- Section Title -->
      <h2 class="text-2xl font-bold text-gray-800 mb-6">
        Featured Products
      </h2>

      <!-- Products Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <ProductCard
          v-for="item in products"
          :key="item.id"
          :product="item"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductCard from "../components/ProductCard.vue";

/* ✅ Import local images */
import laptopImg from "../image/laptop.png";
import solarImg from "../image/solar-panel.png";
import desktopImg from "../image/desktop.png";
import inverterImg from "../image/inverter.png";

/* ✅ Static product data (you can replace later) */
const products = [
  {
    id: 1,
    name: "Gaming Laptop",
    image: laptopImg,
    price: 79999,
    oldPrice: 89999,
    rating: 4.5,
    discount: 20,
  },
  {
    id: 2,
    name: "Solar Panel 500W",
    image: solarImg,
    price: 15999,
    oldPrice: 18999,
    rating: 4.2,
    discount: 15,
  },
  {
    id: 3,
    name: "Desktop Computer",
    image: desktopImg,
    price: 45999,
    oldPrice: 49999,
    rating: 4.7,
    discount: 10,
  },
  {
    id: 4,
    name: "Solar Inverter",
    image: inverterImg,
    price: 24999,
    rating: 4.3,
  },
];
</script>
