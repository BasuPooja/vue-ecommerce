<template>
  <div v-if="product" class="max-w-5xl mx-auto px-10 py-12">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div class="relative w-full h-80 bg-gray-50 rounded-lg overflow-hidden">
        <img
          :src="product.image"
          class="inset-0 w-full h-full object-cover"
        />

        <span
          v-if="product.stock === 0"
          class="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded z-10"
        >
          Out of Stock
        </span>
      </div>

      <!-- DETAILS -->
      <div>
        <h1 class="text-2xl font-semibold mb-3">
          {{ product.title }}
        </h1>

        <p class="text-sm text-gray-500 mb-6 leading-relaxed">
          {{ product.description }}
        </p>

        <!-- Rating Stars -->
        <div class="flex items-center mb-2">
          <span v-for="star in 5" :key="star" class="text-yellow-400">
            {{ star <= product.rating ? "★" : "☆" }}
          </span>
          <span class="text-gray-500 text-sm ml-2">
            ({{ product.rating }})
          </span>
        </div>

        <p class="text-xl font-semibold text-green-600 mb-8">
          ₹ {{ product.price }}
        </p>

        <button 
          @click="addToCart"
          :disabled="product.stock === 0"
          class="px-4 py-2 rounded-lg text-sm transition
                bg-blue-600 text-white hover:bg-blue-700
                disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {{ product.stock === 0 ? "Out of Stock" : "Add to Cart" }}
        </button>
      </div>
    </div>
    <!-- TABS -->
    <div class="border-b flex space-x-6 mb-6">
    <button
      v-for="tab in tabs"
      :key="tab"
      @click="switchTab(tab)"
      :class="[
        'pb-2 font-semibold',
        activeTab === tab ? 'border-b-2 border-blue-600' : 'text-gray-500'
      ]" >
    {{ tab }}  
    </button>
    </div>

    <p v-if="loading[activeTab]" class="text-gray-500">
      Loading {{ activeTab }}...
    </p>

    <!-- Description -->
    <div v-if="activeTab === 'Description' && !loading.Description">
      <p class="text-gray-600"> {{ description }}</p>
    </div>

    <!-- Reviews -->
    <div v-if="activeTab === 'Reviews' && !loading.Reviews">
    <ul class="space-y-3">
      <li
        v-for="(review, index) in reviews"
        :key="index"
        class="border p-3 rounded"
        >
        ⭐ {{ review }}
      </li>
    </ul>
    </div>

    <!-- Similar Products -->
    <div v-if="activeTab === 'Similar Products' && !loading['Similar Products']">
      <ul class="space-y-2">
        <li
          v-for="item in similarProducts"
          :key="item.id"
          class="border p-3 rounded"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { products } from "@/services/products";

export default {
  data() {
    return {
      product: null,

      tabs: ["Description", "Reviews", "Similar Products"],
      activeTab: "Description",

      // cached data
      description: "",
      reviews: [],
      similarProducts: [],

      // loading state per tab
      loading:{
        Description: false,
        Reviews: false,
        "Similar Products": false
      },

      // track loaded tabs
      tabLoaded: {
        Description: false,
        Reviews: false,
        "Similar Products": false
      }
    };
  },


  created() {
    const id = Number(this.$route.params.id);
    this.product = products.find(p => p.id === id);

    // load first tab lazily
    this.loadTabData("Description");
  },

  methods: {
    addToCart() {
      
      if (this.product.stock === 0) return;
      const isLoggedIn = this.$store.getters["auth/isAuthenticated"];

      if (!isLoggedIn) {
        this.$store.commit("ui/SET_PENDING_ACTION", "add-to-cart");
        this.$store.commit("ui/SET_PENDING_PRODUCT", this.product);
        this.$store.commit("ui/OPEN_LOGIN_MODAL");
        return;
      }

      this.$store.commit("addItem", this.product);
    },
    switchTab(tab){
      this.activeTab = tab;

      if (!this.tabLoaded[tab]) {
        this.loadTabData(tab);
      }
    },
    loadTabData(tab) {
      this.loading[tab] = true;

      // simulate API delay
      setTimeout(() => {
        if (tab === "Description"){
          this.description = this.product.description;
        }

        if (tab === "Reviews") {
          this.reviews = [
            "Very good product",
            "Worth the price",
            "Excellent quality"
          ];
        }

        if (tab === "Similar Products") {
          this.similarProducts = products.filter(
            p => p.category === this.product.category && p.id !== this.product.id
          );
        }

        this.loading[tab] = false;
        this.tabLoaded[tab] = true;
      }, 700);
    }
  }
};
</script>
