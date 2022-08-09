import diarioRouter from '@/modulos/diario/router/index'


describe("Pruebas en el route modulo del diario",()=>{
    test ('El router debe de tener esta configuracion', async ()=>{
        expect(diarioRouter).toMatchObject({
            name: 'diario',
            component: expect.any(Function),
            children: [
                {
                    path:'',
                    name:'NoEntradas',
                    component: expect.any(Function),
                },
                {
                    path:':id',
                    name:'Entrada',
                    component: expect.any(Function),
                    props: expect.any(Function)
                }
            ]
        })

        // expect((await diarioRouter.children[0].component()).default.name).toBe('NingunaEntrada')
        // expect((await diarioRouter.children[1].component()).default.name).toBe('EntradaDiario')
        
        const promiseRoutes = []
        diarioRouter.children.forEach(child => promiseRoutes.push(child.component()))

        const rutas = (await Promise.all(promiseRoutes)).map(r=>r.default.name)
        
        expect (rutas).toContain ('NingunaEntrada')
        expect (rutas).toContain ('EntradaDiario')

    })

    test ("Debe retornar el id de la ruta",()=>{
        const route ={
            params:{
                id: 'ABC-123'
            }
        }
        const rutaEntrada = diarioRouter.children.find(route=>route.name ==='Entrada')
        expect(rutaEntrada.props(route)).toEqual({id: 'ABC-123'})



    })
})