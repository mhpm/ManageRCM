<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props:{
            name: { required: true }
        }
    }
</script>

<style scoped>

</style>