<template>
    <div class="new">
        <div class="columns is-centered">
            <div class="column is-5">
                <div class="notification is-primary has-text-centered">
                    <h1 class="title is-1">Nuevo SubSector</h1>
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
                    <span class="label">SubSector</span>
                    <p class="control has-icons-left">
                        <input v-model="SubSector" class="input is-medium" min="1" step="1" type="number" placeholder="">
                        <span class="icon is-small is-left">
                            <icon name="hashtag" />
                        </span>
                    </p>
                </div>
                <div class="field">
                    <span class="label">Supervisor</span>
                    <p class="control has-icons-left">
                        <input v-model="docData.Supervisor.Nombre" class="input is-medium" type="email" placeholder="Nombre">
                        <span class="icon is-small is-left">
                            <icon name="user" />
                        </span>
                    </p>
                </div>
                <div class="field">
                    <span class="label">Sup. Auxiliar</span>
                    <p class="control has-icons-left">
                        <input v-model="docData.Auxiliar.Nombre" class="input is-medium" type="text" placeholder="Nombre">
                        <span class="icon is-small is-left">
                            <icon name="user" />
                        </span>
                    </p>
                </div>
                <div class="field">
                    <span class="label">Asignar a Sector: {{id}}</span>
                    <!-- <p class="control has-icons-left">
                        <span class="select is-medium">
                        <select v-model="docData.Sector" v-on:change="onSelectSector">
                            <option v-for="sector in Sectores" :key="sector.Sector">{{sector.Sector}}</option>
                        </select>
                        </span>
                        <span class="icon is-small is-left">
                            <icon name="hashtag" />
                        </span>
                    </p>
                    <p v-if="selectedSector" class="help">Supervisor de Sector: {{selectedSector[0].Supervisor.Nombre}}</p> -->
                </div>
                <div class="field is-grouped is-grouped-centered">
                    <p class="control">
                        <button @click="SaveData" class="button is-success" :disabled="docData.SubSector=='' || docData.Sector=='' || docData.Supervisor.Nombre=='' || docData.Auxiliar.Nombre==''">
                            Agregar
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
                Sectores:[],
                selectedSector:null,
                SubSector:'',
                msg:'',
                docData:{
                    Sector:null,
                    SubSector:null,
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
        },
        mounted(){
            console.log(this.id);
            this.Loader = this.$refs.pageloader;
            this.API = this.$refs.api;
             setTimeout(() => {
               //this.LoadData()
            }, 1000);
        },
        methods:{
            SaveData(){
                var vm = this;
                vm.Loader.Active('Guardando');
                vm.docData.SubSector = parseInt(vm.SubSector);
                vm.API.GetSubSectoresRef().doc().set(vm.docData).then(function() {
                    console.log("Document successfully written!");
                    vm.msg = 'Datos Guardados!';
                    setTimeout(() => {
                        vm.msg = '';
                    }, 2500);
                    vm.CleanForm();
                    vm.Loader.Close()
                });
            },
            LoadData(){
                var vm = this
                 this.API.GetSectoresRef().get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        vm.Sectores.push(doc.data())
                    });
                });
            },
            onSelectSector(){
                this.selectedSector = this.Sectores.filter((sector) =>{
                    return sector.Sector == this.docData.Sector
                }) 
            },
            CleanForm(){
                this.SubSector = '';
                this.docData ={
                    Sector:null,
                    SubSector:'',
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