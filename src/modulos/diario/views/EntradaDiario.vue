<template>
    <template v-if="entradaVista">
        <div  class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">{{dia}}</span>
                <span class="mx-1 fs-3">{{mes}} </span>
                <span class="mx-2 fs-4 fw-light"> {{anno}}</span>
            </div>

            <div>

                <input  v-show="false" 
                        type="file" 
                        @change="onSelectedImage" 
                        ref="imageSelector" 
                        accept="image/png, image/jpeg, image/jpg">

                <button v-if="entradaVista.id" class="btn btn-danger mx-2"
                @click="borrandoEntrada">
                    Borrar <i class="fa fa-trash-alt"></i>
                </button>   

                <button class="btn btn-primary" @click="onSelectImage">
                    Subir Foto <i class="fa fa-upload"></i>
                </button>   

            </div>

        </div>
        <hr>
        <div class="d-flex flex-column px-3 h-75">
            <textarea v-model="entradaVista.text" placeholder="¿Qué sucedio hoy?"></textarea>
        </div>
    </template>

    <fab 
        icon="fa-save"
        @on:click="guardarEntrada">
    </fab>

    <img    
        v-if="entradaVista.imagen && !localImage" 
        :src="entradaVista.imagen" 
        alt="Imagen entrada" 
        class="img-thubnail">
 

     <img
        v-if="localImage"
        :src="localImage"
        alt="Imagen entrada" class="img-thubnail">



</template>

<script>

import {defineAsyncComponent} from 'vue'
import { mapGetters, mapActions } from 'vuex';
import Swal from 'sweetalert2'

import getDiaMesAnno from '@/modulos/diario/helpers/getDiaMesAnno'
import uploadImage from '@/modulos/diario/helpers/uploadImage'

export default {
    name:'EntradaDiario',
    props:{
        id: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            entradaVista: null,
            localImage: null,
            file: null
        }
    },
    components:{
        Fab: defineAsyncComponent(()=> import('@/modulos/diario/components/Fab.vue'))
    },
    computed:{
      ...mapGetters('diario',['obtenerEntradaById']),
      dia(){ 
        const {dia} = getDiaMesAnno (this.entradaVista.fecha)
        return dia.replace('-','')
      },
      mes(){ 
        const {mes} = getDiaMesAnno (this.entradaVista.fecha)
        return mes
      },
      anno(){ 
        const {anno} = getDiaMesAnno (this.entradaVista.fecha)
        return anno
    },

    },
    methods:{
        cargarEntrada(){
            let Entrada
            if (this.id === 'nuevo')
            {
                Entrada = {
                    text: '',
                    fecha: new Date().getTime()
                }
            }
            else
            {
                Entrada = this.obtenerEntradaById (this.id)
                //console.log (Entrada)
                if (!Entrada) this.$router.push({name: 'NoEntradas'})
            }

            this.entradaVista = Entrada
        },
        ...mapActions('diario',['actualizarEntradas','crearEntradas','borrarEntrada']),
        async guardarEntrada(){
            Swal.fire({
                title: 'Espere por favor',
                allowOutsideClick: false
            })

            Swal.showLoading()


            const picture = await uploadImage (this.file)
            this.entradaVista.imagen = picture

            if (this.entradaVista.id)
            {
                await this.actualizarEntradas(this.entradaVista)
            }
            else
            {
                const id = await this.crearEntradas(this.entradaVista)
                this.$router.push({name: 'Entrada', params: {id: id}})
            }

            this.file =null
            Swal.fire('Guardado','Entrada registrada con éxito','success')

        },
        async borrandoEntrada()
        {
            const resultado = await Swal.fire ({
                title: '¿Está seguro?',
                text: 'Una vez borrado, no se puede recuperar',
                showDenyButton: true,
                confirmButtonText: 'Si, estoy seguro'
            })
            if (resultado.isConfirmed)
            {

                Swal.fire({
                    title: 'Espere por favor',
                    allowOutsideClick: false

                })

                Swal.showLoading()

                await this.borrarEntrada(this.entradaVista.id)
                this.$router.push({name: 'NoEntradas'})

                Swal.fire ('Eliminado','','success')

            }
        },
        onSelectedImage(event)
        {
            const file =event.target.files[0]
            if (!file)
            {
                this.localImage= null
                this.file = null
                return
            } 

            this.file = file
            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL (file)
            // console.log(event.target.files[0])
        },
        onSelectImage()
        {
            this.$refs.imageSelector.click()
        }
    },
    created(){
       this.cargarEntrada()
    },
    watch:{
        id(){
            this.cargarEntrada()
        }
    }
}
</script>

<style lang="scss" scoped>

    textarea{
        font-size: 20px;
        border: none;
        height: 100%;
        &:focus {
            outline: none;
        }
    }
    img{
        width: 350px;
        position: fixed;
        bottom: 100px;
        right: 20px;
        box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
    }

</style>