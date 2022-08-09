
// export const miAccion = async ({commit})=> {

import diarioApi from "@/api/diarioApi"

// }

export const cargarEntradas = async ( {commit} )=> {

    const {data} = await diarioApi.get('/Entradas.json')
    if (!data){
        commit('setEntrada',[])
        return
    }
    const entradas = []
    for (let id of Object.keys(data)){
        entradas.push({
            id,
            ...data[id]
        })
    }
    commit('setEntrada',entradas)
   // console.log (entradas)
}

export const actualizarEntradas = async ( {commit}, entrada )=> {
    //dispara la mutation
    const {fecha,text,imagen} = entrada
    const datoAGuardar =  {fecha,text,imagen}
    await diarioApi.put(`/Entradas/${entrada.id}.json`,datoAGuardar)
    datoAGuardar.id = entrada.id
    commit('updateEntrada',{...datoAGuardar})


}

export const crearEntradas = async ( {commit},entrada )=> {
    const {fecha,text,imagen} = entrada
    const datoAGuardar =  {fecha,text,imagen}
    const entradaNueva = await diarioApi.post(`/Entradas.json`,datoAGuardar)

    datoAGuardar.id = entradaNueva.data.name
    //console.log(entradaNueva.data.name)
    commit('addEntrada',{...datoAGuardar})

    return entradaNueva.data.name

}


export const borrarEntrada = async ( {commit},id )=> {

    await diarioApi.delete(`/Entradas/${id}.json`)
    commit('borrarEntrada',id)
}