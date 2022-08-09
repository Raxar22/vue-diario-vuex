import { shallowMount } from "@vue/test-utils"
import Fab from '@/modulos/diario/components/Fab'


describe('Pruebas en el Fab component',()=>{
    test ('Debe mostrar el icono por defecto',()=>{
        const wrapper = shallowMount(Fab)
        const iTag = wrapper.find('i')
        
        expect (iTag.classes('fa-plus')).toBeTruthy()
    })
    test('Debe de mostrar el iciono por argumento',()=>{
        const wrapper = shallowMount(Fab, {
            props: {
                icon: 'fa-circle'
            }
        })
        const iTag = wrapper.find('i')
        
        expect (iTag.classes('fa-circle')).toBeTruthy()

    })
    test('Debe de emitir el evento on:click cuando se hace click',()=>{
        const wrapper = shallowMount(Fab)

        wrapper.find('button').trigger('click')

        expect(wrapper.emitted('on:click')).toHaveLength(1)

    })
})