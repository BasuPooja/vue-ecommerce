// import { createRouter, createWebHistory } from "vue-router";
import { createWebHistory, createRouter } from "vue-router";

import Home from "@/pages/Home.vue"
import ProductCard from "@/components/ProductCard.vue";

const routes = [
    { 
        path: "/",
        name: "Home",
        component:Home 
    },
    {
        path: "/ProductCard",
        name: "ProductCard",
        component: ProductCard
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});