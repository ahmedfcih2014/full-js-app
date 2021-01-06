import express from 'express'
import {server_config} from './config.js'
import Admins from './back-end/controllers/Admins.js'

const app = express()

app.get('/' ,(req ,res) => {
    res.send('Home Page')
})
app.use(Admins)

app.listen(
    server_config.port,
    server_config.host,
    () => console.log(`Server running at http://${server_config.host}:${server_config.port}`)
)