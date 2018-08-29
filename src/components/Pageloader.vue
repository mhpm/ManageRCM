<template>
     <div id="Modal">
        <div align="center" v-bind:class="['modal', modalActive]">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="spinner"></div>
            <div class="has-text-light">{{msg}}</div>
        </div>
        </div>
  </div>
</template>

<script>
    export default {
        data(){
            return {
                modalActive: '',
                msg:''
            }
        },
        methods: {
            Active(msg){
                this.msg = msg;
                this.modalActive = 'is-active';
            },
            Close(){
                this.modalActive = '';
            }
        }
    }
</script>

<style scoped>
.spinner {
  width: 40px;
  height: 40px;
  margin: 10px auto;
  background-color: rgb(255, 255, 255);

  border-radius: 100%;  
  -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
  animation: sk-scaleout 1.0s infinite ease-in-out;
}

@-webkit-keyframes sk-scaleout {
  0% { -webkit-transform: scale(0) }
  100% {
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}

@keyframes sk-scaleout {
  0% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 100% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
    opacity: 0;
  }
}
</style>