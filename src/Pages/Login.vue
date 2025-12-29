<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

      <input
        type="email"
        placeholder="Email"
        class="border w-full px-4 py-2 mb-4 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        class="border w-full px-4 py-2 mb-6 rounded"
      />

      <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Login
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login"
};
</script>
