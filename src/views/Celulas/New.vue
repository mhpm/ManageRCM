<template>
    <div class="new">
        <div class="columns is-centered">
            <div class="column is-5">
                <div class="notification is-primary has-text-centered">
                    <h1 class="title is-1">Nueva Celula</h1>
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
                        <input v-model="celula" class="input is-medium" type="number" placeholder="Celula" v-on:keyup="IdExist(celula)">
                        <span class="icon is-small is-left">
                            <icon name="hashtag" />
                        </span>
                    </p>
                    <p class="help is-danger" v-show="celulaError">Ya existe esta celula en la base de datos</p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input v-model="lider" class="input is-medium" type="text" placeholder="Lider">
                        <span class="icon is-small is-left">
                            <icon name="user" />
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input v-model="supervisor" class="input is-medium" type="text" placeholder="Supervisor">
                        <span class="icon is-small is-left">
                            <icon name="user-circle" />
                        </span>
                    </p>
                </div>
                <!-- <div class="field">
                    <p class="control has-icons-left">
                        <input v-model="sector" class="input is-medium" type="number" placeholder="Sector">
                        <span class="icon is-small is-left">
                            <icon name="hashtag" />
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input v-model="subsector" class="input is-medium" type="number" placeholder="Subsector">
                        <span class="icon is-small is-left">
                            <icon name="hashtag" />
                        </span>
                    </p>
                </div> -->

                <div class="field is-grouped is-grouped-centered">
                    <p class="control">
                        <button @click="SaveData" class="button is-success" :disabled="celula=='' || lider=='' || supervisor=='' || celulaError">
                            Agregar
                        </button>
                    </p>
                    <p class="control">
                        <router-link to="Celulas" class="button">
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
        data(){
            return{
                celulaError:false,
                msg:'',
                celula:'',
                lider:'',
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
        mounted(){
            this.Loader = this.$refs.pageloader;
            this.API = this.$refs.api;
        },
        methods:{
            SaveData(){
                var vm = this;
                vm.Loader.Active('Guardando');
                vm.docData.Lider.nombre = vm.lider;
                vm.docData.Celula = parseInt(vm.celula);
                // vm.docData.Sector = parseInt(vm.sector);
                // vm.docData.SubSector = parseInt(vm.subsector);
                vm.docData.Supervisor = vm.supervisor;
                vm.API.GetCelulasInfoRef().doc().set(vm.docData).then(function() {
                    console.log("Document successfully written!");
                    vm.msg = 'Datos Guardados!';
                    setTimeout(() => {
                        vm.msg = '';
                    }, 2500);
                    vm.CleanForm();
                    vm.Loader.Close()
                });
            },
            IdExist(id){
                var vm = this
                if(id != '' && id != null){
                    vm.API.GetCelulasInfoRef().doc(String(id)).get().then(function(doc) {
                            if(doc.exists)
                                vm.celulaError = true;    
                            else
                                vm.celulaError = false;
                    });
                }else
                    vm.celulaError = false;
            },
            CleanForm(){
                this.celula = '';
                this.lider = '';
                this.supervisor = '';
                // this.sector = '';
                // this.subsector = '';
            }
        }
    }
</script>

<style scoped>

</style>