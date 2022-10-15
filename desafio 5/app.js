import express from 'express'
import {router} from './src/components/routes/index.js'
import {engine} from 'express-handlebars'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('hbs', engine({extname: 'hbs'}))
app.set('view engine', 'hbs')
app.set('views', './src/views')
app.use(express.static('public'))


app.use('/api/productos', router)

app.listen(8080, ()=>{
    console.log("servidor listo en puerto 8080")
})