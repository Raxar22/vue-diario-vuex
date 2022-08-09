<template>
    <div class="entry-list-container">
        <div class="px-2 pt-2">
            <input  type="text"
                    class="form-control"
                    placeholder="Buscar Entrada"
                    v-model="term"/>
        </div>

        <div class="mt-2 d-flex flex-column">
            <button class="btn btn-primary mx-3" @click="$router.push({name: 'Entrada', params: {id:'nuevo'}})">
                <i class="fa fa-plus-circle"></i> Nueva entrada
            </button>
        </div>

        <div class="entry-scrollarea">
            <entrada 
                v-for="entrada in entradasPorTermino" 
                :key="entrada.id" 
                :entrada="entrada"></entrada>
        </div>
    </div>
</template>

<script>
import {defineAsyncComponent } from 'vue'
import {mapGetters} from 'vuex'

export default {
    components: {
        Entrada: defineAsyncComponent (()=>import('@/modulos/diario/components/Entradas.vue'))
    },
    computed: {
        ...mapGetters ('diario',['obtenerEntradaBySearch']),
        entradasPorTermino(){
            return this.obtenerEntradaBySearch (this.term)
        }
    },
    data(){
        return {
            term: ''
        }
    }
}
</script>

<style lang="scss" scoped>

    .entry-list-container{
        border-right: 1px solid #2c3e50;
        height: calc(100vh - 56px);
    }
    .entry-scrollarea{
        height: calc(100vh - 110px);
        overflow: scroll;
    }
</style>
