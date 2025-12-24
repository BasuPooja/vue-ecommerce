// import { createRouter, createWebHistory } from "vue-router";
import { createWebHistory, createRouter } from "vue-router";

import Home from "@/pages/Home.vue"
import ProductDetails from "../pages/ProductDetails.vue";
import Cart from "@/pages/Cart.vue";
import Checkout from "@/pages/Checkout.vue";

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
    { 
        path: "/cart", 
        name:"Cart",
        component: Cart,
    },
    {
        path: "/checkout",
        component: Checkout
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});