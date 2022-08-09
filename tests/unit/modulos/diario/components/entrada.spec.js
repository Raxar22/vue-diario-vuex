import { shallowMount } from "@vue/test-utils";
import Entradas from '@/modulos/diario/components/Entradas.vue'
import { diarioState } from "../../../Mocks/test-diario-state";

describe('Pruebas en el componente de Entrada',()=>{

    const mockRouter = {
        push: jest.fn()
    }

    const wrapper = shallowMount (Entradas, {
        props:{
            entrada: diarioState.entries[0]
        },
        global:{
            mocks:{
                $router: mockRouter
            }
        }
    })

    test('Debe hacer match con el snapshot',()=>{
        expect (wrapper.html()).toMatchSnapshot()
    })

    test('Debe de redireccionar al hacer click en el entry-container',()=>{
        const entryContainer = wrapper.find('.entry-container')

        entryContainer.trigger('click')
        expect(mockRouter.push).toHaveBeenCalledWith(
            {
                "name": "Entrada", 
                "params": {
                    "id": diarioState.entries[0].id
                }
            }
        )

    })

    test ('Pruebas en las propiedades computadas',()=>{
        expect(wrapper.vm.dia).toBe('Lunes - 8')
        expect(wrapper.vm.mes).toBe('Agosto')
        expect(wrapper.vm.anno).toBe(2022)
    })
})


