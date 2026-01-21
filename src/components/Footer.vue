<template>
  <footer class="bg-gray-900 text-gray-300 mt-auto">
    <div class="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
      <p class="text-sm">
        © {{ new Date().getFullYear() }} MyStore. All rights reserved.
      </p>

      <div class="flex gap-4 mt-4 md:mt-0">
        <router-link to="/" class="hover:text-white">Home</router-link>
        <router-link to="/cart" class="hover:text-white">Cart</router-link>
        <!-- <router-link to="/login" class="hover:text-white">Login</router-link> -->
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter"
};
</script>
