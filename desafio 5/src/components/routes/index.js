import {Router} from 'express'
import {Contenedor} from '../container.js'

const router = Router()
const contenedorProductos = new Contenedor("productos.txt")

router.get("/", (req, res)=>{
res.render('home')
})


router.get("/:id", async(req,res)=>{
    const {id} = req.params;
    const product = await contenedorProductos.getById(parseInt(id));
    if(product){
        res.json({
            message:"producto encontrado",
            product: product
        })
    }else{
        res.json({
            message:"producto no encontrado"
        })
    }
})

router.post("/",async(req,res)=>{
contenedorProductos.save(req.body)
console.log( await contenedorProductos.getAll())
res.redirect('/api/productos')
})

router.put("/:id", async(req,res)=>{
    const {id} = req.params;
    const newInfo = req.body;
    const productosActualizados = await contenedorProductos.updateById(parseInt(id),newInfo);
    res.json({
        message:`El producto con el id ${id} fue actualizado`,
        response: productosActualizados
    })
})

router.get("/home",(req,res)=>{
    res.send("peticion home")
})

export {router}