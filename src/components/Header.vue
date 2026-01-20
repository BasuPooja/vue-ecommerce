<template>
  <header class="sticky top-0 z-50 bg-white shadow-md border-b">
    <div
      class="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between"
    >
      <!-- Logo -->
      <router-link
        to="/"
        class="text-3xl font-extrabold tracking-wide text-pink-600 cursor-pointer"
      >        
      TechSolar
      </router-link>

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
      <div class="relative cursor-pointer flex items-center gap-4">
      
        <!-- Login -->
         <button
          v-if="!isLoggedIn"
          @click="openLoginModal"
          class="text-sm font-semibold text-pink-600 hover:underline"
        >
          Login
        </button>



        <div v-else class="relative" ref="profileMenu">
          <!-- Profile Icon -->
          <button
            type="button"
            @click="toggleDropdown"
            class="flex items-center gap-2 text-gray-700 hover:text-pink-600"
          >
            <!-- Avatar -->
            <img
              v-if="avatarUrl"
              :src="avatarUrl"
              alt="User Avatar"
              class="w-8 h-8 rounded-full object-cover border"
            />

            <!-- Fallback initials -->
            <div
              v-else
              class="w-8 h-8 rounded-full bg-pink-600 text-white
                    flex items-center justify-center text-sm font-bold"
            >
              {{ initials }}
            </div>
            <span class="text-sm font-medium">{{ username }}</span>
          </button>

          <!-- Dropdown -->
          <div
            v-if="showDropdown"
            @click.stop
            class="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50"
          >
            <router-link
              to="/profile"
              class="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              Profile
            </router-link>
<<<<<<< HEAD
=======

            <!-- My Orders -->
            <router-link
              to="/orders"
              class="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              My Orders
            </router-link>

            <hr class="my-1" />

>>>>>>> 2fcfca0 (Profile page added can edit and view)
            <button
              @click="logout"
              class="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
            >
              Logout
            </button>
        </div>
      </div>

        <!-- Cart -->
        <div
          @click="goToCart"
          class="relative cursor-pointer inline-flex items-center justify-center w-8 h-8 text-2xl"
        >
          🛒
          <span
            v-if="cartCount > 0"
            class="absolute -top-2 -right-2 bg-pink-600 text-white
                   text-xs font-bold rounded-full px-1.5"
          >
            {{ cartCount }}
          </span>
        </div>
      </div>
    </div>
    <!-- LOGIN MODAL -->
    <LoginModal
      v-if="showLoginModal"
      @close="showLoginModal = false"
      @success="onLoginSuccess"
      @switchToSignup="openSignup"
      />

    <!-- SIGNUP MODAL -->
    <SignupModal
      v-if="showSignupModal"
      @close="showSignupModal = false"
      @switchToLogin="openLogin"
    />

  </header>
</template>

<script>

import LoginModal from "@/components/LoginModal.vue";
import SignupModal from "@/components/SignupModal.vue";

export default {
  components: { LoginModal, SignupModal },

  data() {
    return {
      searchItem: "",
      debounceTimer: null,
      showDropdown: false,
      showLoginModal: false,
      showSignupModal: false
    };
  },
  computed: {
    cartCount() {
      return this.$store.getters.cartCount;
    },
    isLoggedIn() {
      return this.$store.getters["auth/isAuthenticated"];
    },

    username() {
      return this.$store.getters["auth/username"];
    },
    avatarUrl() {
      return this.$store.getters["auth/currentUser"]?.avatar || "";
    },
    initials() {
      return this.username
      ? this.username.charAt(0).toUpperCase()
      : "";
    }
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },

  watch: {
    $route() {
      this.showDropdown = false;
    }
  },

  methods: {
    onSearch(e) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.$store.commit("setSearchQuery", this.searchItem);
      },500);
    }, 

    openLoginModal() {
      this.showLoginModal = true;
    },

    openSignup() {
      this.showLoginModal = false;
      this.showSignupModal = true;
    },

    openLogin() {
      this.showSignupModal = false;
      this.showLoginModal = true;
    },

    onLoginSuccess() {
      this.showLoginModal = false;
      this.showSignupModal = false;
    },

    goToCart() {
      if (!this.isLoggedIn) {
        this.showLoginModal = true;
      } else {
        this.$router.push("/cart");
      }
    },

    toggleDropdown(event) {
      event.stopPropagation();
      this.showDropdown = !this.showDropdown;
    },

    handleClickOutside(event) {
      const menu = this.$refs.profileMenu;
      if (menu && !menu.contains(event.target)) {
        this.showDropdown = false;
      }
    },

    logout() {
      this.showDropdown = false;
      this.$store.dispatch("auth/logout");
      this.showLoginModal = true;
    }
  }
};
</script>

