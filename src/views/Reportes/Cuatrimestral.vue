<template>
    <div class="profile">
        <div class="columns is-centered">
            <div class="column is-6">
                <div class="notification is-primary has-text-centered">
                    <h1 class="title is-3">Metas Cuatrimestre: {{cuatrimestre}}</h1>
                </div>
                <div class="field has-addons has-addons-centered">
                    <p class="control has-icons-left">
                        <input class="input" v-model="celula" type="number" placeholder="Celula" v-on:keyup="Keymonitor">
                        <span class="icon is-left"><i class="fab fa-slack"></i></span>
                    </p>
                    <p class="control">
                        <button :disabled="celula == ''" @click="CelulaExist" class="button is-primary">Cargar</button>
                    </p>
                </div>
                <app-alert :msg="msg" :msgDesc="msgDesc" v-show="msg != '' && celula != ''" />
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column">       
                <form v-show="formShow && celula != ''" v-on:submit.prevent="SaveData">
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <p class="title is-3 is-spaced">Datos Generales</p>
                                <p class="subtitle is-5">Célula</p>
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Celula" type="number" placeholder="Número" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required />
                                    <span class="icon is-small is-left">
                                        <icon name="hashtag" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <p class="title is-3 is-spaced">&nbsp;</p>
                                <p class="subtitle is-5">Clasificación del Grupo</p>
                                <div class="control has-icons-left">
                                    <div class="select">
                                        <select v-model="docData.Cgrupo">
                                            <option>Mixto</option>
                                            <option>Mujeres</option>
                                            <option>Hombres</option>
                                            <option>Jovenes</option>
                                        </select>
                                    </div>
                                    <span class="icon is-small is-left">
                                        <icon name="users" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <p class="subtitle is-5">Líder</p>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Lider.nombre" type="text" placeholder="Nombre completo" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="user" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Lider.telefono" type="number" placeholder="Teléfono" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="phone" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Lider.email" type="text" placeholder="Email">
                                    <span class="icon is-small is-left">
                                        <icon name="envelope" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">     
                                    <Datepicker v-model="docData.Lider.fecha" :format="customFormatter"></Datepicker>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <p class="subtitle is-5">Asistente</p>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Asistente.nombre" type="text" placeholder="Nombre completo" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="user" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Asistente.telefono" type="number" placeholder="Teléfono" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="phone" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Asistente.email" type="text" placeholder="Email">
                                    <span class="icon is-small is-left">
                                        <icon name="envelope" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <Datepicker v-model="docData.Asistente.fecha" :format="customFormatter"></Datepicker>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <p class="title is-3 is-spaced">Reuniones</p>
                            <p class="subtitle is-5">Planeación</p>
                            <div class="field">
                                <label class="laber">Día de reunión</label><br>
                                <div class="control has-icons-left">
                                    <div class="select is-medium">
                                    <select v-model="docData.Planeacion.dia">
                                        <option v-for="(dia, index) in Dias" :key="index">{{dia}}</option>
                                    </select>
                                    <span class="icon is-small is-left">
                                        <icon name="calendar" />
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Planeacion.hora" type="text" placeholder="Hora" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="clock-o" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Planeacion.anfitrion" type="text" placeholder="Nombre Anfitrión" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="user" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Planeacion.telAnfitrion" type="number" placeholder="Tel Anfitrión" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="phone" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Planeacion.direccion" type="text" placeholder="Dirección" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="map-marker" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Planeacion.referencia" type="text" placeholder="Referencia" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="map-signs" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <p class="title is-3 is-spaced">&nbsp;</p>
                            <p class="subtitle is-5">Alcance</p>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <label class="laber">Día de reunión</label><br>
                                    <div class="select is-medium">
                                    <select v-model="docData.Alcance.dia">
                                        <option v-for="(dia, index) in Dias" :key="index">{{dia}}</option>
                                    </select>
                                    <span class="icon is-small is-left">
                                        <icon name="calendar" />
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Alcance.hora" type="text" placeholder="Hora" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="clock-o" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Alcance.anfitrion" type="text" placeholder="Nombre Anfitrión" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="user" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Alcance.telAnfitrion" type="number" placeholder="Tel Anfitrión" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="phone" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Alcance.direccion" type="text" placeholder="Dirección" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="map-marker" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Alcance.referencia" type="text" placeholder="Referencia" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="map-signs" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-4">
                            <p class="title is-4 is-spaced">Metas de Asistencia</p>
                            <div class="field"><input id="ce" v-model="bautizados" type="checkbox" name="ce" class="is-checkradio is-rtl"> <label  for="ce" class="label">Llevas Metas de bautismos? </label></div>
                            <div v-show="bautizados">
                                <div class="field">
                                    <div class="control has-icons-left">
                                        <input class="input is-medium" v-model="docData.Metas.planeacion" type="number" placeholder="Reunión de Planeación" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                            oninput="setCustomValidity('')">
                                        <span class="icon is-small is-left">
                                            <icon name="hashtag" />
                                        </span>
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="control has-icons-left">
                                        <input class="input is-medium" v-model="docData.Metas.alcance" type="number" placeholder="Reunión de Alcance" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                            oninput="setCustomValidity('')" >
                                        <span class="icon is-small is-left">
                                        <icon name="hashtag" />
                                        </span>
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="control has-icons-left">
                                        <input class="input is-medium" v-model="docData.Metas.miercoles" type="number" placeholder="Culto Miércoles" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                            oninput="setCustomValidity('')" >
                                        <span class="icon is-small is-left">
                                            <icon name="hashtag" />
                                        </span>
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="control has-icons-left">
                                        <input class="input is-medium" v-model="docData.Metas.domingo" type="number" placeholder="Culto Domingo" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                            oninput="setCustomValidity('')" >
                                        <span class="icon is-small is-left">
                                            <icon name="hashtag" />
                                        </span>
                                    </div>
                                </div>
                            </div><br/>
                            <p class="subtitle is-4">Amigos</p>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Metas.amigosA" type="number" placeholder="Anotados" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="hashtag" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Metas.amigosR" type="number" placeholder="Reunión de Alcance" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="hashtag" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Metas.amigosF" type="number" placeholder="Fiesta del Amigo" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="hashtag" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Metas.amigosE" type="number" placeholder="Encuentro" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="hashtag" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" v-model="docData.Metas.bautismos" type="number" placeholder="Bautismos" oninvalid="this.setCustomValidity('Campos Obligatorios')"
                                        oninput="setCustomValidity('')" required>
                                    <span class="icon is-small is-left">
                                        <icon name="hashtag" />
                                    </span>
                                </div>
                            </div><br>
                        </div>
                        <div class="column is-9">
                            <div class="columns">
                                <div class="column" v-if="docData.Metas.planeacion > 0 && bautizados">     
                                    <p class="title is-spaced">Miembros: {{docData.Miembros.length}}</p>
                                    <p class="subtitle is-6">Comprometidos en el Ciclo</p>
                                    <div class="columns">
                                        <div class="column">
                                            <div class="field">
                                                <div class="control">
                                                    <input type="text" v-model="Miembro.nombre" placeholder="Nombre Completo" class="input is-normal">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="column">
                                            <div class="field">
                                                <div class="control">
                                                    <input type="text" v-model="Miembro.bautismo" placeholder="Fecha Bautismo" class="input is-normal">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="column">
                                            <div class="field">
                                                <div class="control">
                                                    <input type="text" v-model="Miembro.estadoCivil" placeholder="Estado Civil" class="input is-normal">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="column">
                                            <div class="field">
                                                <div class="control">
                                                    <input type="checkbox" v-model="Miembro.espirituSanto"> Espíritu Santo
                                                </div>
                                            </div>
                                        </div>
                                        <div class="column">
                                            <div class="field">
                                                <div class="control">
                                                    <input type="text" v-model="Miembro.direccion" placeholder="Dirección" class="input is-normal">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="column">
                                            <div class="field">
                                                <div class="control">
                                                    <input type="number" v-model="Miembro.telefono" placeholder="Teléfono" class="input is-normal">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="column">
                                            <a class="button is-success" v-on:click="AddRow(Miembro, docData.Miembros)" v-if="Miembro.nombre != ''">Agregar</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div  v-for="(m, index) in docData.Miembros" v-bind:key="index">
                                <div class="columns colorcolumn">
                                    <div class="column">
                                        <div class="field">
                                            <div class="control">
                                                <input type="text" v-model="m.nombre" placeholder="Nombre Completo" class="input is-normal">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="field">
                                            <div class="control">
                                                <input type="text" v-model="m.bautismo" placeholder="Fecha Bautismo" class="input is-normal">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="field">
                                            <div class="control">
                                                <input type="text" v-model="m.estadoCivil" placeholder="Estado Civil" class="input is-normal">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="field">
                                            <div class="control">
                                                <input type="checkbox" v-model="m.espirituSanto"> Espiritu Santo
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="field">
                                            <div class="control">
                                                <input type="text" v-model="m.direccion" placeholder="Direccion" class="input is-normal">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="field">
                                            <div class="control">
                                                <input type="number" v-model="m.telefono" placeholder="Telefono" class="input is-normal">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <a class="button is-danger" v-on:click="removeRow(index, docData.Miembros)">Quitar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                                <div class="notification is-warning" v-if="docData.Miembros.length < docData.Metas.planeacion">
                                    <p class="title has-text-centered">No olvides registrar tus miembros comprometidos</p>
                                </div>
                                <div class="columns is-centered">
                                    <div class="column is-5">
                                        <app-alert :msg="saveStatus" :msgDesc="msgDesc" v-show="saveStatus != ''" />
                                    </div>
                                </div>
                            <div class="field is-grouped is-grouped-centered">
                                <div class="control">
                                    <button v-bind:class="['button is-primary', loadingClass ]" type="submit" value="Guardar" :disabled="docData.Miembros.length < docData.Metas.planeacion">
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <app-api ref="api" />
        <app-pageloader ref="pageloader" />
    </div>
</template>

<script>
// import DateFormat from 'dateformat'
import dateHelper from '../../mixins/DateHelper'
import moment from 'moment'
import Datepicker from 'vuejs-datepicker';
    export default {
        mixins:[dateHelper],
        components: {
            Datepicker
        },
        data(){
            return{
                bautizados: false,
                msg:'',
                msgDesc:'',
                saveStatus:'',
                formShow:false,
                celula:'',
                loadingClass:'',  
                Dias: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
                Miembro:{
                    nombre:'',
                    bautismo:'',
                    estadoCivil:'',
                    espirituSanto:'',
                    direccion:'',
                    telefono:''
                },
                docData:{
                    Celula:'',
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
                    Miembros:[],
                    Reportes:[],
                    }
                }
            },
            created(){
                $(document).ready(function(){
                    $('.vdp-datepicker div input').addClass('input');
                });
            },
            mounted(){
                this.API = this.$refs.api;
                this.Loader = this.$refs.pageloader;
            },
            methods:{
                CelulaExist(){
                    var vm = this;
                    vm.Loader.Active('Cargando Datos');
                    vm.API.GetCelulaRef(vm.celula).get().then(function(doc) {
                         if (doc.exists) {
                                vm.CleanForm()
                                vm.docData.Celula = doc.data().Celula;
                                vm.docData.Lider = doc.data().Lider;
                                vm.docData.Asistente = doc.data().Asistente;
                                vm.docData.Planeacion = doc.data().Planeacion;
                                vm.docData.Alcance = doc.data().Alcance;
                                vm.formShow = true;
                                vm.LoadData()
                            } else {
                                vm.msg = "Celula No Registrada";
                                vm.msgDesc = "Contacta a tu Supervisor de RCM"
                                vm.formShow = false;
                            }
                            vm.Loader.Close()
                    }).catch(function (erro) {
                        console.log('Got Erro CelulaExist');
                        //vm.saveStatus = 'Sin Accesso a internet';
                        console.log(erro);
                        vm.Loader.Close()
                    });
                },
                LoadData(){
                    var vm = this;
                    vm.API.GetMetasCelulaRef(vm.celula, vm.cuatrimestre).get().then(function(doc) {
                        if (doc.exists) {
                                vm.docData.Lider.fecha = vm.customFormatter(vm.docData.Lider.fecha)
                                vm.docData.Asistente.fecha = vm.customFormatter(vm.docData.Asistente.fecha)
                                vm.docData = doc.data();
                            }
                            vm.Loader.Close()
                    }).catch(function (erro) {
                        console.log('Not Metas data');
                        //vm.saveStatus = 'Sin Accesso a internet';
                        console.log(erro);
                        vm.Loader.Close()
                    });
                },
                SaveData(){
                    var vm = this;
                    vm.loadingClass = 'is-loading';
                    vm.docData.Celula = parseInt(vm.celula);
                    vm.docData.Lider.fecha = vm.customFormatter(vm.docData.Lider.fecha)
                    vm.docData.Asistente.fecha = vm.customFormatter(vm.docData.Asistente.fecha)
                    vm.API.GetMetasCelulaRef(vm.celula, vm.cuatrimestre).set(this.docData).then(function () {
                        vm.saveStatus = 'Reporte Guardado!';
                        vm.loadingClass = '';
                        setTimeout(() => {
                            vm.saveStatus = '';    
                        }, 1500);
                    }).catch(function (erro) {
                        console.log(erro);
                        vm.saveStatus = 'Sin Accesso a internet';
                        vm.loadingClass = '';
                    });
                },
                AddRow(m, list) {
                    list.push({nombre: m.nombre, bautismo: m.bautismo, estadoCivil: m.estadoCivil, espirituSanto: m.espirituSanto, direccion: m.direccion, telefono: m.telefono});
                    this.clearMiembro()
                },
                removeRow(index, list) {
                    list.splice(index, 1);
                },
                clearMiembro(){
                    this.Miembro.nombre = '';
                    this.Miembro.bautismo = '';
                    this.Miembro.estadoCivil = '';
                    this.Miembro.espirituSanto = false;
                    this.Miembro.direccion = '';
                    this.Miembro.telefono = '';
                },
                CleanForm(){
                    this.msg = '';
                    this.clearMiembro();
                    this.docData = {
                        Celula:'',
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
                        Miembros:[],
                        Reportes:[]
                    }
                },
                 Keymonitor(){
                    if(this.celula == ''){
                        this.CleanForm()
                        this.formShow = false;
                        }
                },
                customFormatter(date) {
                    moment.locale('es');
                    return moment(date).format('DD/MM/YYYY');
                }
            }
    }
</script>

<style scoped>
.colorcolumn {
    background: #f2f2f2;
    border-radius: 3px;
    margin-bottom: 15px;
}
.button.is-danger {
    background-color: #ff3860;
    border-color: transparent;
    color: #fff;
}
</style>