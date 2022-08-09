import { shallowMount } from "@vue/test-utils"
import Home from '@/views/HomeView'

describe ('Pruebas en el Home Vie', () => {

    test('Debe renderizar el componente correctamente',()=>{
        const wrapper = shallowMount(Home)
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('Hacer click debe redireccionar a NoEntradas', () =>{
        const mockRouter = {
            push: jest.fn()
        }
        const wrapper = shallowMount(Home, {
            global: {
                mocks:{
                    $router: mockRouter
                }
            }
        })

        wrapper.find('button').trigger('click')
        expect(mockRouter.push).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith({name:'NoEntradas'})

    })
})