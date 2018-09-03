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
                                   <b-table :data="props.row.SubSectores">
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
                                                <a @click="DeleteSub(subs.row.SubSector)" class="button is-small is-light">
                                                    <span class="icon is-small">
                                                        <i class="fas fa-trash fa-sm"></i>
                                                    </span>
                                                </a>
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
        
        <app-pageloader ref="pageloader" />
        <app-api ref="api" />
    </div>
</template>

<script>
    import 'buefy/lib/buefy.css'
    export default {
        data(){
            return{
                Sectores:[],
                SubSectores:[]
            }
        },
        created(){
            setTimeout(() => {
                this.LoadData()
            }, 1500);
            setTimeout(() => {
                this.LoadSubSector()
            }, 3000);
        },
        mounted(){
            this.API = this.$refs.api;
            this.Loader = this.$refs.pageloader;
            this.Loader.Active('Cargando Datos');
        },
        methods:{
            LoadData(){
                var vm = this;
                vm.Sectores=[]
                vm.API.GetSectoresRef().orderBy("Sector", 'asc').get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        let sector = doc.data()
                        vm.Sectores.push(sector);
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                    vm.Loader.Close();
                });
            },
            LoadSubSector(){
               var vm = this
               var subs = [];
               vm.Sectores.forEach((sector) => {
                   sector.SubSectores = [];
                    vm.API.GetSubSectoresRef().where("Sector", "==", String(sector.Sector)).get().then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            let subsector = doc.data();
                            subsector.id = doc.id;
                            sector.SubSectores.push(subsector)
                        });
                        vm.Loader.Close();
                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                        vm.Loader.Close();
                    });
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
                            //vm.LoadData()
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
                        vm.Loader.Active('Eliminando');
                        vm.API.GetSubSectoresRef().doc(String(id)).delete().then(function() {
                            console.log("Document successfully deleted!");
                            //vm.LoadData()
                            vm.Loader.Close();
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