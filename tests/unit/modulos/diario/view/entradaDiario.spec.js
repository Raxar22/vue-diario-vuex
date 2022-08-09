import Swal from 'sweetalert2'
import { shallowMount } from "@vue/test-utils"
import { createStore } from "vuex"

import diario from '@/modulos/diario/store/diario/index'
import { diarioState } from "../../../Mocks/test-diario-state"

import EntradaDiario from '@/modulos/diario/views/EntradaDiario'
import { stringifyQuery } from 'vue-router'


const createVuexStore = (inicialState)=> createStore({
    modules:{
        diario: {
            ...diario,
            state: {...inicialState}
        }
    }
})  

jest.mock('sweetalert2',()=>({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))


describe ('Pruebas en la Entrada del Diario',()=>{


    const store = createVuexStore(diarioState)
    store.dispatch = jest.fn()
    
    const mockRouter = {
        push: jest.fn()
    }


    let wrapper

    beforeEach(()=>{
        jest.clearAllMocks()
        wrapper = shallowMount (EntradaDiario, {
            props:{
                id:'-N8ucyy0iiZQ851RnyNn'
            },
            global:{
                mocks:{
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    })

    test ('debe de sacar al usuario porque el id no existe',() => {
        // const wrapper = shallowMount (EntradaDiario, {
        //     props: {
        //         id: 'Easdsdas'
        //     },
        //     global:{
        //         mocks:{
        //             $router: mockRouter
        //         },
        //         plugins: [store]
        //     }
        // })

        // expect (mockRouter.push).toHaveBeenCalledWith({name: 'NoEntradas'})

    })
    test ('debe de mostrar la entrada correctamente',() => {
        expect(wrapper.html()).toMatchSnapshot()
        expect (mockRouter.push).not.toHaveBeenCalled()
    })

    test ('Debe de borrar la entrada y salir', async ()=>{

        Swal.fire.mockReturnValueOnce(Promise.resolve({isConfirmed:true}))

       await wrapper.find ('.btn-danger').trigger('click')

        expect (Swal.fire).toHaveBeenCalledWith({
            title: '¿Está seguro?',
            text: 'Una vez borrado, no se puede recuperar',
            showDenyButton: true,
            confirmButtonText: 'Si, estoy seguro'
        })
        expect (store.dispatch).toHaveBeenCalledWith('diario/borrarEntrada','-N8ucyy0iiZQ851RnyNn')
        expect (mockRouter.push).toHaveBeenCalled()
    })

})