<template>
    <div class="max-w-3xl mx-auto px-6 py-10">
        <h1 class="text-3xl font-bold mb-6">Checkout</h1>

        <form @submit.prevent="submitOrder" class="space-y-4">
            <!--------------- Name--------->
            <div>
                <label class="block mb-1 font-medium">Name</label>
                <input type="text" v-model="form.name" class="w-full border px-4 py-2 rounded"/>
                <p v-if="errors.name" class="text-red-500 text-sm">
                    {{ errors.name }}
                </p>
            </div>

            <!--------Email-------->
            <div>
                <label class="block mb-1 font-medium">Email</label>
                <input
                v-model="form.email"
                type="email"
                class="w-full border px-4 py-2 rounded"
                />
                <p v-if="errors.email" class="text-red-500 text-sm">
                {{ errors.email }}
                </p>
            </div>

            <!------- Address ------->

            <div>
                <label class="block mb-1 font-medium">Address</label>
                <textarea v-model="form.address" rows="3" class="w-full border px-4 py-2 rounded"></textarea>
                <p v-if="errors.address" class="text-red-500 text-sm">
                    {{ errors.address }}
                </p>
            </div> 
            
            <button type="submit" class="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
                Place Order
            </button>
        </form>
    </div>
</template>


<script>
    export default{
        data() {
            return{
                form: {
                    name: "",
                    email: "",
                    address: ""
                },
                errors: {}
            };
        },
        methods: {
            validate() {
                this.errors= {};

                if(!this.form.name){
                    this.errors.name = "Name is required";
                }

                if(!this.form.email){
                    this.errors.name = "Email is required";
                }
                else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
                    this.errors.email = "Invalid email format";
                } 

                if(!this.form.address){
                    this.errors.address = "Address is required";
                }

                return Object.keys(this.errors).length ===0;
            },


            submitOrder(){
                if(!this.validate())
                    return;
                
                // PLace order
                this.$store.commit("placeOrder", {
                    checkout: this.form
                });

                alert("Order placed sucessfully!!");
                
                // GO TO ORDER SUMMARY PAGE
                this.$store.commit("setPayableAmount");
                this.$router.push("/payment");
            }
        }
    };

</script>