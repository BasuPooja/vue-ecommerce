<template>
  <header class="sticky top-0 z-50 bg-white shadow-md border-b">
    <div
      class="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between"
    >
      <!-- Logo -->
      <div class="text-3xl font-extrabold tracking-wide text-pink-600">
        TechSolar
      </div>

      <!-- Search -->
      <div class="flex items-center space-x-6">
        <div class="flex w-96">
          <input
            type="text"
            placeholder="Search products..."
            class="flex-1 px-5 py-2.5 border border-gray-300 rounded-l-full
                   focus:outline-none focus:ring-2 focus:ring-pink-500"
            v-model="searchItem"
            @input="onSearch"
             />
          <button
            class="px-6 bg-pink-600 text-white rounded-r-full
                   hover:bg-pink-700 transition"
          >
          🔍
          </button>
        </div>
      </div>

      <!-- Cart -->
      <div class="relative cursor-pointer">
        <router-link to="/cart" 
        class="relative inline-flex items-center justify-center w-8 h-8 text-2xl">
        🛒
        <span 
          v-if="cartCount > 0"
          class="relative  -top-2 -right-2 bg-pink-600 text-white
                 text-xs font-bold rounded-full px-1.5"
        >
        <!-- cartcount -->
        {{ cartCount }}

        </span>
        </router-link>
      </div>
      <br>
    </div>
  </header>
</template>


<script>
export default {
  data() {
    return {
      searchItem: ""
    };
  },

  computed: {
    cartCount() {
      return this.$store.getters.cartCount;
    }
  },

  methods: {
    onSearch(e) {
      this.$store.commit("setSearchQuery", e.target.value);
    }
  }
};
</script>

