<template>
  <div class="login">
    <section class="section is-vertical-center">
        <div class="container">
            <div class="columns is-mobile">
                <div class="column is-one-mobile is-half-desktop">
                    <form v-on:submit.prevent="Login(email, password)">
                        <div class="field is-grouped is-grouped-centered">
                            <figure class="image">
                                <img src="../assets/logo.png">
                            </figure>
                        </div>
                        <div class="field is-grouped is-grouped-centered">
                        </div>
                        <div class="field">
                            <div class="control has-icons-left has-icons-right">
                                <input v-model="email" class="input is-medium" type="email" placeholder="Email"
                                    oninvalid="this.setCustomValidity('Campo requerido')"
                                    oninput="setCustomValidity('')" required>
                                <span class="icon is-small is-left">
                                    <icon name='envelope'/>
                                </span>
                                <p class="help is-danger" v-show="userError != '' && email != ''">{{userError}}</p>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control has-icons-left">
                                <input v-model="password" class="input is-medium" type="password" placeholder="Password"
                                oninvalid="this.setCustomValidity('Campo Requerido')"
                                oninput="setCustomValidity('')" required />
                                <span class="icon is-small is-left">
                                    <icon name='lock'/>
                                </span>
                                 <p class="help is-danger" v-show="passError != '' && password != ''">{{passError}}</p>
                            </div>
                        </div>
                        <div class="field is-grouped is-grouped-centered">
                            <p class="control">
                                <input type="submit" class="button is-primary is-medium" value="Entrar"/>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <app-pageloader ref="loader" />
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  data(){
        return {
            email: '',
            password: '',
            userError:'',
            passError:''
        }
    },
    mounted(){
        this.Loader = this.$refs.loader;
    },
    created: function() {
        var vm = this;
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    vm.$router.push({ name: 'Semanal' });        
                }
            });
    },
    methods: {
        Login: function(email, password) {
            var vm = this;
            vm.Loader.Active('Iniciando');
            firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
                vm.$router.push({name: 'Semanal'});
                vm.Loader.Close()
            })
            .catch(function(error) {
                console.log(error.code);
                if (error.code == "auth/wrong-password") {
                    vm.passError = 'Password Incorrecto';
                } else if(error.code == "auth/user-not-found"){
                    vm.userError = 'Este email no existe el sistema, verifiquelo';
                }
                vm.Loader.Close()
            });
        }
    }
}
</script>

<style scoped>
    .section {
        min-height: 80vh;
    }
    .is-vertical-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    img {
        margin-bottom: 35px;
    }
    .container {
        padding: 10px;
    }
    .column {
        margin: auto;
    }
</style>
