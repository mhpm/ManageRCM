<template>
    <transition enter-active-class="animated bounceIn">
        <div class="notification has-text-centered has-text-grey">
            <span class="icon has-text-grey">
                <i class="fas fa-info-circle"></i>
            </span> <strong>
            {{msg}}</strong><br>{{msgDesc}}
        </div>
    </transition>
</template>

<script>
    export default {
        props:['msg', 'msgDesc']
    }
</script>

<style scoped>
.notification {
  background-color: hsl(0, 0%, 90%);
  padding: 8px 16px;
  border-radius: 4px;
}
</style>