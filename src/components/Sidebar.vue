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
          <!-- <svg
            :class="{'rotate-180': activeDropdown === index}"
            class="w-4 h-4 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg> -->
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

<script setup>
import { ref } from 'vue'

const categories = [
  { name: 'Computers', subcategories: ['Laptops', 'Desktops', 'Accessories'] },
  { name: 'Solar Products', subcategories: ['Panels', 'Batteries', 'Inverters'] },
  { name: 'Gadgets', subcategories: ['Smart Watches', 'Headphones', 'Cameras'] },
]

const activeDropdown = ref(null)
function toggleDropdown(index) {
  activeDropdown.value = activeDropdown.value === index ? null : index
}
</script>
