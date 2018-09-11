<template>
    <div class="new">
        <div class="columns is-centered">
            <div class="column is-5">
                <div class="notification is-primary has-text-centered">
                    <h1 class="title is-2">Nuevo Sector</h1>
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
                    <p class="control has-icons-left">
                        <input v-model="Sector" class="input is-medium" type="number" v-on:keyup="IdExist(Sector)">
                        <span class="icon is-small is-left">
                            <icon name="hashtag" />
                        </span>
                    </p>
                    <p class="help is-danger" v-if="sectorError">Ya existe ese sector en la base de datos</p>
                </div>
                <div class="field">
                    <span class="label">Supervisor</span>
                    <p class="control has-icons-left">
                        <input v-model="docData.Supervisor.Nombre" class="input is-medium" type="text" placeholder="Nombre">
                        <span class="icon is-small is-left">
                            <icon name="user" />
                        </span>
                    </p>
                </div>
                <div class="field">
                    <span class="label">Auxiliar</span>
                    <p class="control has-icons-left">
                        <input v-model="docData.Auxiliar.Nombre" class="input is-medium" type="text" placeholder="Nombre">
                        <span class="icon is-small is-left">
                            <icon name="user" />
                        </span>
                    </p>
                </div>
                <div class="field is-grouped is-grouped-centered">
                    <p class="control">
                        <button @click="SaveData" class="button is-success" :disabled="Sector=='' || docData.Supervisor.Nombre=='' || docData.Auxiliar.Nombre=='' || sectorError">
                            Agregar
                        </button>
                    </p>
                    <p class="control">
                        <router-link to="Sectores" class="button">
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
        data(){
            return{
                sectorError:false,
                msg:'',
                Sector:'',
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
        created(){},
        mounted(){
            this.Loader = this.$refs.pageloader;
            this.API = this.$refs.api;
        },
        methods:{
            SaveData(){
                var vm = this;
                vm.Loader.Active('Guardando');
                vm.docData.Sector = parseInt(vm.Sector);
                vm.API.GetSectoresRef().doc(vm.Sector).set(vm.docData).then(function() {
                    console.log("Document successfully written!");
                    vm.msg = 'Datos Guardados!';
                    setTimeout(() => {
                        vm.msg = '';
                    }, 2500);
                    vm.CleanForm();
                    vm.Loader.Close()
                });
            },
            IdExist(id){
                var vm = this
                if(id != '' && id != null){
                    vm.API.GetSectoresRef().doc(id).get().then(function(doc){
                        if(doc.exists)
                        vm.sectorError = true
                        else
                        vm.sectorError = false
                    })
                }
            },
            CleanForm(){
                this.Sector = '';
                this.docData ={
                    Sector:'',
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
                    Celulas:[]
                }
            }
        }
    }
</script>

<style scoped>

</style>