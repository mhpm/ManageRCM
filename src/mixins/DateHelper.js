var dateHelper = {
    data() {
      return {
        date: new Date(),
        verbos:['Transicion','Orar', 'Anotar', 'Contactar', 'Confirmar', 'Desatar', 'Llevar', 'Sostener', 'Motivar', 'Afirmar', 'Preparar', 'Santificar', 'Concientizar', 'Conservar', 'Doctrinar', 'Discipular', 'Bautizar'],
        cuatrimestres:['1', '2', '3'],
        cuatrimestre:'',
        month:'',
        week:''
      }
    },
    created(){
      var vm = this;
      vm.getDate();
      vm.getCuatrimestre();
      vm.getWeek();
    },
    methods:{
      getCuatrimestre(){
          var vm = this;
          var week = vm.date.getWeek();
          //console.log(week);
          
          vm.cuatrimestre = 'Evaluaciones';

          if(week > 1 && week <= 17){
            vm.cuatrimestre = '1';
          }else if(week >= 19 && week <= 34){
            vm.cuatrimestre = '2';
          }else if(week >= 35 && week <= 50){
            vm.cuatrimestre = '3';
          }
      },
      getWeek(){
          var vm = this;
          var week = vm.date.getWeek();

          if(week == 18 || week == 1)
              week = 0;

          if(week >= 19 && week <= 34){
              week -= 18;
          }else if(week >= 35 && week <= 50){
              week -= 34;
          }
          //console.log(week);
          vm.week = vm.verbos[week];
      },
      getDate(){
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth(); //January is 0!
          var yyyy = today.getFullYear();
          var Months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
          return today = dd + '/' + String(Months[mm]) + '/' + yyyy;
      }
    }
  }

  export default dateHelper;