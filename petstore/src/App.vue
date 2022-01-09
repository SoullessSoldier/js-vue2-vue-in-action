<template>
  <div id="app">    
    <div class="container">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app{    
  }
  .fade-enter-active,
  .fade-leave-active{
    transition: opacity 0.5s ease-out;
  }
  .fade-enter,
  .fade-leave-to{
    opacity: 0;
  }
</style>
