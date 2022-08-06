<template>
    <navbar></navbar>

    <div class="d-flex">
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

export default {
    components:{
        Navbar: defineAsyncComponent(()=>import('@/modulos/diario/components/Navbar.vue')),
        EntradasDiario: defineAsyncComponent(()=>import('@/modulos/diario/components/EntryList.vue'))
    }
}
</script>