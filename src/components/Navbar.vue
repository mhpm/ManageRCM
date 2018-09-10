<template>
    <nav class="navbar is-light">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/Semanal">
                <a><img src="../assets/logo4.png"></a>
            </router-link>
            <div v-bind:class="['navbar-burger burger', menuActive?'is-active':'']" @click="menuActive = !menuActive" data-target="navbarItems">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div id="navbarItems" v-bind:class="['navbar-menu', menuActive?'is-active':'']">
        <div class="navbar-start">
            <router-link v-if="IsAdmin" class="navbar-item has-text-dark" to="Dashboard">
                Dashboard
            </router-link>
            <router-link v-if="IsAdmin" class="navbar-item has-text-dark" to="Celulas">
                Celulas
            </router-link>
            <!-- <router-link v-if="IsAdmin" class="navbar-item has-text-dark" to="Sectores">
                Sectores
            </router-link>
             <router-link v-if="IsAdmin" class="navbar-item has-text-dark" to="SubSectores">
                SubSectores
            </router-link> -->
            <router-link v-if="IsAdmin" class="navbar-item has-text-dark" to="Amigos">
                Amigos
            </router-link>
            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link has-text-dark">
                    Reportes
                </a>
                <div class="navbar-dropdown is-boxed">
                    <router-link class="navbar-item has-text-dark" to="/Semanal">
                        Semanal
                    </router-link>
                    <router-link class="navbar-item has-text-dark" to="/Cuatrimestral">
                        Cuatrimestral
                    </router-link>
                    <router-link class="navbar-item has-text-dark" to="/AmigosAnotados">
                        Amigos Anotados
                    </router-link>
                    <span class="navbar-item has-text-primary">
                        Version 3.8.0
                    </span>
                </div>
            </div>
        </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="field is-grouped is-grouped-centered">
                        <p v-if="!IsAdmin" class="control">
                            <a class="button is-primary" v-on:click="LogAdmin">
                                <span>Admin</span>
                            </a>
                        </p>
                        <p v-else-if="IsAdmin" class="control">
                            <router-link class="navbar-item button is-primary" to="/User">
                                <i class="fas fa-user"></i>&nbsp;Perfil
                             </router-link>
                        </p>
                        <p class="control">
                            <a class="button is-dark" v-on:click="LogOut">
                                <icon name="sign-out" />
                                <span>&nbsp;Cerrar Sesion</span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <app-modal ref="modal" />
    </nav>
</template>

<script>
const firebase = require('../firebaseInit')
  export default {
      localStorage:{
          Admin: {
            type: Boolean,
            default: false
        }
      },
    data() {
      return {
          Modal:'',
          menuActive: false
      }
    },
    computed:{
        IsAdmin(){ return this.$localStorage.get('Admin'); }
    },
    mounted(){
        var vm = this;
        this.Modal = this.$refs.modal;
        setTimeout(() => {
            if(!firebase.currentUser)
                vm.$router.push({ name: "Index" });
        }, 1000);
    },
    created() {
      },
      methods: {
        LogOut() {
            var vm = this;
            vm.$localStorage.set('Admin', false);
            vm.$localStorage.remove('Admin');
            firebase.auth.signOut().then(function() {
                    vm.$router.push({ name: "Index" });
                }
            );
        },
        LogAdmin(){
            this.Modal.Active()
        }
      }
  };
</script>

<style scoped>
  .navbar-burger {
    background-color: #6abfb0 !important;
  }
  .navbar-burger span {
    height: 3px;
    left: calc(37%);
  }
  hr {
    background-color: #6abfb0;
    margin: 0px;
  }
</style>