import uploadImage from "@/modulos/diario/helpers/uploadImage";
import axios from "axios";
import 'setimmediate';
import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name:'dbsmm77sk',
    api_key:'158778755263854',
    api_secret:'Gvb0PS2g6SuTK5OTY8cEBetw_NQ'
})

describe("Pruebas en el Upload Image",()=>{
    test ("Debe cargar un archivo y retornar url",async()=>{
        const {data} = await axios.get ('https://res.cloudinary.com/dbsmm77sk/image/upload/v1659914348/curso_vue/aqb2eawhakjv9hfvch95.jpg',{
            responseType: 'arraybuffer'
        })

        const file = new File ([data],'foto.jpg')
        const url = await uploadImage(file)

        expect (typeof url).toBe('string')

        const segments = url.split ('/')
        const imageId = segments[segments.length-2]+'/'+segments[segments.length-1].replace('.jpg','')
    //    await cloudinary.v2.api.delete_resources(imageId,{},(result)=>{
    //         console.log(result)
    //     })
      // await cloudinary.v2.uploader.destroy(imageId, function(result) { console.log(result) });
        await cloudinary.v2.api.delete_resources(imageId) 
        console.log (imageId)
    })
})