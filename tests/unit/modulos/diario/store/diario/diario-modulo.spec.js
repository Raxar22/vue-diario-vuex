import { createStore } from "vuex"
import diario from '@/modulos/diario/store/diario/index'
import { diarioState } from "../../../../Mocks/test-diario-state"
import store from "@/store"


const createVuexStore = (inicialState)=> createStore({
        modules:{
            diario: {
                ...diario,
                state: {...inicialState}
            }
        }
})

describe ('Vuex - Pruebas en el módulo del Diario',()=>{

    //básicas ==============================================

    test('Debe tener el state inicial',()=>{
        const store = createVuexStore(diarioState)
        const {isLoading, entries} = store.state.diario

        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(diarioState.entries)
        // console.log (store.state)
    })
    // mutations==============================================

    test ("mutations: Set Entrada",()=>{
        const store = createVuexStore({isLoading:true,entries:[]})
        
        store.commit('diario/setEntrada',diarioState.entries)
        expect(store.state.diario.entries.length).toBe(2)
        
        expect(store.state.diario.isLoading).toBeFalsy

    })

    test("mutations: updateEntrada",()=>{
        const store = createVuexStore(diarioState)
        const nuevaEntrada = {
            id: '-N8ucyy0iiZQ851RnyNn',
            fecha: 1659914924670,
            text: 'Hola mundo desde pruebas'
        }
        const storeEntries = store.state.diario.entries
        store.commit('diario/updateEntrada',nuevaEntrada)
        expect(storeEntries.length).toBe(2)
        expect(storeEntries.find(e=>e.id==nuevaEntrada.id)).toEqual(nuevaEntrada)
        // expect(store.state.diario.entries[1]).toEqual(nuevaEntrada)

    })

    test("mutation: addEntrada y deleteEntrada",()=>{
        const store = createVuexStore(diarioState)
        const nuevaEntrada = {
            id: 'ABC123',
            fecha: 1659914924670,
            text: 'Hola mundo'
        }
        
        store.commit('diario/addEntrada',nuevaEntrada)
        let storeEntries = store.state.diario.entries
        
        expect(storeEntries.length).toBe(3)
        expect(storeEntries.find(e=>e.id==nuevaEntrada.id)).toBeTruthy()

        store.commit('diario/borrarEntrada',nuevaEntrada.id)
        storeEntries = store.state.diario.entries
        
        expect(storeEntries.length).toBe(2)
        expect(storeEntries.find(e=>e.id==nuevaEntrada.id)).toBeFalsy()

    })
    //Getters ==============================================
    test("Getters Busqueda de Entradas",()=>{
        const store = createVuexStore(diarioState)

        const [entrada1,entrada2] = diarioState.entries

        expect (store.getters['diario/obtenerEntradaBySearch']('').length).toBe(2)
        expect (store.getters['diario/obtenerEntradaBySearch']('mock').length).toBe(1)

        expect (store.getters['diario/obtenerEntradaBySearch']('mock')).toEqual([entrada1])

        expect (store.getters['diario/obtenerEntradaById']('-N8ucyy0iiZQ851RnyNn')).toEqual(entrada2)

        expect (store.getters['diario/obtenerEntradaById'](entrada2.id)).toEqual(entrada2)
    })
    //Acciones ==============================================
    test("Accion: cargarEntradas", async()=>{
        const store = createVuexStore({isLoading:true,entries:[]})

        await store.dispatch('diario/cargarEntradas')

        expect (store.state.diario.entries.length).toBe(3)

    })

    test("Accion: actualizarEntradas", async()=>{
        const store = createVuexStore(diarioState)
        const nuevaEntrada = {
            id: '-N8ucsiHGHt57LxuHU0K',
            fecha: 1659914904016,
            text: 'Hola mundo Fire',
            otroCampo: true,
            otroMas: {a: 1}
        }

        await store.dispatch('diario/actualizarEntradas', nuevaEntrada)

        expect (store.state.diario.entries.length).toBe(2)
        expect (store.state.diario.entries.find( e=> e.id === nuevaEntrada.id)).toEqual({
            id: '-N8ucsiHGHt57LxuHU0K',
            fecha: 1659914904016,
            text: 'Hola mundo Fire'})

    })

    test("Accion: crearEntradas y borrarEntrada", async()=>{

        const store = createVuexStore(diarioState)
        const nuevaEntrada = {
            fecha: 1659966604016,
            text: 'Nueva entrada desde las pruebas'
        }

        const nuevoId = await store.dispatch('diario/crearEntradas', nuevaEntrada)

        expect (typeof nuevoId).toBe('string')
        expect (store.state.diario.entries.find(e=>e.id===nuevoId)).toBeTruthy()

        await store.dispatch('diario/borrarEntrada', nuevoId)
        expect (store.state.diario.entries.find(e=>e.id===nuevoId)).toBeFalsy()

    })

    
})