<template>
<div id="dashboard">
    <div class="columns is-centered">
        <div class="column is-two-thirds">
            <div class="notification is-primary has-text-centered">
                <p class="title is-5">Reporte de Semana: {{week}}</p>
            </div>
            <div class="field has-addons has-addons-centered">
                <div class="control">
                    <label class="laber">Cuatri.</label><br>
                    <div class="select">
                        <select v-model="cuatrimestre">
                            <option v-for="(cuatrimestre, index) in cuatrimestres" :key="index">{{cuatrimestre}}</option>
                        </select>
                    </div>
                </div>
                <p class="control">
                    <label class="laber">Verbo</label><br>
                    <span class="select">
                        <select v-model="week">
                            <option v-for="(verbo, index) in verbos" :key="index">{{verbo}}</option>
                        </select>
                    </span>
                </p>
                <p class="control">
                    <br>
                    <button @click="LoadData" v-bind:class="['button is-primary', loadingClass]">Cargar</button>
                </p>
            </div>
        </div>
    </div>
    <div class="columns is-centered">
        <div class="column is-4">
            <app-alert :msg="'Total Reportes: ' + Celulas.length"/>
        </div>
    </div>
    <div class="columns is-mobil is-centered">
        <div class="column is-12">
            <table class="table is-bordered is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th colspan="2"></th>
                        <th colspan="4">Reunión de Planeación</th>
                        <th colspan="5">Atención Pers. y Celebración</th>
                        <th colspan="6">Reunión de Alcance</th>
                        <th colspan="3">Esp. Lider</th>
                        <th colspan="3">Esp. Grupo</th>
                    </tr>
                    <tr class="is-selected">
                        <th>Celula</th>
                        <th>Lider</th>
                        <th class="tooltip" data-tooltip="Miembros Asistentes">MA</th>
                        <th class="tooltip" data-tooltip="Miembros Faltantes">MF</th>
                        <th class="tooltip" data-tooltip="Capacitación al Equipo">CE</th>
                        <th class="tooltip" data-tooltip="Planeacíon de Atención Pers.">AP</th>
                        <th class="tooltip" data-tooltip="Visitas a Hnos Bautizados">VHB</th>
                        <th class="tooltip" data-tooltip="Atención Personaliada">AP</th>
                        <th class="tooltip" data-tooltip="Hnos Bautizados a Celebracións">HBC</th>
                        <th class="tooltip" data-tooltip="Hnos No Bautizados a Celebracións">HNBC</th>
                        <th class="tooltip" data-tooltip="Amigos a Celebracións">AC</th>
                        <th class="tooltip" data-tooltip="Miembros Asistentes">MA</th>
                        <th class="tooltip" data-tooltip="Miembros Faltantes">MF</th>
                        <th class="tooltip" data-tooltip="Asignación de Privilegios">AP</th>
                        <th class="tooltip" data-tooltip="Amigos Asistentes">AA</th>
                        <th class="tooltip" data-tooltip="Hnos No Bautizados">HNB</th>
                        <th class="tooltip" data-tooltip="Ofrenda">O</th>
                        <th class="tooltip" data-tooltip="Espiritualidad del Lider: Oración">ELO</th>
                        <th class="tooltip" data-tooltip="Espiritualidad del Lider: Lectura">ELL</th>
                        <th class="tooltip" data-tooltip="Espiritualidad del Lider: Ayunos">ELA</th>
                        <th class="tooltip" data-tooltip="Espiritualidad del Grupo: Oración">EGO</th>
                        <th class="tooltip" data-tooltip="Espiritualidad del Grupo: Lectura">EGL</th>
                        <th class="tooltip" data-tooltip="Espiritualidad del Grupo: Ayunos">EGA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(celula,index) in Celulas" :key="index">
                        <th>{{celula.Celula}}</th>
                        <td class="liderTd">{{celula.Lider}}</td>
                        <td>{{celula.RP.MA}}</td>
                        <td>{{celula.RP.MF}}</td>
                        <td><i v-if="celula.RP.CE" class="fas fa-check"></i></td>
                        <td><i v-if="celula.RP.AP" class="fas fa-check"></i></td>
                        <td>{{celula.APC.VHB}}</td>
                        <td>{{celula.APC.AP}}</td>
                        <td>{{celula.APC.HBC}}</td>
                        <td>{{celula.APC.HNBC}}</td>
                        <td>{{celula.APC.AC}}</td>
                        <td>{{celula.RA.MA}}</td>
                        <td>{{celula.RA.MF}}</td>
                        <td>{{celula.RA.AP}}</td>
                        <td>{{celula.RA.AA}}</td>
                        <td>{{celula.RA.HNB}}</td>
                        <td>${{celula.RA.O}}</td>
                        <td>{{celula.E.L.O}}</td>
                        <td>{{celula.E.L.L}}</td>
                        <td>{{celula.E.L.A}}</td>
                        <td>{{celula.E.G.O}}</td>
                        <td>{{celula.E.G.L}}</td>
                        <td>{{celula.E.G.A}}</td>
                        <td>
                            <a @click="Delete(celula.Celula)" class="button is-small is-danger">
                                <span class="icon is-small"><i class="fas fa-trash"></i></span>
                            </a>
                        </td>
                    </tr>
                     <tr class="is-selected">
                        <th>Celula</th>
                        <th>Lider</th>
                        <th class="tooltip" data-tooltip="Miembros Asistentes">MA</th>
                        <th class="tooltip" data-tooltip="Miembros Faltantes">MF</th>
                        <th class="tooltip" data-tooltip="Capacitación al Equipo">CE</th>
                        <th class="tooltip" data-tooltip="Planeacíon de Atención Pers.">AP</th>
                        <th class="tooltip" data-tooltip="Visitas a Hnos Bautizados">VHB</th>
                        <th class="tooltip" data-tooltip="Atención Personaliada">AP</th>
                        <th class="tooltip" data-tooltip="Hnos Bautizados a Celebracións">HBC</th>
                        <th class="tooltip" data-tooltip="Hnos No Bautizados a Celebracións">HNBC</th>
                        <th class="tooltip" data-tooltip="Amigos a Celebracións">AC</th>
                        <th class="tooltip" data-tooltip="Miembros Asistentes">MA</th>
                        <th class="tooltip" data-tooltip="Miembros Faltantes">MF</th>
                        <th class="tooltip" data-tooltip="Asignación de Privilegios">AP</th>
                        <th class="tooltip" data-tooltip="Amigos Asistentes">AA</th>
                        <th class="tooltip" data-tooltip="Hnos No Bautizados">HNB</th>
                        <th class="tooltip" data-tooltip="Ofrenda">O</th>
                        <th class="tooltip" data-tooltip="Espiritualidad del Lider: Oración">ELO</th>
                        <th class="tooltip" data-tooltip="Espiritualidad del Lider: Lectura">ELL</th>
                        <th class="tooltip" data-tooltip="Espiritualidad del Lider: Ayunos">ELA</th>
                        <th class="tooltip" data-tooltip="Espiritualidad del Grupo: Oración">EGO</th>
                        <th class="tooltip" data-tooltip="Espiritualidad del Grupo: Lectura">EGL</th>
                        <th class="tooltip" data-tooltip="Espiritualidad del Grupo: Ayunos">EGA</th>
                    </tr>
                </tbody>
                <tfoot>
                    <th colspan="2" class="has-text-right">Totales:</th>
                    <th>{{Totales.RP.MA}}</th>
                    <th>{{Totales.RP.MF}}</th>
                    <th>{{Totales.RP.CE}}</th>
                    <th>{{Totales.RP.AP}}</th>
                    <th>{{Totales.APC.VHB}}</th>
                    <th>{{Totales.APC.AP}}</th>
                    <th>{{Totales.APC.HBC}}</th>
                    <th>{{Totales.APC.HNBC}}</th>
                    <th>{{Totales.APC.AC}}</th>
                    <th>{{Totales.RA.MA}}</th>
                    <th>{{Totales.RA.MF}}</th>
                    <th>{{Totales.RA.AP}}</th>
                    <th>{{Totales.RA.AA}}</th>
                    <th>{{Totales.RA.HNB}}</th>
                    <th>${{Totales.RA.O}}</th>
                    <th>{{Totales.E.L.O}}</th>
                    <th>{{Totales.E.L.L}}</th>
                    <th>{{Totales.E.L.A}}</th>
                    <th>{{Totales.E.G.O}}</th>
                    <th>{{Totales.E.G.L}}</th>
                    <th>{{Totales.E.G.A}}</th>
                </tfoot>
            </table>
        </div>
    </div>
    <app-pageloader ref="pageloader" /> 
    <app-api ref="api" />
</div>
</template>

<script>
    import dateHelper from '../mixins/DateHelper'
    export default {
        mixins:[dateHelper],
        data(){
            return{
                loadingClass:'',
                Celulas:[],
                Totales:{
                    RP:{
                        MA:0,
                        MF:0,
                        CE:0,
                        AP:0
                    },
                    APC:{
                        VHB:0,
                        AP:0,
                        HBC:0,
                        HNBC:0,
                        AC:0
                    },
                    RA:{
                        MA:0,
                        MF:0,
                        AP:0,
                        AA:0,
                        HNB:0,
                        O:0
                    },
                    E:{
                        L:{
                            O:0,
                            L:0,
                            A:0
                        },
                        G:{
                            O:0,
                            L:0,
                            A:0
                        }
                    }
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
                vm.CleanTotales()
                vm.Celulas = [];
                vm.API.GetQuatWeekCelsRef(vm.cuatrimestre, vm.week).orderBy("Celula", 'asc').get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        //console.log(doc.id, " => ", doc.data());
                        vm.Celulas.push(doc.data());

                        if(!isNaN(parseInt(doc.data().RP.MA))) vm.Totales.RP.MA += parseInt(doc.data().RP.MA);
                        if(!isNaN(parseInt(doc.data().RP.MF))) vm.Totales.RP.MF += parseInt(doc.data().RP.MF);
                        if(doc.data().RP.CE == true) vm.Totales.RP.CE += 1;
                        if(doc.data().RP.AP == true) vm.Totales.RP.AP += 1;
                        if(!isNaN(parseInt(doc.data().APC.VHB))) vm.Totales.APC.VHB += parseInt(doc.data().APC.VHB);
                        if(!isNaN(parseInt(doc.data().APC.AP))) vm.Totales.APC.AP += parseInt(doc.data().APC.AP);
                        if(!isNaN(parseInt(doc.data().APC.HBC))) vm.Totales.APC.HBC += parseInt(doc.data().APC.HBC);
                        if(!isNaN(parseInt(doc.data().APC.HNBC))) vm.Totales.APC.HNBC += parseInt(doc.data().APC.HNBC);
                        if(!isNaN(parseInt(doc.data().APC.AC))) vm.Totales.APC.AC += parseInt(doc.data().APC.AC);
                        if(!isNaN(parseInt(doc.data().RA.MA))) vm.Totales.RA.MA += parseInt(doc.data().RA.MA);
                        if(!isNaN(parseInt(doc.data().RA.MF))) vm.Totales.RA.MF += parseInt(doc.data().RA.MF);
                        if(!isNaN(parseInt(doc.data().RA.AP))) vm.Totales.RA.AP += parseInt(doc.data().RA.AP);
                        if(!isNaN(parseInt(doc.data().RA.AA))) vm.Totales.RA.AA += parseInt(doc.data().RA.AA);
                        if(!isNaN(parseInt(doc.data().RA.HNB))) vm.Totales.RA.HNB += parseInt(doc.data().RA.HNB);
                        if(!isNaN(parseFloat(doc.data().RA.O))) vm.Totales.RA.O += parseFloat(doc.data().RA.O);

                        if(!isNaN(parseInt(doc.data().E.L.O))) vm.Totales.E.L.O += parseInt(doc.data().E.L.O);
                        if(!isNaN(parseInt(doc.data().E.L.L))) vm.Totales.E.L.L += parseInt(doc.data().E.L.L);
                        if(!isNaN(parseInt(doc.data().E.L.A))) vm.Totales.E.L.A += parseInt(doc.data().E.L.A);
                        if(!isNaN(parseInt(doc.data().E.G.O))) vm.Totales.E.G.O += parseInt(doc.data().E.G.O);
                        if(!isNaN(parseInt(doc.data().E.G.L))) vm.Totales.E.G.L += parseInt(doc.data().E.G.L);
                        if(!isNaN(parseInt(doc.data().E.G.A))) vm.Totales.E.G.A += parseInt(doc.data().E.G.A);
                        
                    });
                    vm.Loader.Close();
                    vm.loadingClass = '';
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                    vm.Loader.Close();
                    vm.loadingClass = '';
                });
            },
            Delete(id){
                var vm = this;
                if(confirm("Seguro quieres eliminar este Reporte?")){ 
                    vm.Loader.Active('Eliminando')
                    vm.API.GetQuatWeekCelulaRef(vm.cuatrimestre, vm.week, String(id)).delete().then(function() {
                        vm.LoadData()
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    })
                }
            },
            CleanTotales(){
                this.Totales = {
                    RP:{
                        MA:0,
                        MF:0,
                        CE:0,
                        AP:0
                    },
                    APC:{
                        VHB:0,
                        AP:0,
                        HBC:0,
                        HNBC:0,
                        AC:0
                    },
                    RA:{
                        MA:0,
                        MF:0,
                        AP:0,
                        AA:0,
                        HNB:0,
                        O:0
                    },
                    E:{
                        L:{
                            O:0,
                            L:0,
                            A:0
                        },
                        G:{
                            O:0,
                            L:0,
                            A:0
                        }
                    }
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

.table {
    table-layout:auto;
}

.table .liderTd{
    width: 100px;
    max-width: 160px; /* add this */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>