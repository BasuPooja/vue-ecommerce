<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="bg-white w-96 rounded-lg shadow-lg p-6 relative">
      <!-- Close -->
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 text-gray-500 hover:text-black"
      >
        ✕
      </button>

      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>

      <form @submit.prevent="login">
        <input
          v-model="username"
          placeholder="Username"
          class="w-full mb-3 px-4 py-2 border rounded"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <button
          class="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
        >
          Login
        </button>

        <p class="text-sm text-center mt-4">
        New here?
        <button
            type="button"
            class="text-pink-600 font-semibold"
            @click.stop.prevent="$emit('switchToSignup')"
        >
            Create account
        </button>
        </p>


        <p v-if="error" class="text-red-500 text-sm mt-2 text-center">
          {{ error }}
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async login() {
      try {
<<<<<<< HEAD
        await this.$store.dispatch("auth/login", {
=======
        const res = await this.$store.dispatch("auth/login", {
>>>>>>> 718e8e8 (all conflict removed)
          username: this.username,
          password: this.password
        });
        this.$emit("success"); 
      } catch (err) {
        this.error = "Invalid credentials";
      }
    }
  }
};
</script>
