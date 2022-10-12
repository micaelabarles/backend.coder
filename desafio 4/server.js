const express = require('express')
const Contenedor = require('./main')
const productsRouter = require("./routes/products");

const app = express()

app.listen(8080, () => {
    console.log("servidor listo en puerto 8080")
})

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use("/api/productos", productsRouter)

