<template>
    <div>
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-6">
                    <div class="notification is-primary has-text-centered">
                       <h1 class="title is-3">Cuatrimestre: {{cuatrimestre}}</h1>
                    <h3 class="subtitle">Amigos Anotados</h3>
                    </div>
                </div>
            </div>

            <div class="columns is-centered">
                <div class="column is-6">
                    <div class="field has-addons has-addons-centered">
                        <p class="control has-icons-left">
                            <input class="input" v-model="celula" type="number" placeholder="Celula" v-on:keyup="Keymonitor">
                            <span class="icon is-left"><i class="fab fa-slack"></i></span>
                        </p>
                        <p class="control">
                            <button :disabled="celula == ''" @click="CelulaExist" v-bind:class="['button is-primary', loadingClass]">Cargar</button>
                        </p>
                    </div>

                     <app-alert :msg="msg" :msgDesc="msgDesc" v-show="msg != '' && celula != ''" />
                </div>
            </div>
            <div class="columns is-centered">
                <div class="column is-6">
                    <form v-show="showReport && celula != ''" v-on:submit.prevent>
                        <div class="columns">
                            <div class="column">
                                <h5 class="title is-5">Padre Espiritual</h5>
                                <div class="field has-addons">
                                    <div class="control">
                                        <input class="input" v-model="padre" type="text" placeholder="Nombre del padre">
                                    </div>
                                    <div class="control">
                                        <a class="button is-primary is-normal" v-on:click="AddPadre(padre)" :disabled="padre == ''">Agregar</a>
                                    </div>
                                </div>
                                <div class="field">
                                    <table class="table is-fullwidth">
                                        <tr>
                                            <th><h5 class="title is-5">Padres: {{docData.Padres.length}}</h5></th>
                                            <th><h5 class="title is-5">Hijos: {{docData.TotalHijos}}</h5></th>
                                        </tr>
                                        <tr v-for="(p, index) in docData.Padres" :key="index">
                                            <td>
                                                <label class="label">{{p.nombre}}</label>
                                                <table class="table">
                                                    <tr>
                                                        <div class="field has-addons">
                                                            <div class="control">
                                                                <input class="input is-small" v-model="p.hijo" type="text" placeholder="Nombre de Hijo">
                                                            </div>
                                                            <div class="control">
                                                                <button class="button is-small is-primary" v-on:click="AddHijo(p.hijo, p.hijos)" :disabled="p.hijo == ''">
                                                                    Agregar
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </tr>
                                                    <tr v-for="(h, index) in p.hijos" :key="index">
                                                        <td><span>{{h.nombre}}</span></td>
                                                        <td>
                                                            <button class="button is-danger is-small" v-on:click="removeRow(index, p.hijos)">
                                                                <span class="icon is-small"><i class="fas fa-trash"></i></span>
                                                           </button>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td>
                                                <button class="button is-danger is-small" v-on:click="removeRow(index, docData.Padres)">
                                                    <span class="icon is-small"><i class="fas fa-trash"></i></span>
                                                </button>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="columns is-centered">
                            <div class="column is-6">
                                <app-alert :msg="saveStatus" v-show="saveStatus != ''" />
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <div class="field is-grouped is-grouped-centered">
                                    <div class="control">
                                        <button @click="SaveData" v-bind:class="['button is-primary is-medium', loadingClass ]">Guardar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <app-api ref="api" />
        <app-pageloader ref="loader"/>
    </div>
</template>

<script>
import dateHelper from '@/mixins/DateHelper'
    export default {
        mixins:[dateHelper],
        data(){
            return{
                msg:'',
                msgDesc:'',
                saveStatus:'',
                showReport:false,
                loadingClass: false,
                celula:'',
                Lider:{},
                padre:'',
                docData:{
                    Padres:[],
                    TotalHijos:0,
                    TotalPadres:0,
                    Lider:''
                }
            }
        },
        created(){
        },
        mounted(){
            this.API = this.$refs.api;
            this.Loader = this.$refs.loader;
        },
        methods:{
            LoadData(){
                var vm = this;
                vm.Loader.Active('Cargando Datos');
                setTimeout(() => {
                    if(vm.Lider != false){
                        vm.API.GetFriendsCelulaRef(vm.celula).get().then(function(doc) {
                            if (doc.exists) {
                                vm.docData = doc.data();
                                vm.TotalHijos()
                            } else {
                                console.log("No such document!");
                            }
                            vm.msgDesc = vm.Lider.nombre;
                            vm.docData.Lider = vm.Lider.nombre;
                            vm.msg = 'Bienvenido';
                            vm.Loader.Close()
                            vm.loadingClass = '';
                            vm.$message('Reporte listo');
                        }).catch(function(error) {
                            console.log("Error getting document:", error);
                            vm.Loader.Close()
                        });
                    }else{ vm.Loader.Close() }
                }, 3000);
            },
            HasMetas(){
                var vm = this;
                vm.API.GetMetasCelulaRef(vm.celula, vm.cuatrimestre).get().then(function(doc){
                    if(doc.exists){
                        vm.Lider = doc.data().Lider;
                        vm.showReport = true;
                        vm.LoadData()
                    }else{
                        vm.showReport = false;
                        vm.msg = "Celula Sin Metas";
                        vm.msgDesc = 'Debes Capturar tu Reporte Cuatrimestral'
                        vm.loadingClass = '';
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
            },
            CelulaExist(){
                // Chech if Celula exist in database (if not must be added by Admin)
                var vm = this;
                vm.loadingClass = 'is-loading';
                vm.Lider = false;
                vm.CleanReport()
                vm.msg = ''
                vm.API.GetCelulaRef(vm.celula).get().then(function(doc){
                    if(doc.exists){
                        vm.HasMetas()
                    }else{
                        vm.showReport = false;
                        vm.msg = "Celula No Registrada";
                        vm.msgDesc = "Contacta a tu Supervisor de RCM"
                        vm.loadingClass = '';
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
            },
            SaveData(){
                var vm = this;
                vm.loadingClass = 'is-loading';
                vm.docData.Celula = parseInt(vm.celula);
                vm.docData.TotalPadres = vm.docData.Padres.length;
                vm.API.GetFriendsCelulaRef(vm.celula).set(vm.docData).then(function() {
                    vm.saveStatus = 'Reporte Guardado'
                    setTimeout(() => {
                        vm.saveStatus = ''
                    }, 2000);
                    vm.loadingClass = '';
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                    vm.saveStatus = 'Imposible guardar, Sin Acceso a Internet'
                    vm.loadingClass = '';
                });
            },
            AddPadre(name) {
                this.docData.Padres.push({nombre: name, hijo:'', hijos:[]});
                this.padre = '';
            },
            AddHijo(name, list){
                list.push({nombre: name});
                this.TotalHijos()
                this.CleanHijo()
            },
            removeRow(row, list) {
                list.splice(row,1);
                this.TotalHijos()
            },
            CleanHijo(){
                for (let i = 0; i < this.docData.Padres.length; i++)
                    this.docData.Padres[i].hijo = '';

            },
            TotalHijos(){
                this.docData.TotalHijos = 0;
                for (let i = 0; i < this.docData.Padres.length; i++)
                    this.docData.TotalHijos += this.docData.Padres[i].hijos.length
            },
            CleanReport(){
                this.docData = { Padres:[], TotalHijos:0, TotalPadres:0}
            },
            Keymonitor(){
                if(this.celula == ''){
                    this.msg = ''
                    this.showReport = false;
                    this.CleanHijo();
                    this.CleanReport()
                }
            }
        }
    }
</script>

<style scoped>

</style>