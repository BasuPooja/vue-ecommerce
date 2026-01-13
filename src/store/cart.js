
import { createStore } from "vuex";
import auth from "./modules/auth";

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
            orderTotal: 0

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
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        removeItem(state,id){
            state.cart = state.cart.filter(item => item.id !== id);
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

            state.orderItems = state.cart.filter(item=> item.stock>0);

            state.orderTotal = state.orderItems.reduce(
                (sum, item) => sum + item.price * item.qty,
                0
            );
            state.orderId = "ORD-" + Date.now();
            state.cart = [];
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        
        clearCart(state) {
            state.cart = [];
            localStorage.setItem("cart", JSON.stringify(state.cart));
        }
        
    },
    getters:{
        totalPrice(state){
            return state.cart.reduce((total,item) => {
                if (item.stock === 0) 
                    return total;
                return total + item.price * item.qty;
             }, 0);
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
    },
    modules: {
        auth
    }
});