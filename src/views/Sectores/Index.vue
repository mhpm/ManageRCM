<template>
    <div class="Sectores" align="center">
        <div class="columns is-centered">
            <div class="column is-6">
                <div class="notification is-primary has-text-centered">
                    <h1 class="title is-1">Sectores <router-link class="button is-dark" to="SectoresNew">Nuevo</router-link></h1>
                </div>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-6">
                <app-alert :msg="'Total Sectores: ' + Sectores.length"/>
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <b-table
                    :data="Sectores"
                    paginated
                    per-page="5"
                    detailed
                    narrowed
                    hoverable
                    detail-key="Sector"
                >
                    <template slot-scope="props">
                        <b-table-column field="Sector" label="Sector" width="40" numeric sortable>
                            {{ props.row.Sector }}
                        </b-table-column>

                        <b-table-column field="Supervisor.Nombre" label="Supervior" sortable>
                            {{ props.row.Supervisor.Nombre }}
                        </b-table-column>

                        <b-table-column field="Supervisor.Auxiliar" label="Auxiliar" sortable>
                            {{ props.row.Auxiliar.Nombre }}
                        </b-table-column>

                        <b-table-column field="" label="SubSector" centered>
                            <router-link v-bind:to="'SubSectoresNew/'+props.row.Sector" class="button is-small is-primary">
                                <span class="icon is-small">
                                    <i class="fas fa-plus fa-sm"></i>
                                </span>
                            </router-link>
                        </b-table-column>
                        <b-table-column field="Editar" label="Editar" centered>
                            <router-link v-bind:to="'SectoresEdit/'+props.row.Sector" class="button is-small is-light">
                                <span class="icon is-small">
                                    <i class="fas fa-edit fa-sm"></i>
                                </span>
                            </router-link>
                        </b-table-column>
                        <b-table-column field="Borrar" label="Borrar" centered>
                            <a @click="Delete(props.row.Sector)" class="button is-small is-light">
                                <span class="icon is-small">
                                    <i class="fas fa-trash fa-sm"></i>
                                </span>
                            </a>
                        </b-table-column>
                    </template>

                    <template slot="detail" slot-scope="props">
                        <article class="media">
                            <div class="media-content">
                                <div class="content">

                                   <b-table :data="props.row.SubSectores" :loading="isLoading" narrowed detailed>
                                        <template slot-scope="subs">
                                            <b-table-column field="SubSector" label="SubSector" width="40" numeric sortable>
                                                {{ subs.row.SubSector }}
                                            </b-table-column>

                                            <b-table-column field="Supervisor.Nombre" label="Supervior" sortable>
                                                {{ subs.row.Supervisor.Nombre }}
                                            </b-table-column>

                                            <b-table-column field="Supervisor.Auxiliar" label="Auxiliar" sortable>
                                                {{ subs.row.Auxiliar.Nombre }}
                                            </b-table-column>

                                            <b-table-column field="Editar" label="Editar" centered>
                                                <router-link v-bind:to="'SubSectoresEdit/'+subs.row.id" class="button is-small is-light">
                                                    <span class="icon is-small">
                                                        <i class="fas fa-edit fa-sm"></i>
                                                    </span>
                                                </router-link>
                                            </b-table-column>
                                            <b-table-column field="Borrar" label="Borrar" centered>
                                                <a @click="DeleteSub(subs.row.id)" class="button is-small is-light">
                                                    <span class="icon is-small">
                                                        <i class="fas fa-trash fa-sm"></i>
                                                    </span>
                                                </a>
                                            </b-table-column>
                                        </template>
                                        <template slot="detail" slot-scope="subs">
                                            <article class="media">
                                                <div class="media-content">
                                                    <div class="content">
                                                        <b-table :data="subs.row.Celulas">
                                                            <template slot-scope="celulas">
                                                                 <b-table-column field="" label="">
                                                                    
                                                                </b-table-column>
                                                                <b-table-column field="Celula" label="Celula" width="40" sortable numeric>
                                                                    {{ celulas.row.Celula }}
                                                                </b-table-column>
                                                                <b-table-column field="Lider.nombre" label="Lider">
                                                                    {{ celulas.row.Lider.nombre }}
                                                                </b-table-column>
                                                                <b-table-column field="Asistente.nombre" label="Asistente">
                                                                    {{ celulas.row.Asistente.nombre }}
                                                                </b-table-column>
                                                            </template>
                                                        </b-table>
                                                    </div>
                                                </div>
                                            </article>
                                         </template>
                                   </b-table>

                                </div>
                            </div>
                        </article>
                    </template>
                </b-table>
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
                Sectores:[],
                SubSectores:[],
                isLoading: false,
                celulaColumns:[
                    {
                        field: '',
                        label: '',
                    },
                    {
                        field: 'Celula',
                        label: 'Celula',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'Lider.nombre',
                        label: 'Lider',
                    }
                ]
            }
        },
        created(){
            setTimeout(() => {
                this.LoadData()
            }, 1500);
            
        },
        mounted(){
            this.API = this.$refs.api;
            this.Loader = this.$refs.pageloader;
            this.Loader.Active('Cargando Datos');
        },
        methods:{
            LoadData(){
                this.LoadSectores()
            },
            LoadSectores(){
                 var vm = this;
                vm.Sectores=[]
                vm.API.GetSectoresRef().orderBy("Sector", 'asc').get().then(function(querySnapshot) {
                    let count = 0;
                    querySnapshot.forEach(function(doc) {
                        count += 1;       
                        let sector = doc.data()
                        vm.Sectores.push(sector);
                        if(count >= querySnapshot.docs.length){
                            console.log('finished Sectores');
                            vm.LoadSubSector()
                        }
                    });
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
                            console.log('finished Subs');                
                            vm.LoadCelulas()
                            vm.Loader.Close();
                            vm.isLoading = false;
                        }
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                    vm.Loader.Close();
                });
            },
            LoadCelulas(){
                var vm = this
                vm.API.GetCelulasInfoRef().get().then(function(querySnapshot) {
                    let count = 0;
                    querySnapshot.forEach(function(doc) {
                        count += 1;
                        let Celula = doc.data();
                        Celula.id = doc.id;

                        vm.Sectores.find((sector) => {
                            if(sector.Sector == Celula.Sector){
                                sector.SubSectores.find((subsector) => {
                                    if(subsector.SubSector == Celula.SubSector)
                                        subsector.Celulas.push(Celula);
                                });
                            }
                        });

                        if(count >= querySnapshot.docs.length){
                            console.log('finished Celulas');
                            vm.Loader.Close();
                            vm.isLoading = false;                     
                        }
                    })
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                    vm.Loader.Close();
                });
            },
            Delete(id){
                var vm = this;
                vm.$dialog.confirm({
                    title:'Alerta',
                    message: 'Estas seguro de <b>Borrar</b> este sector?',
                    type: 'is-danger',
                    confirmText: 'Borrar',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    onConfirm: () => {
                        vm.Loader.Active('Eliminando');
                        vm.API.GetSectoresRef().doc(String(id)).delete().then(function() {
                            console.log("Document successfully deleted!");
                            vm.LoadData()
                            vm.Loader.Close();
                        }).catch(function(error) {
                            console.error("Error removing document: ", error);
                        })
                    }
                });
            },
            DeleteSub(id){
                var vm = this;
                vm.$dialog.confirm({
                    title:'Alerta',
                    message: 'Estas seguro de <b>Borrar</b> este SubSector?',
                    type: 'is-danger',
                    confirmText: 'Borrar',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    onConfirm: () => {
                        vm.isLoading = true;
                        vm.API.GetSubSectoresRef().doc(String(id)).delete().then(function() {
                            console.log("Document successfully deleted!");
                            vm.Sectores.forEach((sector) => {
                                sector.SubSectores = []
                            })
                            vm.LoadSubSector()
                        }).catch(function(error) {
                            console.error("Error removing document: ", error);
                        })
                    }
                });
            }
        }
    }
</script>

<style scoped>
.button.is-danger {
    background-color: #ff3860;
    border-color: transparent;
    color: #fff;
}
.button.is-warning {
    background-color: #ffdd57;
    border-color: transparent;
    color: rgba(0,0,0,.7);
}
</style>