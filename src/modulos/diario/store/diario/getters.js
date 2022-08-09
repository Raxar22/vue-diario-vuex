
// export const miGetter = (state)=> {
//  return state
// }

export const obtenerEntradaBySearch = ( state )=> (term = '') => {

    if (term.length===0) return state.entries

    return state.entries.filter (entry => entry.text.toLowerCase().includes(term.toLowerCase()))
}


export const obtenerEntradaById = (state)=> (id='') => {
    const entrada= state.entries.find (entry=> entry.id === id)
    
    if (!entrada) return
    
    return {...entrada}
}