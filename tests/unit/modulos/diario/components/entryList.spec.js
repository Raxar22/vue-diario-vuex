import { shallowMount } from "@vue/test-utils"
import { createStore } from "vuex"
import diario from '@/modulos/diario/store/diario/index'
import EntryList from '@/modulos/diario/components/EntryList'
import { diarioState } from "../../../Mocks/test-diario-state"

const createVuexStore = (inicialState)=> createStore({
    modules:{
        diario: {
            ...diario,
            state: {...inicialState}
        }
    }
})  

describe('Pruebas en el EntryList',()=>{
    
    const store = createVuexStore(diarioState)
    const mockRouter = {
        push: jest.fn()
    }


    let wrapper

    beforeEach(()=>{
        jest.clearAllMocks()
        wrapper = shallowMount (EntryList, {
            global:{
                mocks:{
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    })

    test('Debe llamar entradasPorTermino y sacar dos entradas',()=>{

        expect (wrapper.findAll('entrada-stub').length).toBe(2)
        expect (wrapper.html()).toMatchSnapshot()

    })

    test ('Debe llamar el entradasPorTermino y filtrar las entradas',async ()=>{
        const input = wrapper.find('input')
        await input.setValue('segunda')
        expect (wrapper.findAll('entrada-stub').length).toBe(1)
    })
    test ('El boton Nuevo debe redireccionar a /new',()=>{
        wrapper.find('button').trigger('click')
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'Entrada', params: {id:'nuevo'}})
    })

})