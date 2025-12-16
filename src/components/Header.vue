<template>
  <header class="sticky top-0 z-50 bg-white shadow-md border-b">
    <div
      class="max-w-7xl mx-auto h-20 px-6 grid grid-cols-[auto_1fr_auto] items-center"
    >
      <!-- Logo -->
      <div class="text-3xl font-extrabold tracking-wide text-pink-600">
        TechSolar
      </div>

      <!-- Search -->
      <div class="flex justify-center">
        <div class="flex w-full max-w-xl">
          <input
            type="text"
            placeholder="Search products..."
            class="flex-1 px-5 py-2.5 border border-gray-300 rounded-l-full
                   focus:outline-none focus:ring-2 focus:ring-pink-500"
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
      <div class="relative cursor-pointer">
        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-1 w-1 text-gray-700 hover:text-pink-600 transition"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-6-9v9"
          />
        </svg> -->

        <span
          class="absolute -top-2 -right-2 bg-pink-600 text-white
                 text-xs font-bold rounded-full px-1.5"
        >
          2
        </span>
      </div>
    </div>
  </header>
</template>
