<template>
    <div>
        <my-header :cartItemCount="cartItemCount"></my-header>
        <main>
            <div v-for="product in sortedProducts" :key="product.id">
                <div class="row">
                    <div class="col-md-5 col-md-offset-0">
                        <figure>
                            <img :src="product.image" alt="" class="product">
                        </figure>
                    </div>
                    <div class="col-md-6 col-md-offset-0 description">
                        <router-link tag="h1" :to="{name: 'Id', params: {id: product.id}}">{{product.title}}</router-link>
                        <p v-html="product.description"></p>
                        <p class="price">
                            {{product.price || formatPrice}}
                        </p>                        
                        <button class="btn btn-primary btn-lg"
                            @click="addToСart(product)"
                            v-if="canAddToСart(product)">Add to cart</button>
                        <button disabled="true" class="btn btn-primary btn-lg"
                            v-else>Add to cart</button>
                        <transition name="bounce" mode="out-in">
                            <span class="inventory-message"
                                v-if='calcQuantity(product) === 0'
                                key="0">
                                All out!</span>
                            <span class="inventory-message"
                                v-else-if='calcQuantity(product) < 5'
                                key="">
                                Only {{ calcQuantity(product) }} left!</span>
                            <span class="inventory-message"
                                v-else
                                key="">
                                Buy now!</span>
                        </transition>
                        <div class="rating">
                            <span v-for="n in 5" :key="n" v-bind:class="{'rating-active': checkRating(n, product)}">
                                <i v-if='checkRating(n, product)===true' class="bi bi-star-fill"></i>
                                <i v-else class="bi bi-star"></i>
                            </span>
                        </div>
                    </div>
                    <!--./col-md-6-->
                </div>
                <!--./row-->
            </div>
            <!--./v-for-->
        </main>
    </div>
</template>
<script>
import MyHeader from './Header.vue';
export default {
    name: 'imain',
    data(){
        return{
            products: {},
            cart: []
        };
    },
    components: {MyHeader},
    
    methods: {
        addToСart: function(product) {
            this.cart.push(product.id);
        },
        showCheckout(){
            this.showProduct = this.showProduct ? false : true;
        },
        submitForm(){
            alert('Submitted');
        },
        checkRating(n, myProduct){
            return myProduct.rating - n >= 0;
        },
        cartCount(id){
            let count = 0;
            for(let i of this.cart){
                if (i===id) count++;
            }
            return count;
        },
        canAddToСart(aProduct) {
            return (aProduct.availableInventory > this.cartCount(aProduct.id));
        },
        calcQuantity(aProduct){
            return (aProduct.availableInventory - this.cartCount(aProduct.id));
        },
    },
    computed: {
        cartItemCount: function() {
            return this.cart.length || '';
        },
        sortedProducts: function(){
            if (this.products.length > 0){
                let productsArray = this.products.slice(0);
                function compare(a, b){
                    if(a.title.toLowerCase() < b.title.toLowerCase()) {
                        return -1;
                    }
                    if(a.title.toLowerCase() > b.title.toLowerCase()) {
                        return 1;
                    } 
                    return 0;
                }
                return productsArray.sort(compare);
            }
        },
    },
    filters: {
        formatPrice: function(price){
            if (!parseInt(price)) return '';
            if (price > 99999) {
                let priceString = (price / 100).toFixed(2);
                let priceArray = priceString.split('').reverse();
                let index = 3;
                while (priceArray.length > index + 3){
                    priceArray.splice(index+3, 0, ',');
                    index += 4;
                }
                return "$" + priceArray.reverse().join('');
            } else {
                return "$" + (price / 100).toFixed(2);
            }
        }
    },
    created: function(){
        axios.get('/static/products.json')
            .then(response => {
                this.products = response.data.products;
                //console.log('this.products: ', this.products);

            })
    },
    
}
</script>
<style scoped>
.inventory-message{
    display: inline-block;
}
.bounce-enter-active {
  animation: shake 0.72s cubic-bezier(.37,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

@keyframes shake {
  10%, 90% {
    color: red;
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    color: red;
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>