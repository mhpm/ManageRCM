<template>
    <div class="new">
        <div class="columns is-centered">
            <div class="column is-5">
                <div class="notification is-primary has-text-centered">
                    <h1 class="title is-1">Nuevo Sector</h1>
                </div>
            </div>
        </div>

        <transition enter-active-class="animated bounceIn">
                    <div v-show="msg != ''" class="has-text-centered">
                        <p v-html="msg" v-bind:class="['tag is-medium']">{{msg}}</p>
                    </div>
                </transition>
        
        <div class="columns is-centered">
            <div class="column is-5 is-mobil">
                <div class="field">
                    <span class="label">Sector</span>
                    <p class="control">
                        <input v-model="docData.Sector" class="input is-medium" type="number" placeholder="#" disabled>
                    </p>
                </div>
                <div class="field">
                    <span class="label">Supervisor</span>
                    <p class="control">
                        <input v-model="docData.Supervisor.Nombre" class="input is-medium" type="email" placeholder="Nombre">
                    </p>
                </div>
                <div class="field">
                    <span class="label">Auxiliar</span>
                    <p class="control">
                        <input v-model="docData.Auxiliar.Nombre" class="input is-medium" type="text" placeholder="Nombre">
                    </p>
                </div>
                <div class="field is-grouped is-grouped-centered">
                    <p class="control">
                        <button @click="SaveData" class="button is-success" :disabled="docData.Sector=='' || docData.Supervisor.Nombre=='' || docData.Auxiliar.Nombre==''">
                            Guardar
                        </button>
                    </p>
                    <p class="control">
                        <router-link to="../Sectores" class="button">
                            Volver
                        </router-link>
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
        props:['id'],
        data(){
            return{
                msg:'',
                docData:{
                    Sector:null,
                    Supervisor:{
                        Nombre:'',
                        Telefono:'',
                        Email:''
                    },
                    Auxiliar:{
                        Nombre:'',
                        Telefono:'',
                        Email:''
                    },
                    SubSectores:[]
                }

            }
        },
        created(){
            console.log(this.id);
            setTimeout(() => {
                this.LoadData()
            }, 1500);
        },
        mounted(){
            this.Loader = this.$refs.pageloader;
            this.API = this.$refs.api;
            this.Loader.Active('Cargando');
        },
        methods:{
            SaveData(){
                var vm = this;
                vm.Loader.Active('Guardando');
                vm.API.GetSectoresRef().doc(vm.id).set(vm.docData).then(function() {
                    console.log("Document successfully written!");
                    vm.msg = 'Datos Guardados!';
                    setTimeout(() => {
                        vm.msg = '';
                    }, 2500);
                    vm.Loader.Close()
                });
            },
            LoadData(){
                var vm = this;
                vm.API.GetSectoresRef().doc(vm.id).get().then(function(doc) {
                    if(doc.exists){
                        console.log("Document successfully Loaded!");
                        vm.docData = doc.data();
                        vm.Loader.Close()
                    }
                    else{ console.log('Not Document'); vm.Loader.Close()}
                });
            }
        }
    }
</script>

<style scoped>

</style>