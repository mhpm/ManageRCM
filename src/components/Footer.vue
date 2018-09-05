<template>
  <div class="footer">
      <div class="container">
          <div class="content has-text-centered">
              Made with <span class="icon has-text-danger"><i class="mdi mdi-heart mdi-24px"></i></span> by
              <a href="https://www.linkedin.com/in/michellepm/">Michelle Pérez Morales</a><br>
              <b>ManageRCM</b> Copyright © 2018
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  background-color: #fafafa;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height:30px;   /* Height of the footer */
  padding-bottom: -3px;
}
</style>
