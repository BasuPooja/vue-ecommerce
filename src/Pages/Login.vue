<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

      <input
        v-model="username"
        type="text"
        placeholder="username"
        class="border w-full px-4 py-2 mb-4 rounded"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="border w-full px-4 py-2 mb-6 rounded"
      />

      <button 
        @click="login"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Login
      </button>

      <p v-if="error" class="text-red-500 text-sm mt-4 text-center">
        {{ error }}
      </p>

      <p class="text-xs text-gray-500 mt-4 text-center">
        Demo login:<br />
        <b>username:</b> Pooja<br />
        <b>password:</b> Pooja
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async login() {
      this.error = "";

      try {
        await this.$store.dispatch("auth/login", {
          username: this.username,
          password: this.password
        });

        this.$router.push("/");
      } catch (err) {
        this.error = "Invalid username or password";
      }
    }
  }
};
</script>
