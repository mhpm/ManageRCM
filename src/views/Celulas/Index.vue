<template>
    <div class="celulas" align="center">
        <div class="columns is-centered">
            <div class="column is-6">
                <div class="notification is-primary has-text-centered">
                    <h1 class="title is-1">Celulas <router-link class="button is-dark" to="CelulasNew">Nueva</router-link></h1>
                </div>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-4">
                 <app-alert :msg="'Total Celulas: ' + Celulas.length"/>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <table class="table is-hoverable">
                    <tr>
                        <th>Celula</th>
                        <th>Lider</th>
                        <th>Supervisor</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                    <tr v-for="(celula, index) in Celulas" :key="index">
                        <td>{{celula.Celula}}</td>
                        <td>{{celula.Lider.nombre}}</td>
                        <td>{{celula.Supervisor}}</td>
                        <td>
                            <router-link v-bind:to="'CelulasEdit/'+celula.id" class="button is-warning">
                                <span class="icon is-small">
                                    <i class="fas fa-edit"></i>
                                </span>
                            </router-link>
                        </td>
                        <td>
                            <a @click="Delete(celula)" class="button is-danger">
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
                user:'',
                celula:'',
                lider:'',
                supervisor:'',
                Celulas:[],
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
                var vm = this;
                vm.API.GetCelulasInfoRef().orderBy("Celula", 'asc').get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                            let celula = doc.data();
                            celula.id = doc.id;               
                            vm.Celulas.push(celula);
                    });
                    vm.Loader.Close();
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
            },
            Delete(celula){
                var vm = this;
                vm.$dialog.confirm({
                    title:'Alerta',
                    message: `'Estas seguro de <b>Borrar</b> la Celula ${celula.Celula}?'`,
                    type: 'is-danger',
                    confirmText: 'Borrar',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    onConfirm: () => {
                        vm.API.GetCelulasInfoRef().doc(String(celula.id)).delete().then(function() {
                            console.log("Document successfully deleted!");
                            vm.Loader.Active('Eliminando');
                            vm.Celulas = [];
                            vm.LoadData()
                        }).catch(function(error) {
                            console.error("Error removing document: ", error);
                        })
                    }
                })
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