<template>
    <div id="Semanal">
            <div class="columns">
                <div class="column is-5">
                    <div class="notification is-primary has-text-centered">
                        <h1 class="title is-3">Cuatrimestre: {{cuatrimestre}}</h1>
                        <h3 class="subtitle">Semana: {{week}}</h3>
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
                            <span class="select is-primary">
                                <select v-model="docData.Verbo" v-on:change="onChange">
                                    <option v-for="(verbo, index) in verbos" :key="index">{{verbo}}</option>
                                </select>
                            </span>
                        </p>
                        <p class="control">
                            <label class="laber">Celula</label><br>
                            <input class="input" v-model="celula" v-on:keyup="keymonitor" type="number" placeholder="# Celula" />
                        </p>
                        <p class="control">
                            <br>
                            <button :disabled="celula == ''" @click="CelulaExist" v-bind:class="['button is-primary', loadingClass]">Cargar</button>
                        </p>
                    </div>

                    <app-alert :msg="msg" :msgDesc="msgDesc" v-show="msg != '' && celula != ''" />

                    <transition enter-active-class="animated fadeIn">
                        <section v-show="showReport && celula != ''" class="accordions">
                            
                            <article class="accordion is-active">
                                <div class="accordion-header toggle">
                                    <p>Reunión de Planeación</p>
                                    <check-icon :Show="docData.formCheck.check1"/>
                                </div>
                                <div class="accordion-body">
                                    <div class="accordion-content">
                                        <form id="RP">
                                            <div class="field">
                                                <label class="label">Miembros Asistentes</label>
                                                <div class="control">
                                                    <input class="input" v-model="docData.RP.MA" type="number" placeholder="Miembros Asistentes" required>
                                                </div>
                                            </div>
                                            <div class="field">
                                                <label class="label">Miembros Faltantes</label>
                                                <div class="control">
                                                    <input class="input" v-model="docData.RP.MF" type="number" placeholder="Miembros Faltantes" required>
                                                </div>
                                            </div>
                                            <div class="field">
                                                <input id="ce" v-model="docData.RP.CE" type="checkbox" name="ce" class="is-checkradio is-rtl" >
                                                <label class="label" for="ce">Capacitacion al Equipo</label>
                                            </div>
                                            <div class="field">
                                                <input id="pae" v-model="docData.RP.AP" type="checkbox" name="pae" class="is-checkradio is-rtl">
                                                <label class="label" for="pae">Planeacíon de Atención Pers.</label>
                                            </div>
                                            <div class="field is-grouped is-grouped-centered">
                                                <p class="control">
                                                    <a class="submit button is-primary" @click="SaveData('check1')">
                                                        <check-icon :Show="BtnCheck.check1" :btnText="'Guardar'"/>
                                                    </a>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </article>

                            <article class="accordion">
                                <div class="accordion-header toggle">
                                    <p>Atención Pers. y Celebración</p>
                                    <check-icon :Show="docData.formCheck.check2"/>
                                </div>
                                <div class="accordion-body">
                                    <div class="accordion-content">
                                        <form id="APC">
                                            <div class="field">
                                                <label class="label">Visitas Hnos. Bautizados</label>
                                                <div class="control">
                                                    <input type="number" v-model="docData.APC.VHB" class="input" placeholder="Visitas Hnos. Bautizados">
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <label class="label">Atención Personalizada</label>
                                                    <input type="number" v-model="docData.APC.AP" class="input" placeholder="Atencion Personalizada">
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <label for="" class="label">Hnos. Bautizados a Celebración</label>
                                                    <input type="number" v-model="docData.APC.HBC" class="input" placeholder="Hnos. Bautizados a Celebración">
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <label for="" class="label">Hnos N/B a Celebración</label>
                                                    <input type="number" v-model="docData.APC.HNBC" class="input" placeholder="Hnos N/B a Celebración">
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <label for="" class="label">Amigos a Celebración</label>
                                                    <input type="number" v-model="docData.APC.AC" class="input" placeholder="Amigos a Celebración">
                                                </div>
                                            </div>
                                            <div class="field is-grouped is-grouped-centered">
                                                <p class="control">
                                                    <a class="button is-primary" @click="SaveData('check2')">
                                                        <check-icon :Show="BtnCheck.check2" :btnText="'Guardar'"/>
                                                    </a>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </article>

                            <article class="accordion">
                                <div class="accordion-header toggle">
                                    <p>Reunión de Alcance</p>
                                    <check-icon :Show="docData.formCheck.check3"/>
                                </div>
                                <div class="accordion-body">
                                    <div class="accordion-content">
                                        <form id="RA">
                                            <div class="field">
                                                <div class="control">
                                                    <label for="" class="label">Miembros Asistentes</label>
                                                    <input type="number" v-model="docData.RA.MA" class="input" placeholder="Miembros Asistentes">
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <label for="" class="label">Miembros Faltantes</label>
                                                    <input type="number" v-model="docData.RA.MF" class="input" placeholder="Miembros Faltantes">
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <label for="" class="label">Asignación de Privilegios</label>
                                                    <input type="number" v-model="docData.RA.AP" class="input" placeholder="Asignación de Privilegios">
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <label for="" class="label">Amigos Asistentes</label>
                                                    <input type="number" v-model="docData.RA.AA" class="input" placeholder="Amigos Asistentes">
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <label for="" class="label">Hnos N/B</label>
                                                    <input type="number" v-model="docData.RA.HNB" class="input" placeholder="Hnos N/B">
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <label for="" class="label">Ofrendas $</label>
                                                    <input type="number" v-model="docData.RA.O" class="input" placeholder="Ofrendas">
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <label for="" class="label">Observaciones</label>
                                                    <textarea class="textarea" v-model="docData.RA.Obs" placeholder="Observaciones"></textarea>
                                                </div>
                                            </div>
                                            <div class="field is-grouped is-grouped-centered">
                                                <p class="control">
                                                    <a class="button is-primary" @click="SaveData('check3')">
                                                        <check-icon :Show="BtnCheck.check3" :btnText="'Guardar'"/>
                                                    </a>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </article>

                            <article class="accordion">
                                <div class="accordion-header toggle">
                                    <p>Espiritualidad</p>
                                    <check-icon :Show="docData.formCheck.check4"/>
                                </div>
                                <div class="accordion-body">
                                    <div class="accordion-content">
                                        <form id="E">
                                            <label class="label">Lider</label>
                                            <div class="field">
                                                <div class="control">
                                                    <input type="number" v-model="docData.E.L.O" class="input" placeholder="Oracion (Horas)">
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <input type="number" v-model="docData.E.L.L" class="input" placeholder="Lectura Biblica (Capítulos)">
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <input type="number" v-model="docData.E.L.A" class="input" placeholder="Ayunos (Días)">
                                                </div>
                                            </div>
                                            <label class="label">Grupo</label>
                                            <div class="field">
                                                <div class="control">
                                                    <input type="number" v-model="docData.E.G.O" class="input" placeholder="Oracion (Horas)">
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <input type="number" v-model="docData.E.G.L" class="input" placeholder="Lectura Biblica (Capítulos)">
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="control">
                                                    <input type="number" v-model="docData.E.G.A" class="input" placeholder="Ayunos (Días)">
                                                </div>
                                            </div>
                                            <div class="field is-grouped is-grouped-centered">
                                                <p class="control">
                                                    <a class="button is-primary" @click="SaveData('check4')">
                                                        <check-icon :Show="BtnCheck.check4" :btnText="'Guardar'"/>
                                                    </a>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </article>

                        </section>
                    </transition>
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
                isLoading:false,
                showReport:false,
                BtnCheck:{
                    check1:false,
                    check2:false,
                    check3:false,
                    check4:false
                },
                msg:'',
                msgDesc:'',
                loadingClass:'',
                Lider:false,
                celula:'',
                docData:{
                    Celula:0,
                    Lider:'',
                    Verbo:'',
                    Fecha:'',
                    formCheck:{
                        check1:false,
                        check2:false,
                        check3:false,
                        check4:false
                    },
                    RP:{
                        MA:'',
                        MF:'',
                        CE:false,
                        AP:false
                    },
                    APC:{
                        VHB:'',
                        AP:'',
                        HBC:'',
                        HNBC:'',
                        AC:''
                    },
                    RA:{
                        MA:'',
                        MF:'',
                        AP:'',
                        AA:'',
                        HNB:'',
                        O:'',
                        Obs:''
                    },
                    E:{
                        L:{
                            O:'',
                            L:'',
                            A:''
                        },
                        G:{
                            O:'',
                            L:'',
                            A:''
                        }
                    }
                }
            }
        },
        created(){
            var vm = this;
            vm.docData.Verbo = vm.week;
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
            this.pageLoader = this.$refs.pageloader;
            this.API = this.$refs.api;
        },
        methods:{
            LoadData(){
                var vm = this;
                vm.pageLoader.Active('Cargando Datos');
                setTimeout(() => {
                    if(vm.Lider != false){
                        vm.API.GetQuatWeekCelulaRef(vm.cuatrimestre, vm.docData.Verbo, vm.celula).get().then(function(doc) {
                            if (doc.exists) {
                                vm.docData = doc.data();
                            } else {
                                console.log("No such document!");
                                vm.CleanForms();
                            }
                            vm.msgDesc = vm.Lider.nombre;
                            vm.msg = 'Bienvenido';
                            vm.pageLoader.Close()
                            vm.loadingClass = '';
                        }).catch(function(error) {
                            console.log("Error getting document:", error);
                            vm.pageLoader.Close()
                        });
                    }else{ vm.pageLoader.Close() }
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
                        console.log('Sin Metas')
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
                vm.API.GetCelulaRef(vm.celula).get().then(function(doc){
                    if(doc.exists){
                        vm.HasMetas()
                    }else{
                        vm.showReport = false;
                        vm.msg = "Celula No Registrada";
                        vm.msgDesc = "Contacta a tu Supervisor de RCM"
                        vm.loadingClass = '';
                        vm.CleanForms();
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
            },
            SaveData(checkForm){
                var vm = this;
                vm.pageLoader.Active('Guardando');
                vm.docData.Fecha = vm.getDate();
                vm.docData.Celula = parseInt(vm.celula);
                vm.docData.Lider = vm.Lider.nombre;
                vm.docData.formCheck[checkForm] = true;
                vm.API.GetQuatWeekCelulaRef(vm.cuatrimestre, vm.docData.Verbo, vm.celula).set(vm.docData).then(function() {
                    console.log("Document successfully written!");     
                    vm.BtnCheck[checkForm] = true;
                    setTimeout(() => {
                        vm.BtnCheck[checkForm] = false;
                    }, 1500);
                    vm.pageLoader.Close()
                });
            },
            SendData(check){
                this.SaveData(check);
            },
            CleanForms(){
                var vm = this
                vm.docData = {
                    Verbo: vm.docData.Verbo,
                    Celula:0,
                    Lider:'',
                    Fecha:'',
                    formCheck:{
                        check1:false,
                        check2:false,
                        check3:false,
                        check4:false
                    },
                    RP:{
                        MA:'',
                        MF:'',
                        CE:false,
                        AP:false
                    },
                    APC:{
                        VHB:'',
                        AP:'',
                        HBC:'',
                        HNBC:'',
                        AC:''
                    },
                    RA:{
                        MA:'',
                        MF:'',
                        AP:'',
                        AA:'',
                        HNB:'',
                        O:'',
                        Obs:''
                    },
                    E:{
                        L:{
                            O:'',
                            L:'',
                            A:''
                        },
                        G:{
                            O:'',
                            L:'',
                            A:''
                        }
                    }
                }
            },
            formDisplayed(visible, entry) {
                if(!entry.isIntersecting){
                    this.showReport = false;
                    this.msgColor = '';
                }
            },
            onChange(){
                if(this.celula != '')
                    this.LoadData();
            },
            keymonitor(){
                if(this.celula == ''){
                    this.msg = ''
                    this.showReport = false;
                    this.CleanForms()
                }
            }
        }
    }
</script>

<style scoped>
.accordions .accordion .accordion-header {
    height: 60px;
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