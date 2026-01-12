
import { createStore } from "vuex";
import { coupons } from "@/services/coupons";

export default createStore({
    state(){
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        
        return{
            cart: savedCart,
            searchQuery: "",
            checkout: {
                name: "",
                email: "",
                address: ""
            },
            orderItems: [],
            orderId: null ,
            orderTotal: 0,
            coupon: null,
            discount: 0,
            couponError: "",
            payableAmount: 0,
            finalPaidAmount: 0
        };
    },
    mutations:{
        addItem(state,product){
            const existing = state.cart.find(
                item => item.id === product.id
            );
            if (existing){
                if (existing.qty < product.stock) {
                    existing.qty += 1;
                }
            }else{
                if (product.stock > 0) {
                    state.cart.push({
                        ...product,
                        qty:1
                    });
                }
            }

            state.coupon = null;
            state.discount = 0;
            state.couponError = "";

            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        removeItem(state,id){
            state.cart = state.cart.filter(item => item.id !== id);
            
            state.coupon = null;
            state.discount = 0;
            state.couponError = "";
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        updateQuantity(state, {id, qty}){
            const item = state.cart.find(
            item => item.id === id  
            );
            if (!item) return;

            if (item.stock === 0) {
                item.qty = 0;
            } else if (qty > 0 && qty <= item.stock) {
                item.qty = qty;
            }
            state.coupon = null;
            state.discount = 0;
            state.couponError = "";

            localStorage.setItem("cart", JSON.stringify(state.cart));
        },   
        
        setSearchQuery(state,query){
            state.searchQuery = query;
        },
        setCheckoutData(state, payload) {
            state.checkout = payload;
        },
        
        placeOrder(state,payload){
            state.checkout = payload.checkout;

            state.orderItems = state.cart.filter(item=> item.qty>0);

            state.orderTotal = state.orderItems.reduce(
                (sum, item) => sum + item.price * item.qty,
                0
            );
            state.orderId = "ORD-" + Date.now();
            
            // state.coupon = null;
            // state.discount = 0;
            // state.couponError = "";
            // state.cart = [];

            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        applyCoupon(state, code) {
            const coupon = coupons.find(
                c => c.code.toUpperCase() === code.toUpperCase()
            );

            if (!coupon) {
                state.coupon = null;
                state.discount = 0;
                state.couponError = "Invalid coupon code";
                return;
            }

            const today = new Date();
            const expiry = new Date(coupon.expiry);

            if (today > expiry) {
                state.coupon = null;
                state.discount = 0;
                state.couponError = "Coupon expired";
                return;
            }

            const cartTotal = state.cart.reduce(
                (sum, item) => sum + item.price * item.qty,
                0
            );

            if (cartTotal < coupon.minCartValue) {
                state.coupon = null;
                state.discount = 0;
                state.couponError = `Minimum cart value ₹${coupon.minCartValue}`;
                return;
            }

            // Calculate discount
            let discount = 0;

            if (coupon.type === "flat") {
                discount = coupon.value;
            } else if (coupon.type === "percentage") {
                discount = Math.floor((cartTotal * coupon.value) / 100);
            }

            state.coupon = coupon;
            state.discount = discount;
            state.couponError = "";
        },
        removeCoupon(state) {
            state.coupon = null;
            state.discount = 0;
            state.couponError = "";
        },

        setPayableAmount(state) {
            state.payableAmount = Math.max(
                state.orderTotal - state.discount,
                0
            );
        },
        confirmPayment(state) {
            state.finalPaidAmount = state.payableAmount; 
        },
        
        clearCart(state) {
            state.cart = [];
            state.coupon = null;
            state.discount = 0;
            state.couponError = "";
            localStorage.setItem("cart", JSON.stringify(state.cart));
        }
    },

    getters:{
        totalPrice(state){
             return state.cart.reduce(
                (total, item) => total + item.price * item.qty,
                0
            );
        },
        findTotal(state, getters) {
            return Math.max(getters.totalPrice - state.discount, 0);
        },
        payableAmount(state) {
            return state.payableAmount;
        },
        cartCount(state){
            return state.cart.reduce((count, item) => {
                if (item.stock === 0) return count;
                    return count + item.qty;
                }, 0);
        },
        searchQuery(state) {
            return state.searchQuery;
        },

        orderItems(state) {
            return state.orderItems;
        },

        checkout(state) {
            return state.checkout;
        },
        orderId(state) {
            return state.orderId;
        }
    }
});