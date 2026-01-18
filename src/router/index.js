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
        name: "Login",
        component: login,
        meta: { guestOnly: true },
    },
    { 
        path: "/product/:id", 
        component: ProductDetails 
    },
    { 
        path: "/cart", 
        name:"Cart",
        component: Cart,
        meta: { requiresAuth: true },
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
    const isAuth = store.getters["auth/isAuthenticated"];
    const user = store.state.auth.user;
    if(to.meta.requiresAuth && !isAuth) {
        next("/login");
    } else if (to.meta.role && user?.role !== to.meta.role) {
        next("/");
    } else {
        next();
    }
});

export default router;
