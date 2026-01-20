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
<<<<<<< HEAD
=======
              v-if="isAdmin"
              to="/admin"
              class="block px-4 py-2 text-sm font-semibold text-pink-600 hover:bg-gray-100"
            >
              Admin Dashboard
            </router-link>

            <router-link
>>>>>>> 718e8e8 (all conflict removed)
              to="/profile"
              class="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              Profile
            </router-link>
<<<<<<< HEAD
=======

            <hr class="my-1" />

>>>>>>> 718e8e8 (all conflict removed)
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
<<<<<<< HEAD
      @close="showLoginModal = false"
=======
      @close="$store.commit('ui/CLOSE_LOGIN_MODAL')"
>>>>>>> 718e8e8 (all conflict removed)
      @success="onLoginSuccess"
      @switchToSignup="openSignup"
      />

    <!-- SIGNUP MODAL -->
    <SignupModal
      v-if="showSignupModal"
      @close="showSignupModal = false"
      @switchToLogin="openLogin"
    />
<<<<<<< HEAD

=======
>>>>>>> 718e8e8 (all conflict removed)
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

<<<<<<< HEAD
=======
    currentUser() {
      return this.$store.getters["auth/currentUser"];
    },

    isAdmin() {
      return this.currentUser?.role === "admin";
    },

    showLoginModal() {
      return this.$store.state.ui.showLoginModal;
    },

>>>>>>> 718e8e8 (all conflict removed)
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
<<<<<<< HEAD
      this.showLoginModal = false;
=======
      this.$store.commit("ui/CLOSE_LOGIN_MODAL");
>>>>>>> 718e8e8 (all conflict removed)
      this.showSignupModal = true;
    },

    openLogin() {
      this.showSignupModal = false;
<<<<<<< HEAD
      this.showLoginModal = true;
    },

    onLoginSuccess() {
      this.showLoginModal = false;
      this.showSignupModal = false;
=======
      this.$store.commit("ui/OPEN_LOGIN_MODAL");
    },

    onLoginSuccess() {
      const { pendingAction, pendingProduct } = this.$store.state.ui || {};

      this.$store.commit("ui/CLOSE_LOGIN_MODAL");

      if (pendingAction === "add-to-cart" && pendingProduct) {
        this.$store.commit("addItem", pendingProduct);
      }

      if (pendingAction === "checkout") {
        this.$router.push("/checkout");
      }

      this.$store.commit("ui/CLEAR_PENDING");
>>>>>>> 718e8e8 (all conflict removed)
    },

    goToCart() {
      if (!this.isLoggedIn) {
<<<<<<< HEAD
        this.showLoginModal = true;
      } else {
        this.$router.push("/cart");
      }
=======
        this.$store.commit("ui/SET_PENDING_ACTION",{type: "checkout"});
        this.$store.commit("ui/OPEN_LOGIN_MODAL");
        return;
      }
      this.$router.push("/cart");
>>>>>>> 718e8e8 (all conflict removed)
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
<<<<<<< HEAD
      this.showLoginModal = true;
=======
      this.$router.push("/");
>>>>>>> 718e8e8 (all conflict removed)
    }
  }
};
</script>

