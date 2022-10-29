import {response, Router} from 'express'
import {Contenedor} from '../container.js'

const router = Router()
const contenedorProductos = new Contenedor("../components/productos.txt")

router.get("/", (req, res)=>{
res.render('home')
})


router.post("/api/productos",async(req,res)=>{
contenedorProductos.save(req.body)
    res.redirect('/')
    })
    
router.get('/productos', async(req, res) =>{
    res.render('productos', {productos: contenedorProductos.getAll()})
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