<template>
    <header>
        <div class="navbar navbar-default">
            <div class="navbar-header">
                <h1>
                    <router-link :to="{name: 'iMain'}">{{sitename}}</router-link>
                </h1>
            </div>
            <div class="navbar navbar-nav navbar-right cart ml-auto">
                    <router-link 
                        tag="button" 
                        active-class="active" 
                        :to="{name: 'Form'}" 
                        class="btn btn-light btn-lg">
                        <span>{{ cartItemCount }} <i class="bi bi-cart"></i></span> Checkout
                    </router-link>                    
            </div>
        </div>
    </header>
</template>
<script>
export default {
    name: 'my-header',
    data(){
        return{
            sitename: 'Vue.js Pet Depot'
        }
    },
    props: ['cartItemCount'],
    methods: {
        showCheckout(){
            this.$router.push({name: 'Form'});
        }
    }
}
</script>
<style scoped>
a {
    text-decoration: none;
    color: black;
}
.router-link-exact-active{
    color:black;
}
</style>