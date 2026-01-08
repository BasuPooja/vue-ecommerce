<template>
  <div>
    <!-- HERO BANNER -->
    <HeroBanner />
    <div class="max-w-[1400px] mx-auto">
      <main class="px-10 py-12">
        <h1 class="text-3xl font-bold mb-8">Featured Products</h1>

        <!-- Category Filter -->
        <div class="flex items-center gap-6 mb-10 bg-gray-50 p-4 rounded-lg">
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
          <option value="">Sort by price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>

        <!-- Rating Dropdown -->
        <select v-model="minRating" class="border px-4 py-2 rounded">
          <option value="all">All Ratings</option>
          <option :value="4">4★ & above</option>
          <option :value="3">3★ & above</option>
          <option :value="2">2★ & above</option>
        </select>

        <button
          @click="resetFilters"
          class="text-sm text-pink-600 underline"
        >
          Reset Filters
        </button>
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
        <div v-else class="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <ProductCard
            v-for="item in paginatedProducts"
            :key="item.id"
            :product="item"
          />
        </div>

        <!-- No Products -->
        <div
          v-if="!loading && filteredProducts.length === 0"
          class="text-center py-20 text-gray-500"
        >
          <p class="text-xl font-semibold">No products found 😕</p>
          <p class="mt-2">Try changing filters or search</p>
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
      minRating: "all", 
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
      let result = [...products];

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

      // Rating filter
      if (this.minRating !== "all") {
        result = result.filter(p => p.rating >= this.minRating);
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

  watch: {
    activeCategory() { this.currentPage = 1; },
    sortOrder() { this.currentPage = 1; },
    minRating() { this.currentPage = 1; },
    searchQuery() { this.currentPage = 1; }
  },

  methods: {
    resetFilters() {
      this.activeCategory = "All"
      this.sortOrder = ""
      this.minRating = "all"
      this.currentPage = 1

      // reset search (Vuex)
      this.$store.commit("setSearchQuery", "")
    }
  },

  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 800);
  }
};
</script>

