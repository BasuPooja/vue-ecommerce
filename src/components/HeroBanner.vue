<template>
  <section class="relative w-full h-[420px] overflow-hidden">
    <img
      src="@/assets/image/hero-banner.jpg"
      class="w-full h-full object-cover"
      alt="Hero Banner"
    />

    <!-- Overlay content -->
    <div class="absolute inset-0 flex flex-col justify-center px-12 bg-black/40 text-white">
      <h1 class="text-4xl font-bold mb-3">
        Your One-Stop Shop for Tech & Solar
      </h1>
      <p class="text-lg mb-6">
        Explore the best deals and latest arrivals
      </p>
      <button class="bg-pink-600 w-fit px-6 py-3 rounded-md font-medium">
        Shop Now
      </button>
    </div>
  </section>
</template>
