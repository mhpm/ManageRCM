<template>
    <div class="new">
        <div class="columns is-centered">
            <div class="column is-5">
                <div class="notification is-primary has-text-centered">
                    <h1 class="title is-1">Sector {{id}}</h1>
                    <div class="subtitle">Nuevo SubSector</div>
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
                        <input v-model="SubSector" class="input is-medium" min="1" step="1" type="number" placeholder="" v-on:keyup="IdExist(SubSector)">
                        <span class="icon is-small is-left">
                            <icon name="hashtag" />
                        </span>
                    </p>
                     <p class="help has-text-danger" v-show="SubExists">{{SubExists}} Ya existe un Subsector {{SubSector}} en el Sector {{id}}</p>
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
                        <button @click="SaveData" class="button is-success" :disabled="docData.SubSector=='' || docData.Supervisor.Nombre=='' || docData.Auxiliar.Nombre=='' || SubExists || SubSector == ''">
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
                SubSectores:[],
                SubExists:false,
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
               this.LoadSubSectores()
            }, 1000);
        },
        methods:{
            SaveData(){
                var vm = this;
                vm.Loader.Active('Guardando');
                vm.docData.SubSector = parseInt(vm.SubSector);
                vm.docData.Sector = parseInt(vm.id);
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
            LoadSubSectores(){
                var vm = this
                vm.SubSectores = []
                 this.API.GetSubSectoresRef().get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        vm.SubSectores.push(doc.data())
                    });
                });
            },
            IdExist(id){
                let vm = this 
                if(id != '' && id != null){
                    vm.SubSectores.forEach((sub) =>{ 
                        if( sub.Sector == vm.id && sub.SubSector == vm.SubSector)
                            vm.SubExists = true;
                    })
                }else
                    vm.SubExists = false
            },
            CleanForm(){
                this.SubExists=false;
                this.SubSector = '';
                this.docData ={
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
                this.LoadSubSectores()
            }
        }
    }
</script>

<style scoped>

</style>