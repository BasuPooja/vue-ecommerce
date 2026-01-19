<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <span class="px-4 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
        Admin Access
      </span>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="bg-white p-6 rounded-xl shadow">
        <p class="text-gray-500 text-sm">Total Products</p>
        <h2 class="text-2xl font-bold mt-2">{{ products.length }}</h2>
      </div>

      <div class="bg-white p-6 rounded-xl shadow">
        <p class="text-gray-500 text-sm">Total Orders</p>
        <h2 class="text-2xl font-bold mt-2">—</h2>
      </div>

      <div class="bg-white p-6 rounded-xl shadow">
        <p class="text-gray-500 text-sm">Total Users</p>
        <h2 class="text-2xl font-bold mt-2">—</h2>
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-xl shadow">
      <div class="flex items-center justify-between p-6 border-b">
        <h2 class="text-xl font-semibold">Manage Products</h2>
        <button
          class="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          @click="addProduct"
        >
          + Add Product
        </button>
      </div>

      <table class="w-full text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-sm font-medium">Title</th>
            <th class="px-6 py-3 text-sm font-medium">Price</th>
            <th class="px-6 py-3 text-sm font-medium">Stock</th>
            <th class="px-6 py-3 text-sm font-medium text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="product in products"
            :key="product.id"
            class="border-t"
          >
            <td class="px-6 py-4">{{ product.title }}</td>
            <td class="px-6 py-4">₹{{ product.price }}</td>
            <td class="px-6 py-4">{{ product.stock }}</td>
            <td class="px-6 py-4 text-right space-x-3">
              <button
                class="text-blue-600 hover:underline"
                @click="editProduct(product)"
              >
                Edit
              </button>
              <button
                class="text-red-600 hover:underline"
                @click="deleteProduct(product.id)"
              >
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="products.length === 0">
            <td colspan="4" class="text-center py-6 text-gray-500">
              No products found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import API from "@/services/api";

export default {
  name: "AdminDashboard",

  data() {
    return {
      products: [],
    };
  },

  computed: {
    currentUser() {
      return this.$store.getters["auth/currentUser"];
    },
    isAdmin() {
        return this.currentUser?.role === "admin";
    }
    
  },

  mounted() {
    if (!this.isAdmin) {
        this.$router.replace("/");
        return;
    }
    this.fetchProducts();
    },

  methods: {
    async fetchProducts() {
      try {
        const res = await API.get("/products");
        this.products = res.data.products;
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    },

    addProduct() {
      alert("Add Product clicked (Admin only)");
    },

    editProduct(product) {
      alert(`Edit product: ${product.title}`);
    },

    deleteProduct(id) {
      const confirmed = confirm("Are you sure?");
      if (!confirmed) return;

      this.products = this.products.filter(p => p.id !== id);
    },
  },
};
</script>
