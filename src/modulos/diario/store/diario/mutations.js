
// export const miMutacion =  (state)=> {

// }

export const setEntrada =  (state,entradas)=> {
    state.entries= []
    state.entries= [...state.entries, ...entradas]
    state.isLoading = false
}

export const updateEntrada =  (state,entrada)=> {
    const indice = state.entries.map( e => e.id ).indexOf(entrada.id)
    state.entries[indice] = entrada

}

export const addEntrada =  (state,entrada)=> {
    // console.log(state)
    // console.log(entrada)
    state.entries = [entrada, ...state.entries]
}
export const borrarEntrada =  (state,id)=> {
  /*  const indice = state.entries.map( e => e.id ).indexOf(id)
    state.entries.splice(indice,1)*/


    state.entries = state.entries.filter (entrada => entrada.id !== id)

}