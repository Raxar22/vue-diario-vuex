
<template>
    <div  class="entry-container mb-3 pointer p-2"   
         @click="$router.push({name:'Entrada', params: {id: entrada.id}})">
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">{{dia}}</span>
            <span class="mx-1 fs-5">{{mes}}</span>
            <span class="mx-2 fw-ligth">{{anno}}</span>

        </div>
        <div class="entry-description">
            {{textoCorto}}
        </div>
    </div>
</template>

<script>
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const diasSemana   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

export default {
    props: {
        entrada: {
            type: Object,
            required: true
        }
    },
    computed:{
        textoCorto(){
            return (this.entrada.text.length > 130)
                ? this.entrada.text.substring(0,130) + '...'
                : this.entrada.text

        },
        dia(){
            const fecha = new Date (this.entrada.fecha)
            return  `${diasSemana[fecha.getDay()]} - ${fecha.getDate()}` 
        },
        mes(){
            const fecha = new Date (this.entrada.fecha)
            return meses[fecha.getMonth()]
        },
        anno(){
            const fecha = new Date (this.entrada.fecha)
            return fecha.getFullYear()
        }
    }
}
</script>

<style lang="scss" scoped>
    .entry-container {
        border-bottom: 1px solid #2c3e50;
        transition: 0.2s all ease-in;
        &:hover{
            background-color: lighten($color: grey, $amount:35 );
            transition: 0.2s all ease-in;
        }
    }
    .entry-description {
        font-size: 12px;
    }

</style>