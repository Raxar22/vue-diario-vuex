<template>
    <navbar></navbar>

    <div v-if="isLoading" class="row justify-content-md-center">
        <div class="col-3 alert-info text-center mt-5">
            Espere por favor... 
            <h3 class="mt-2">
                <i class="fa fa-spin fa-sync"></i>
            </h3>
        </div>
    </div>


    <div v-else class="d-flex">
        <div class="col-4">
            <entradas-diario></entradas-diario>
        </div>
        <div class="col">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'
import {mapActions, mapState} from 'vuex'

export default {
    components:{
        Navbar: defineAsyncComponent(()=>import('@/modulos/diario/components/Navbar.vue')),
        EntradasDiario: defineAsyncComponent(()=>import('@/modulos/diario/components/EntryList.vue'))
    },
    methods: {
        ...mapActions('diario',['cargarEntradas'])
    },
    computed:{
        ...mapState('diario',['isLoading'])
    },
    created(){
        this.cargarEntradas()
    }
}
</script>