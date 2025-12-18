<template>
  <div>
    <!-- HEADER -->
    <appHeader />

    <!-- HERO BANNER -->
    <HeroBanner />

    <div class="max-w-[1400px] mx-auto">
      <main class="px-10 py-12">
        <h1 class="text-3xl font-bold mb-8">Featured Products</h1>

        <!-- Category Filter -->
        <div class="flex gap-4 mb-10">
          <div class="flex gap-6 mb-10">
        <!-- Category Dropdown -->
        <select
          v-model="activeCategory"
          class="border px-4 py-2 rounded"
        >
          <option value="All">Categories</option>
          <option
            v-for="cat in categories"
            :key="cat"
            :value="cat"
          >
            {{ cat }}
          </option>
        </select>

        <!-- Sort Dropdown -->
         
        <select
          v-model="sortOrder"
          class="border px-4 py-2 rounded"
        >
        <option value="All">Price Sort</option>
          <option value="">Sort by price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-3 gap-10">
          <ProductCard
            v-for="item in filteredProducts"
            :key="item.id"
            :product="item"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import appHeader from "@/components/Header.vue";
import HeroBanner from "@/components/HeroBanner.vue";
import ProductCard from "@/components/ProductCard.vue";
import { products } from "@/services/products";

export default {
  components: {
    appHeader,
    HeroBanner,
    ProductCard
  },

  data() {
    return {
      categories: ["All", "computer", "solar"],
      activeCategory: "All",
      sortOrder: ""
    };
  },

  computed: {
    searchQuery() {
      return this.$store.getters.searchQuery;
    },

    filteredProducts() {
      let result = products;

      // category filter
      if (this.activeCategory !== "All") {
        result = result.filter(
          p => p.category === this.activeCategory
        );
      }

      // search filter
      if (this.searchQuery) {
        result = result.filter(p =>
          p.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      
      //  Sort by price
      if (this.sortOrder === "low") {
        result.sort((a, b) => a.price - b.price);
      }

      if (this.sortOrder === "high") {
        result.sort((a, b) => b.price - a.price);
      }

      return result;
    }
  }
};
</script>
