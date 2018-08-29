<template>
        <transition enter-active-class="animated flash" leave-active-class="animated zoomOut" :duration="{enter:300, leave:500}">
            <span v-if="Show" class="icon is-small">
                <icon name="check" scale="1.3" />
            </span>
            <span v-else>{{btnText}}</span>
        </transition>
</template>

<script>
    export default {
        props:['Show','btnText'],
        data(){
            return{}
        }
    }
</script>

<style scoped>

</style>