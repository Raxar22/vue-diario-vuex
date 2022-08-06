import { createStore } from 'vuex'
import diarioModulo from '@/modulos/diario/store/diario'


const store = createStore({
    modules:{
        diario: diarioModulo
    }
})

export default store