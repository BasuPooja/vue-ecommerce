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
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = cat"
            class="px-5 py-2 border rounded-md text-sm"
            :class="activeCategory === cat
              ? 'bg-blue-600 text-white'
              : 'bg-white hover:bg-gray-100'"
          >
            {{ cat }}
          </button>
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
  export default{
    props:{
      product: Object
    },

    components:{
      appHeader,
      HeroBanner,
      ProductCard
    },
    data() {
      return{ 
        categories: ["All", "computer", "solar"],
        activeCategory:"All"
      };
    },

    computed: {
      searchQuery() {
        return this.$store.getters.searchQuery;
      },

      filteredProducts() {
        let result = products;
        
        // category filter
        if(this.activeCategory!=="All"){
          result = result.filter(p =>
            p.category === this.activeCategory
          );
        }

        // Search filter 
        if(this.searchQuery){
          result = result.filter(p =>
            p.title.toLowerCase.includes(this.searchQuery.toLowerCase())
          );
        }
        return result;
      }
    }
  };
</script>

