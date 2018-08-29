<template>
<div>
    <section class="accordions">
        <article v-for="(accordion, index) in accordions" :key="index" class="accordion">
            <div class="accordion-header toggle">
                <p>{{accordion.name}}</p>
                <transition enter-active-class="animated bounceIn">
                    <icon v-if="true" name="check" scale="1.3" />
                </transition>
            </div>
            <div class="accordion-body">
                <div class="accordion-content">
                    
                </div>
            </div>
        </article>
    </section>
</div>
</template>

<script>
    export default {
        data() {
            return {
                accordions: [],
            }
        },
        created() {
            this.accordions = this.$children;
            console.log(this.accordions);
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
</style>