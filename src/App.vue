<template>
  <div class="min-h-screen flex flex-col">
    <!-- COMMON HEADER -->
    <Navbar v-if="!isAuthPage" />

    <!-- PAGE CONTENT -->
    <main class="flex-1">
      <router-view />
    </main>
</div>
</template>
<script>
import Navbar from "@/components/Header.vue";
import AppFooter from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    AppFooter
  },
  computed: {
    isAuthPage() {
      return this.$route.meta.authLayout === true;
    }
  }
};
</script>