<template>
    <header>
        <div class="navbar navbar-default">
            <div class="navbar-header">
                <h1>
                    <router-link :to="{name: 'iMain'}">{{sitename}}</router-link>
                </h1>
            </div>
            <div class="navbar navbar-nav navbar-right cart ml-auto">
                <div v-if="!mySession">
                        <button class="btn btn-default btn-lg"
                            @click="signIn" type="button">
                            Sign In
                        </button>
                </div>
                <div v-else>
                    <button class="btn btn-default btn-lg"
                        @click="signOut" type="button">
                        <img class="photo" :src="mySession.photoURL" alt="user avatar">
                    Sign Out
                    </button>
                </div>
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
import firebase from 'firebase';

export default {
    name: 'my-header',
    data(){
        return{
            sitename: 'Vue.js Pet Depot'
        }
    },
    props: ['cartItemCount'],
    beforeCreate() {
        firebase.auth().onAuthStateChanged((user) => {
            this.$store.commit('SET_SESSION', user || false)
        });
    },
    methods: {
        showCheckout(){
            this.$router.push({name: 'Form'});
        },
        signIn(){
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(function(result){
                    console.log('Signed in!')
                })
                .catch(error => console.log('error ' + error));
        },
        signOut(){
            firebase.auth().signOut()
                .then(console.log('Signed out!'))
        }
    },
    computed: {
        mySession(){
            return this.$store.getters.session;
        }
    }
}
</script>
<style scoped>
a {
    text-decoration: none;
    color: black;
}
.photo {
    width: 25px;
    height: 25px;
}
.router-link-exact-active{
    color:black;
}
</style>