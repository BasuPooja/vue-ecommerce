<template>
  <div>
    <!-- HERO BANNER -->
    <HeroBanner />

    <div class="max-w-[1400px] mx-auto">
      <main class="px-10 py-12">
        <h1 class="text-3xl font-bold mb-8">Featured Products</h1>

        <!-- Category Filter -->
        <div class="flex flex-wrap gap-6 mb-10">
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

        <!-- Loading Skeleton -->
        <div
          v-if="loading"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <div
            v-for="n in 8"
            :key="n"
            class="h-72 bg-gray-200 rounded-lg animate-pulse"
          ></div>
        </div>

        <!-- Products Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="item in paginatedProducts"
            :key="item.id"
            :product="item"
          />
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-8 space-x-2">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-4 py-2 rounded-md',
              currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200'
            ]"
          >
            {{ page }}
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import HeroBanner from "@/components/HeroBanner.vue";
import ProductCard from "@/components/ProductCard.vue";
import { products } from "@/services/products";

export default {
  components: {
    HeroBanner,
    ProductCard
  },

  data() {
    return {
      categories: ["All", "computer", "solar"],
      activeCategory: "All",
      sortOrder: "",
      loading: true,
      currentPage: 1,
      perPage: 4
    };
  },

  computed: {
    searchQuery() {
      return this.$store.getters.searchQuery;
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.perPage);
    },

    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredProducts.slice(start, end);
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
  },
  mounted() {
  setTimeout(() => {
    this.loading = false;
  }, 800);
}
};
</script>

