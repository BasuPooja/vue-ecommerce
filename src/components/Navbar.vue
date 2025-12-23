<template>
  <header class="bg-white shadow-md border-b">
    <div class="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

      <!-- LEFT: Logo -->
      <div class="text-3xl font-extrabold tracking-wide text-pink-600">
        TechSolar
      </div>

      <!-- CENTER: Search -->
      <div class="flex w-full max-w-xl mx-10">
        <input
          type="text"
          placeholder="Search for products..."
          class="flex-1 px-5 py-2.5 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          class="px-6 bg-pink-600 text-white rounded-r-full hover:bg-pink-700 transition"
        >
          Search
        </button>
      </div>

      <!-- RIGHT: Menu + Cart -->
      <div class="flex items-center gap-8">

        <!-- Menu -->
        <nav class="flex gap-6 text-gray-700 font-semibold">
          <span class="hover:text-pink-600 cursor-pointer transition">
            Computers
          </span>
          <span class="hover:text-pink-600 cursor-pointer transition">
            Solar
          </span>
        </nav>

        <!-- Cart -->
        <div class="relative cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7 text-gray-700 hover:text-pink-600 transition"
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
          </svg>

          <!-- Cart Count -->
          <span
            class="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full px-1.5"
          >
            2
          </span>
        </div>

      </div>
    </div>
  </header>
</template>
