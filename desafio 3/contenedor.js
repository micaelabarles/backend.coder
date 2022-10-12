const fs = require('fs')
const express = require('express')

const app = express()

app.listen(8080, () => {
    console.log("listo")
})

class Contenedor{
    constructor(file){
        this.file = file

    }

save = async(product) =>{
    try {
        if(fs.existsSync(this.file)){
            const contenido = await fs.promises.readFile(this.file, "utf-8")
            if(contenido){
                const contenidoProductos = JSON.parse(contenido)
                const nuevoProducto = {
                    id:contenidoProductos.length+1,
                    ...product
                }
                contenidoProductos.push(nuevoProducto)
                await fs.promises.writeFile(this.file, JSON.stringify(contenidoProductos, null, 2))
                
                app.get("/productos",(req, res)=>{
                    res.send(contenidoProductos)
                    })

               const productoRandom = contenidoProductos[Math.floor(Math.random()*contenidoProductos.length)]        

               app.get("/productoRandom", (req,res)=>{
                res.send(productoRandom)
               })     
            } else{
                const nuevoProducto = {
                    id:1,
                    ...product
                }
                await fs.promises.writeFile(this.file, JSON.stringify([nuevoProducto], null, 2))
            }
        } 
        else {
            const nuevoProducto = {
                id:1,
                ...product
            }
           await fs.promises.writeFile(this.file, JSON.stringify([nuevoProducto], null, 2))
        }
    } catch (error) {
        console.log(error)
    }
}

}


const crearProductos = async()=>{
    await productos.save(producto1)
    await productos.save(producto2)
    await productos.save(producto3)

}

crearProductos()


