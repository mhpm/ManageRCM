<template>
    <div>

    </div>
</template>

<script>
const firebase = require('../firebaseInit')
import dateHelper from '../mixins/DateHelper'
    export default {
        mixins:[dateHelper],
        data(){
            return{
                IglesiaRef:'',
                CelulasInfRef:'',
                CicloRef:'',
                CuatrimestreRef:'',
                SemanaRef:'',
            }
        },
        created(){
            this.DataBaseRef()
        },
        methods:{
            DataBaseRef(){
                var vm = this;
                vm.IglesiaRef = firebase.iglesiasCollection.doc(firebase.currentUser.email);
                vm.CicloRef = vm.IglesiaRef.collection('Ciclos').doc(String(vm.date.getFullYear()));
                vm.CuatrimestreRef = vm.CicloRef.collection('Cuatrimestres').doc(vm.cuatrimestre);
                vm.SemanaRef = vm.CuatrimestreRef.collection('ReportesSemana').doc(vm.week);
            },
            GetCelulasInfoRef(){
                return this.IglesiaRef.collection('Celulas');
            },
            GetSectoresRef(){
                return this.IglesiaRef.collection('Sectores');
            },
            GetSubSectoresRef(){
                return this.IglesiaRef.collection('SubSectores');
            },
            GetCelulaRef(celula){
                var celsRef = this.GetCelulasInfoRef();
                return celsRef.doc(celula);
            },
            GetCuatrimestreRef(quart){
                return this.CicloRef.collection('Cuatrimestres').doc(quart);
            },
            GetQuatAmigosCelulasRef(quart){
                return this.GetCuatrimestreRef(quart).collection('AmigosCelula');

            },
            GetSemanaRef(week){
                return this.CuatrimestreRef.collection('ReportesSemana').doc(week);
            },
            GetQuatWeekCelsRef(quat, week){
                var quatRef = this.GetCuatrimestreRef(quat);
                return quatRef.collection('ReportesSemana').doc(week).collection('Celulas');
            },
            GetQuatWeekCelulaRef(quat, week, celula){
                var quatRef = this.GetCuatrimestreRef(quat);
                quatRef.collection('ReportesSemana').doc(week).collection('Celulas').where("Celula", "==", celula).get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                // doc.data() is never undefined for query doc snapshots
                                console.log(doc.id, " => ", doc.data());
                            });
                        })
                        .catch(function(error) {
                            console.log("Error getting documents: ", error);
                        });
            },
            GetSemCelRef(week, celula){
                var weekRef = this.GetSemanaRef(week);
                return weekRef.collection('Celulas').doc(celula);
            },
            GetMetasCelulaRef(celula, quat){
                return this.GetCuatrimestreRef(quat).collection('MetasCelula').doc(celula);
            },
            GetFriendsCelulaRef(celula){
               return this.CuatrimestreRef.collection('AmigosCelula').doc(celula);
            },
            FixBug(){
                var vm = this;
                vm.GetQuatWeekCelsRef('Afirmar', 'Orar').get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        vm.GetQuatWeekCelsRef('1','Bautizar').doc(doc.id).set(doc.data()).then(function() {
                            console.log("Document successfully written!");
                        })
                        .catch(function(error) {
                            console.error("Error writing document: ", error);
                        });  
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
            }
        }
    }
</script>

<style scoped>

</style>