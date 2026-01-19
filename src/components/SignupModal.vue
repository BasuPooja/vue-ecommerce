<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white w-96 p-6 rounded-lg shadow-xl">

      <h2 class="text-xl font-bold mb-4">Create Account</h2>

      <input
        v-model="username"
        placeholder="Username"
        class="w-full mb-3 border px-3 py-2 rounded"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full mb-4 border px-3 py-2 rounded"
      />

      <button
        @click="signup"
        class="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
      >
        Sign Up
      </button>

      <p class="text-sm text-center mt-4">
        Already have an account?
        <button
          class="text-pink-600 font-semibold"
          @click="$emit('switchToLogin')"
        >
          Login
        </button>
      </p>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    signup() {
      alert("Signup logic here (API later)");
      this.$emit("switchToLogin");
    }
  }
};
</script>
