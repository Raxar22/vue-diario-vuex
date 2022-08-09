

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const diasSemana   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

const getDiaMesAnno = (dateString) => {

    const fecha = new Date (dateString)

    return{
        dia:    `${diasSemana[fecha.getDay()]} - ${fecha.getDate()}` ,
        mes:    meses[fecha.getMonth()],
        anno:   fecha.getFullYear()
    }

}

export default getDiaMesAnno