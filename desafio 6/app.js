import express from 'express'
import {router} from './src/components/routes/index.js'
import {engine} from 'express-handlebars'
import path from 'path'
import { fileURLToPath } from 'url'
import {Server} from 'socket.io'
import {Contenedor} from './src/components/container.js'

const productsApi = new Contenedor("productos.txt")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('hbs', engine({extname: 'hbs'}))
app.set('view engine', 'hbs')
app.set('views', './src/views')
app.use(express.static('public'))


app.use('/', router)

const server = app.listen(8080, ()=>{
    console.log("servidor listo en puerto 8080")
})

const io = new Server(server)

const _filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(_filename)

app.use(express.static(__dirname+"/public"))

const messageHistory = []

io.on("connection", async(socket)=>{
    console.log("nuevo cliente/socket conectado", socket.id)

    socket.emit("productos", await productsApi.getAll())

    socket.on("newProduct", async(data) =>{
        await productsApi.save(data)
    })

    socket.on("message", data =>{
        console.log(data)
        messageHistory.push(data)
        io.sockets.emit("history", messageHistory)
    })
})