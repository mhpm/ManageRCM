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
            <div v-show="msg != '' && docData.Celula != ''" class="has-text-centered">
                <p v-html="msg" v-bind:class="['tag is-medium']">{{msg}}</p>
            </div>
        </transition><br>
        <div class="columns is-centered">
            <div class="column is-5 is-mobil">
                <div class="field">
                    <p class="control has-icons-left">
                        <input v-model="docData.Celula" class="input is-medium" type="number" placeholder="Celula" disabled>
                        <span class="icon is-small is-left">
                            <icon name="hashtag" />
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input v-model="docData.Lider.nombre" class="input is-medium" type="email" placeholder="Lider">
                        <span class="icon is-small is-left">
                            <icon name="user" />
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input v-model="docData.Supervisor" class="input is-medium" type="text" placeholder="Supervisor">
                        <span class="icon is-small is-left">
                            <icon name="user-circle" />
                        </span>
                    </p>
                </div>
                <div class="field is-grouped is-grouped-centered">
                    <p class="control">
                        <button @click="SaveData" v-bind:class="['button is-success', loadingClass]" :disabled="docData.Celula=='' || docData.Lider.nombre==''">
                            Guardar
                        </button>
                    </p>
                    <p class="control">
                        <router-link to="../Celulas" class="button">
                            Volver
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
        props:['id'],
        data(){
            return{
                msg:'',
                loadingClass:'',
                docData:{
                    Celula:0,
                    Supervisor:'',
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
            this.Loader.Active('Cargando');
        },
        created(){
            console.log(this.id);
            setTimeout(() => {
                this.LoadData()
            }, 1500);
        },
        methods:{
            LoadData(){
                var vm = this;
                vm.API.GetCelulasInfoRef().doc(vm.id).get().then(function(doc) {
                    if(doc.exists){
                        console.log("Document successfully Loaded!");
                        vm.docData = doc.data();
                        vm.Loader.Close()
                    }
                    else{ console.log('Not Document'); vm.Loader.Close()}
                });
            },
            SaveData(){
                var vm = this;
                vm.loadingClass = 'is-loading'
                vm.API.GetCelulasInfoRef().doc(String(vm.id)).set(vm.docData).then(function() {
                    console.log("Document successfully written!");
                    vm.msg = 'Datos Guardados!';
                    vm.loadingClass = ''
                    setTimeout(() => {
                        vm.msg = '';
                    }, 2500);
                });
            }
        }
    }
</script>

<style scoped>

</style>