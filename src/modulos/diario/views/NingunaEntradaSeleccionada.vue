<template>
    <div class="d-flex justify-content-center">
        <h1 class="align-self-center">No hay nada seleccionado</h1>
    </div>
    <fab
    @on:click="nuevaEntrada"></fab>
</template>

<script>

import {defineAsyncComponent} from 'vue'

export default {
    name:'NingunaEntrada',
    components: {
        Fab: defineAsyncComponent (() => import('@/modulos/diario/components/Fab.vue'))
    },
    methods:{
        nuevaEntrada(){
            this.$router.push({name: 'Entrada', params: {id:'nuevo'}})
        }
    }
}
</script>

<style lang="scss" scoped>
    div{
        height: 100%;
    }

</style>