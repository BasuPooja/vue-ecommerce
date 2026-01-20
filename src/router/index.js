import { createWebHistory, createRouter } from "vue-router";

import store from "@/store/cart";
import Home from "@/pages/Home.vue"
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
<<<<<<< HEAD
=======

    {
        path: "/admin",
        name: "AdminDashboard",
        component: AdminDashboard,
        meta: { requiresAuth: true, role: "admin" }
    },
>>>>>>> 718e8e8 (all conflict removed)
   
    { 
        path: "/product/:id", 
        component: ProductDetails 
    },
    { 
        path: "/cart", 
        name:"Cart",
        component: Cart,
        meta: { requiresAuth: true }
    },
    {
        path: "/checkout",
        name: "Checkout",
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
    const user = store.state.auth?.user;

    if(to.meta.requiresAuth && !isAuth) {
<<<<<<< HEAD
        next("/login");
        return;
    } 

    if (to.meta.guestOnly && isAuth) {
        next("/");
        return;
    }
    
    if (to.meta.role && user?.role !== to.meta.role) {
        next("/");
        return;
    } 
    
    next();

=======
        store.commit("ui/OPEN_LOGIN_MODAL");
        return next(false);
    } 

    if (to.meta.role && user?.role !== to.meta.role) {
        return next("/");
    } 
    
    next();
>>>>>>> 718e8e8 (all conflict removed)
});

export default router;
