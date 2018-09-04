<template>
<div id="dashboard"  align="center">
    <div class="columns is-centered">
        <div class="column is-two-thirds">
            <div class="notification is-primary has-text-centered">
                <p class="title is-5">Reporte de Amigos</p>
            </div>
            <div class="field has-addons has-addons-centered">
                <div class="control">
                    <label class="laber">Cuatri.</label><br>
                    <div class="select">
                        <select v-model="cuatrimestre" v-on:change="LoadData">
                            <option v-for="(cuatrimestre, index) in cuatrimestres" :key="index">{{cuatrimestre}}</option>
                        </select>
                    </div>
                </div>
                <p class="control">
                    <br>
                    <button @click="LoadData" v-bind:class="['button is-primary', loadingClass]">Cargar</button>
                </p>
            </div>
        </div>
    </div>
    
    <div class="columns is-centered">
            <div class="column is-4">
                 <app-alert 
                    msg="Totales del Cuatrimestre" 
                    :msgDesc="'Padres: ' + Totales.Padres + ' Hijos: ' + Totales.Hijos"/>
            </div>
        </div>

    <div class="columns is-centered">
        <div class="column is-6">
            <!-- <table align="center" class="table is-bordered is-hoverable">
                <thead>
                    <tr class="is-selected">
                        <th>Celula</th>
                        <th>Lider</th>
                        <th>Padres</th>
                        <th>Hijos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(celula,index) in Celulas" :key="index">
                        <th>{{celula.Celula}}</th>
                        <td>{{celula.Lider}}</td>
                        <td>{{celula.TotalPadres}}</td>
                        <td>{{celula.TotalHijos}}</td>
                    </tr>
                     <tr class="is-selected">
                        <th>Celula</th>
                        <th>Lider</th>
                        <th>Padres</th>
                        <th>Hijos</th>
                    </tr>
                </tbody>
                <tfoot>
                    <th colspan="2" class="has-text-right">Totales:</th>
                    <th>{{Totales.Padres}}</th>
                    <th>{{Totales.Hijos}}</th>
                </tfoot>
            </table> -->

             <b-table
                    :data="Celulas"
                    paginated
                    per-page="7"
                    hoverable
                    narrowed
                    detailed
                    detail-key="Celula"
                >
                    <template slot-scope="Celula">
                        <b-table-column field="Celula" label="Celula" width="40" numeric sortable>
                            {{ Celula.row.Celula }}
                        </b-table-column>

                        <b-table-column field="Lider" label="Lider" sortable>
                            {{ Celula.row.Lider }}
                        </b-table-column>
                        <b-table-column field="Padres" label="Padres" sortable>
                            {{ Celula.row.TotalPadres }}
                        </b-table-column>
                        <b-table-column field="Hijos" label="Hijos" sortable>
                            {{ Celula.row.TotalHijos }}
                        </b-table-column>
                    </template>

                    <template slot="detail" slot-scope="Celula">
                        <article class="media">
                            <div class="media-content">
                                <div class="content">

                                    <ol>
                                        <strong>Padres:</strong>
                                        <li v-for="padre in Celula.row.Padres" :key="padre.index">
                                            {{padre.nombre}}
                                            <ul>
                                                <li style="padding-left:1.7em"><strong>Hijos:</strong></li>
                                                <li style="padding-left:1.7em" v-for="hijo in padre.hijos" :key="hijo.index">
                                                    {{hijo.nombre}}
                                                </li>
                                            </ul>
                                            <hr>
                                        </li>
                                    </ol>

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
    import dateHelper from '../../mixins/DateHelper'
    export default {
        mixins:[dateHelper],
        data(){
            return{
                loadingClass:'',
                Celulas:[],
                Totales:{
                    Padres:0,
                    Hijos:0
                }
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
                vm.loadingClass = 'is-loading';
                vm.CleanData()
                vm.Celulas = [];
                vm.API.GetQuatAmigosCelulasRef(vm.cuatrimestre).orderBy("Celula", 'asc').get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(docParent) {
                         if(docParent.exists){
                             docParent.data().id = docParent.id;
                            vm.Totales.Padres += docParent.data().TotalPadres;
                            vm.Totales.Hijos += docParent.data().TotalHijos;
                            vm.Celulas.push(docParent.data());
                        }
                    });
                    vm.Loader.Close();
                    vm.loadingClass = '';
                }).catch(function(error) {
                    console.log("Error getting documents: ", error);
                    vm.Loader.Close();
                    vm.loadingClass = '';
                });
            },
            CleanData(){
                this.Totales={
                    Padres:0,
                    Hijos:0
                }
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

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

ul li {
}

</style>