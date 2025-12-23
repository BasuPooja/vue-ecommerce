<template>
  <div class="min-h-screen flex flex-col">
    <!-- <Navbar /> -->
    <router-view/>
</div>
</template>
<script setup>
import Navbar from "./components/Navbar.vue";
import HeroBanner from "@/components/HeroBanner.vue";
</script>