<template>
    <div class="SubSectores" align="center">
        <div class="columns is-centered">
            <div class="column is-8">
                <div class="notification is-primary has-text-centered">
                    <h3 class="title is-2">SubSectores <router-link class="button is-dark" to="SubSectoresNew">Nuevo</router-link></h3> 
                </div>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-5">
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" v-model="filter" type="number" placeholder="filtrar por sector">
                <span class="icon is-left"><i class="fas fa-search"></i></span>
            </p>
        </div>
               <app-alert :msg="'Total SubSectores: ' + SubSectores.length"/>
            </div>
        </div>

        <div class="columns">
            <div class="column is-one-mobile">
                <table class="table is-hoverable">
                    <tr>
                        <th>Sector</th>
                        <th>SubSector</th>
                        <th>Supervisor</th>
                        <th>Sup. Auxiliar</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                    <tr v-for="(subsector, index) in SectorFilter" :key="index">
                        <td>{{subsector.Sector}}</td>
                        <td>{{subsector.SubSector}}</td>
                        <td>{{subsector.Supervisor.Nombre}}</td>
                        <td>{{subsector.Auxiliar.Nombre}}</td>
                        <td>
                            <router-link v-bind:to="'SubSectoresEdit/'+subsector.SubSector" class="button is-warning">
                                <span class="icon is-small">
                                    <i class="fas fa-edit"></i>
                                </span>
                            </router-link>
                        </td>
                        <td>
                            <a @click="Delete(subsector.SubSector)" class="button is-danger">
                                <span class="icon is-small">
                                    <i class="fas fa-trash"></i>
                                </span>
                            </a>
                        </td>
                    </tr>
                </table>
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
                filter:'',
                SubSectores:[]
            }
        },
        created(){
            setTimeout(() => {
                this.LoadData()
            }, 1500);

            //fuction for accordion
            $(document).ready(function () {
                const MOUSE_EVENTS = ['click', 'touchstart'];
                var accordions = document.querySelectorAll('.accordions');
                [].forEach.call(accordions, function(accordion) {
                    var items = accordion.querySelectorAll('.accordion');
                    [].forEach.call(items, function(item) {
                    MOUSE_EVENTS.forEach((event) => {
                        item.querySelector('.toggle, [data-action="toggle"]').addEventListener(event, e => {
                        e.preventDefault();
                        if (!item.classList.contains('is-active')) {
                            let activeItem = accordion.querySelector('.accordion.is-active');
                            if (activeItem) {
                            activeItem.classList.remove('is-active');
                            }
                            item.classList.add('is-active');
                        } else {
                            item.classList.remove('is-active');
                        }
                        });
                    });
                    });
                });
            });
        },
        mounted(){
            this.API = this.$refs.api;
            this.Loader = this.$refs.pageloader;
            this.Loader.Active('Cargando Datos');
        },
        methods:{
            LoadData(){
                var vm = this;
                vm.SubSectores=[]
                vm.API.GetSubSectoresRef().orderBy("Sector", 'asc').get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                            vm.SubSectores.push(doc.data());
                    });
                    vm.Loader.Close();
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
            },
            Delete(id){
                var vm = this;
                if(confirm("Seguro Quieres eliminar este Subsector?")){ 
                    vm.Loader.Active('Eliminando');
                    vm.API.GetSubSectoresRef().doc(String(id)).delete().then(function() {
                        console.log("Document successfully deleted!");
                        vm.LoadData()
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    })
                }
            }
        },
        computed:{
            SectorFilter(){
                var vm = this;
                if(vm.filter != ''){
                    return vm.SubSectores.filter(item =>{
                        return item.Sector == vm.filter; 
                    })
                }else
                    return vm.SubSectores;
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

.accordions .accordion .accordion-header {
    height: 40px;
}

.accordions .is-active .accordion-header {
    background-color:#6abfb0 !important;
}

.accordions .accordion .accordion-header+.accordion-body{
    background-color: #fff;
}

.column {
        margin: auto;
    }
</style>