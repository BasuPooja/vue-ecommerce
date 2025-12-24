
import { createStore } from "vuex";

export default createStore({
    state(){
        return{
            cart:[],
            searchQuery: "",
            checkout: {
            name: "",
            email: "",
            address: ""
            }
        };
    },
    mutations:{
        addItem(state,product){
            const existing = state.cart.find(
                item => item.id === product.id
            );
            if (existing){
                existing.qty += 1;
            }else{
                state.cart.push({
                    ...product,
                    qty:1
                });
            }
        },

        removeItem(state,id){
            state.cart = state.cart.filter(
                item => item.id !== id
            );
        },

        updateQuantity(state, {id, qty}){
            const item = state.cart.find(
            item => item.id === id  
            );
            if(item && qty > 0){
                item.qty = qty;
            }
        },   
        
        setSearchQuery(state,query){
            state.searchQuery = query;
        },
         setCheckoutData(state, payload) {
            state.checkout = payload;
        },

        clearCart(state) {
            state.cart = [];
        }        
    },

    getters:{
        totalPrice(state){
            return state.cart.reduce(
                (total,item) => total + item.price * item.qty,
                0
            );
        },

        cartCount(state){
            return state.cart.reduce(
                (count,item) => count + item.qty,
                0
            );
        },
        searchQuery(state) {
            return state.searchQuery;
        }
    }

});