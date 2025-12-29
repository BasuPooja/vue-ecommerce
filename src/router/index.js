// import { createRouter, createWebHistory } from "vue-router";
import { createWebHistory, createRouter } from "vue-router";

import Home from "@/pages/Home.vue"
import login from "@/pages/Login.vue"
import ProductDetails from "../pages/ProductDetails.vue";
import Cart from "@/pages/Cart.vue";
import Checkout from "@/pages/Checkout.vue";
import orderSummary from  "@/pages/OrderSummary.vue"
import payment from "@/pages/Payment.vue"
const routes = [
    { 
        path: "/",
        name: "Home",
        component:Home 
    },
    {
        path: "/login",
        component: login,
        meta: { authLayout: true }
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
        name: Checkout,
        component: Checkout
    },
    {
        path: "/orderSummary",
        name: "OrderSummary",
        component: orderSummary
    },
    {
        path: "/payment",
        name: "payment",
        component: payment
    }

];

export default createRouter({
    history: createWebHistory(),
    routes
});