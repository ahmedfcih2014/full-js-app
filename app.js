import express from 'express'
import {server_config} from './config.js'

const app = express()

// set view engine
app.set('view engine' ,'ejs')
app.set('views' ,'back-end/views')

// use this middleware for static files
app.use(express.static('./public'))

app.get('/' ,(req ,res) => {
    res.render('layout')
})

app.listen(
    server_config.port,
    server_config.host,
    () => console.log(`Server running at http://${server_config.host}:${server_config.port}`)
)