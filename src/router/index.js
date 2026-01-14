// import { createRouter, createWebHistory } from "vue-router";
import { createWebHistory, createRouter } from "vue-router";

import store from "@/store/cart";
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
        component: Checkout,
        meta: { requiresAuth: true }
    },
    {
        path: "/orderSummary",
        name: "OrderSummary",
        component: orderSummary,
        meta: { requiresAuth: true }
    },
    {
        path: "/payment",
        name: "payment",
        component: payment,
        meta: { requiresAuth: true }
    }

];


const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if(
        to.meta.requiresAuth && !store.getters["auth/isAuthenticated"]
    ) {
        next("/login");
    } else {
        next();
    }
});

export default router;
