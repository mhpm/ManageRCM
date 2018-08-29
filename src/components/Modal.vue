<template>
  <div id="Modal">
    <div align="center" v-bind:class="['modal', modalActive]">
        <div class="modal-background"></div>
        <div class="modal-content">
            <form v-on:submit.prevent>
                <h3 class="title has-text-light">Administrador</h3>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input v-bind:class="['input', error?'is-danger':'']" type="password" placeholder="Password" v-model="password">
                        <span class="icon is-small is-left"><icon name="lock" /></span>
                        <span v-show="error" class="icon is-small is-right">
                            <i class="fas fa-exclamation-triangle"></i>
                        </span>
                    </p>
                    <p v-show="error" class="help is-danger has-text-left">Password incorrecto</p>
                </div>
                <div class="field is-grouped is-grouped-centered">
                    <p class="control">
                        <button v-on:click="Login" class="button is-success" :disabled="password == ''">
                            Login
                        </button>
                        <button v-on:click="Close" class="button">
                            Cancelar
                        </button>
                    </p>
                </div>
            </form>
        </div>
    </div>
    <app-api ref="api" />
  </div>
</template>

<script>
  export default {
    data(){
        return {
            modalActive: '',
            password:'',
            error: false
        }
    },
    mounted(){
        this.API = this.$refs.api;
    },
    methods: {
        Login(){
            var vm = this;
            if (vm.password != "") {
                vm.error = false;
                vm.API.IglesiaRef.get().then(function(doc){
                    if(doc.exists){
                        if(doc.data().AdminPass == vm.password){
                            vm.$localStorage.set('Admin', true);
                            vm.$router.push({ name: "Dashboard" }); 
                            location.reload();
                        }
                        else{ vm.error = true}
                    }
                });
            }
        },
        Close(){
            this.modalActive = '';
            this.error = false;
            this.password = '';
        },
        Active(){
            this.modalActive = 'is-active';
        }
    }
  }
</script>

<style>
</style>
