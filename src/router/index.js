// import { createRouter, createWebHistory } from "vue-router";
import { createWebHistory, createRouter } from "vue-router";

import Home from "@/pages/Home.vue"
import ProductDetails from "../pages/ProductDetails.vue";
const routes = [
    { 
        path: "/",
        name: "Home",
        component:Home 
    },
    { 
        path: "/product/:id", 
        component: ProductDetails 

    },
];

export default createRouter({
    history: createWebHistory(),
    routes
});