<template>
  <aside class="w-64 p-6 border-r border-gray-200 bg-gray-50">
    <h2 class="text-2xl font-bold mb-6">Categories</h2>
    <ul>
      <li v-for="(category, index) in categories" :key="index" class="mb-3">
        <div 
          @click="toggleDropdown(index)"
          class="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-100 rounded"
        >
          <span class="font-medium">{{ category.name }}</span>
        </div>
        <ul v-if="activeDropdown === index" class="ml-4 mt-2 text-gray-600">
          <li v-for="(sub, subIndex) in category.subcategories" :key="subIndex" class="py-1 hover:text-black cursor-pointer">
            {{ sub }}
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script>
  export default {
    name: "sidebar",
    data(){
      return{
        activeDropdown: null,
        categories:[
          {
            name: "Computers",
            subcategories: ["Laptops", "Desktops", "Accessories"]
          },

          {
            name: "Solar Products",
            subcategories: ["Panels", "Batteries", "Inverters"]
          },

          {
            name: "Gadgets",
            subcategories: ["Smart Watches", "Headphones", "Cameras"]
          }
        ]
      };
    },
    methods: {
      toggleDropdown(index){
        this.activeDropdown = this.activeDropdown === index ? null : index;
      }
    }
  };
</script>
