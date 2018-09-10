<template>
    <div>
        <div class="columns is-centered">
            <div class="column is-6">
                <div class="notification is-primary has-text-centered">
                    <h1 class="title is-1">Perfil</h1>
                </div>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-6">
                 <b-field label="Nombre de la Iglesia">
                    <b-input v-model="docData.Iglesia"></b-input>
                </b-field>
                <b-field label="Dirección">
                    <b-input v-model="docData.Direccion"></b-input>
                </b-field>
                <b-field label="Teléfono de oficina">
                    <b-input v-model="docData.Tel"></b-input>
                </b-field>
                <b-field label="Nombre del Pastor">
                    <b-input v-model="docData.Pastor"></b-input>
                </b-field>
                 <b-field label="Nombre del Supervisor General RCM">
                    <b-input v-model="docData.Supervisor"></b-input>
                </b-field>

                <b-field label="Contraseña del Administrador">
                    <b-input type="password"
                        :value="docData.AdminPass"
                        password-reveal>
                    </b-input>
                </b-field>

                <!-- <b-field label="Contraseña General">
                    <b-input type="password"
                        :value="docData.GeneralPass"
                        password-reveal>
                    </b-input>
                </b-field> -->

                <div class="field is-grouped is-grouped-centered">
                    <p class="control">
                        <button @click="SaveData" class="button is-success">
                            Guardar
                        </button>
                    </p>
                </div>
            </div>
        </div>
        <app-pageloader ref="pageloader" />
        <app-api ref="api" />
    </div>
</template>

<script>
    export default {
        data(){
            return{
                docData:{
                    Iglesia:'',
                    Direccion:'',
                    Tel:'',
                    Pastor:'',
                    Supervisor:'',
                    AdminPass:'',
                    GeneralPass:'',
                }
            }
        },
        mounted(){
            this.API = this.$refs.api;
            this.Loader = this.$refs.pageloader;
            this.Loader.Active('Cargando Datos');
        },
        created(){
            setTimeout(() => {
                this.LoadData()
            }, 1000);
        },
        methods:{
            LoadData(){
                let vm = this
                vm.API.IglesiaRef.get().then(function(doc){
                    if(doc.exists){
                        vm.docData = doc.data()
                        vm.Loader.Close()
                    }
                });
            },
            SaveData(){
                let vm = this
                vm.API.IglesiaRef.set(vm.docData).then(function(){
                    vm.$snackbar.open('Datos Guardados!')
                }).catch(function(){
                    vm.$snackbar.open({
                    duration: 5000,
                    message: 'Snackbar with red action, positioned on bottom-left and a callback',
                    type: 'is-danger',
                    position: 'is-bottom-left',
                    actionText: 'Undo',
                    queue: false,
                    onAction: () => {
                        this.$toast.open({
                            message: 'Action pressed',
                            queue: false
                        })
                    }
                })
                });
            }
        }
    }
</script>

<style scoped>

</style>