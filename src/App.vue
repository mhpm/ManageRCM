<template>
  <div class="app">
    <app-navbar v-if="$route.path != '/'"/>
    <div class="section">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{}
    }
  }
</script>

<style>
.app{
  height: 100vh;
}
</style>
