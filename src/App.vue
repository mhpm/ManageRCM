<template>
  <div class="app">
    <app-navbar v-if="$route.path != '/'"/>
    <div class="section">
      <div class="container">
        <router-view />
      </div>
    </div>
    <app-footer v-if="$route.path == '/'"/>
  </div>
</template>

<script>
  export default {
    data(){
      return{}
    }
  }
</script>

<style lang="scss">
.section{
  height: auto;
}

// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: hsl(171, 100%, 41%);
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
