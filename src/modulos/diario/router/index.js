


export default {

    name: 'diario',
    component: () => import(/* webpackChunkName: "diario" */ '@/modulos/diario/layouts/DiarioLayout.vue' ),
    children: [
        {
            path:'',
            name:'NoEntradas',
            component: () => import (/* webpackChunkName: "SinEntradas" */ '@/modulos/diario/views/NingunaEntradaSeleccionada.vue'),
        },
        {
            path:':id',
            name:'Entrada',
            component: () => import (/* webpackChunkName: "Entradas" */ '@/modulos/diario/views/EntradaDiario.vue'),
            props: (route) =>{
                return {
                    id: route.params.id
                }
            }

        }
    ]


}