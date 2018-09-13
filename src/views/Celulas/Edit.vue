<template>
    <div class="new">
        <div class="columns is-centered">
            <div class="column is-6">
                <div class="notification is-primary has-text-centered">
                    <h1 class="title is-1">Editar Celula</h1>
                </div>
            </div>
        </div>

        <transition enter-active-class="animated bounceIn">
            <div v-show="msg != ''" class="has-text-centered">
                <p v-html="msg" v-bind:class="['tag is-medium']">{{msg}}</p>
            </div>
        </transition>
        <br>
        <div class="columns is-centered">
            <div class="column is-5 is-mobil">
                <div class="field">
                    <p class="control has-icons-left">
                        <input v-model="docData.Celula" class="input is-medium" type="number" placeholder="Celula" disabled>
                        <span class="icon is-small is-left">
                            <icon name="hashtag" />
                        </span>
                    </p>
                    <p class="help is-danger" v-show="celulaError">Ya existe esta celula en la base de datos</p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input v-model="docData.Lider.nombre" class="input is-medium" type="text" placeholder="Lider">
                        <span class="icon is-small is-left">
                            <icon name="user-circle" />
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input v-model="docData.Asistente.nombre" class="input is-medium" type="text" placeholder="Asistente">
                        <span class="icon is-small is-left">
                            <icon name="user" />
                        </span>
                    </p>
                </div>
                
                <div class="columns">
                    <div class="column is-6">
                        <b-field label="Sector" :type="typeSec" :message="smgSec">
                            <b-select icon="person" v-model="docData.Sector" placeholder="Select a character" :loading="isLoading" @input="GetSubSectoresBySector(docData.Sector)">
                                <option  v-for="sector in Sectores" :key="sector.Sector">{{sector.Sector}}</option>
                            </b-select>
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <b-field label="SubSector">
                            <b-select v-model="docData.SubSector" placeholder="Select a character" :loading="isLoading">
                                <option  v-for="subsector in SubSectores" :key="subsector.SubSector">{{subsector.SubSector}}</option>
                            </b-select>
                        </b-field>
                    </div>
                </div>
                
                <p v-if="smgSec=='Sin Sectores'">Aún no tienes sectores. <router-link to="../Sectores">ir a Crear Sector</router-link></p>
                <p v-else-if="smgSec=='Sector aún sin Subsectores'">Aún no tienes subsectores. <router-link to="../Sectores">ir a Crear SubSector</router-link></p> <br>
                <div class="field is-grouped is-grouped-centered">
                    <p class="control">
                        <button @click="SaveData" class="button is-success" :disabled="docData.Lider.nombre=='' ||  celulaError">
                            Guardar
                        </button>
                    </p>
                    <p class="control">
                        <router-link to="../Celulas" class="button">
                            Cancelar
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
                isLoading: true,
                celulaError:false,
                Sectores:[],
                SubSectores:[],
                msg:'',
                smgSec:'',
                celula:'',
                lider:'',
                typeSec:'',
                supervisor:'',
                sector:'',
                subsector:'',
                docData:{
                    Celula:'',
                    Sector:'',
                    SubSector:'',
                    Cgrupo:'',
                    Lider:{
                        nombre:'',
                        telefono:'',
                        email:'',
                        fecha:''
                    },
                    Asistente:{
                        nombre:'',
                        telefono:'',
                        email:'',
                        fecha:''
                    },
                    Planeacion:{
                        dia:'',
                        hora:'',
                        anfitrion:'',
                        telAnfitrion:'',
                        direccion:'',
                        referencia:''
                    },
                    Alcance:{
                        dia:'',
                        hora:'',
                        anfitrion:'',
                        telAnfitrion:'',
                        direccion:'',
                        referencia:''
                    },
                    Metas:{
                        planeacion:'',
                        miercoles:'',
                        alcance:'',
                        amigosR:'',
                        domingo:'',
                        amigosA:'',
                        amigosF:'',
                        amigosE:'',
                        bautismos:''
                    },
                    Miembros:[]
                }
            }
        },
        created(){
            setTimeout(() => {
                this.LoadSectores()
            }, 1000);
            
        },
        mounted(){
            this.Loader = this.$refs.pageloader;
            this.API = this.$refs.api;
        },
        methods:{
            LoadData(){
                var vm = this;
                vm.API.GetCelulasInfoRef().doc(vm.id).get().then(function(doc) {
                    if(doc.exists){
                        console.log("Document successfully Loaded!");
                        vm.isLoading = false;
                        vm.docData = doc.data();
                        vm.Loader.Close();
                    }
                    else{ console.log('Not Document'); vm.Loader.Close(); vm.isLoading = false;}
                });
            },
            LoadSectores(){
                 var vm = this;
                 vm.Loader.Active('Cargando');
                vm.Sectores=[]
                vm.API.GetSectoresRef().orderBy("Sector", 'asc').get().then(function(querySnapshot) {
                    let count = 0;
                    querySnapshot.forEach(function(doc) {
                        count += 1;       
                        let sector = doc.data()
                        vm.Sectores.push(sector);
                        if(count >= querySnapshot.docs.length){
                            //console.log('finished Sectores');
                            vm.LoadSubSector()
                        }
                    });
                    if(querySnapshot.docs.length == 0){
                         vm.smgSec = "Sin Sectores";
                        vm.typeSec = 'is-danger';
                        vm.isLoading = false
                        vm.LoadData()
                    }
                    else{
                        vm.smgSec = '';
                        vm.typeSec = '';
                    }
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                    vm.Loader.Close();
                });
            },
            LoadSubSector(){
               var vm = this
                vm.API.GetSubSectoresRef().get().then(function(querySnapshot) {
                    let count = 0;
                    querySnapshot.forEach(function(doc) {
                        count += 1;
                        let subsector = doc.data();
                        subsector.id = doc.id;

                        vm.Sectores.find((sector) => {
                            if(sector.Sector == subsector.Sector)
                                sector.SubSectores.push(subsector)
                        });

                        if(count >= querySnapshot.docs.length){
                            vm.isLoading = false;
                            vm.LoadData()               
                        }
                    });
                    if(querySnapshot.docs.length == 0){
                        vm.isLoading = false
                        vm.LoadData()
                    }
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                    vm.Loader.Close();
                });
            },
            GetSubSectoresBySector(sectorId){
                let vm = this
                vm.isLoading = true
                vm.Sectores.forEach((sector) => {
                    if(sector.Sector == sectorId){
                        vm.SubSectores = sector.SubSectores;
                        
                        vm.isLoading = false
                        if(vm.SubSectores.length == 0){
                            vm.smgSec = 'Sector aún sin Subsectores';
                            vm.typeSec = 'is-danger';
                        }
                        else{
                            vm.smgSec = '';
                            vm.typeSec = '';
                        }
                    }
                     vm.isLoading = false
                });
            },
            SaveData(){
                var vm = this;
                vm.Loader.Active('Guardando');
                vm.docData.Sector = parseInt(vm.docData.Sector);
                vm.docData.SubSector = parseInt(vm.docData.SubSector);
                vm.API.GetCelulasInfoRef().doc(vm.id).set(vm.docData).then(function() {
                    console.log("Document successfully written!");
                    vm.msg = 'Datos Guardados!';
                    vm.isLoading = false
                    setTimeout(() => {
                        vm.msg = '';
                    }, 2500);
                    vm.Loader.Close()
                });
            }
        }
    }
</script>

<style scoped>

</style>