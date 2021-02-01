import express from 'express'
import expressSession from 'express-session'
import redis from 'redis'
import connectRedis from 'connect-redis'
import {flash} from 'express-flash-message'
import {server_config} from './config.js'
import middlewares from './middlewares.js'
import JobTitleRouter from './back-end/routes/job-titles.js'
import EmployeeSettingRouter from './back-end/routes/employee-settings.js'
import EmployeesRouter from './back-end/routes/employees.js'
import AttendanceRouter from './back-end/routes/attendances.js'
import Deduction_N_BonusesRouter from './back-end/routes/deductions-n-bonuses.js'
import Advances from './back-end/routes/advances.js'
import SalariesRouter from './back-end/routes/salaries.js'
import AdminsRouter from './back-end/routes/admins.js'
import Auth from './back-end/controllers/Auth.js'
import SetupORMRelation from './back-end/orm-models/SetupRelation.js'

const app = express()

const RedisStore = connectRedis(expressSession)
//Configure redis client
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
})
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

// set view engine
app.set('view engine' ,'ejs')
app.set('views' ,'back-end/views')

// use this middleware for static files
app.use(express.static('./public'))
app.use(express.urlencoded({extended: true}))
app.use(
    expressSession({
        store: new RedisStore({ client: redisClient }),
        secret: '$3cre6KEYM0stH3R3' ,saveUninitialized: false ,resave: false ,
        name: 'sid',
        cookie: {
            maxAge: 1000 * 60 * 60 * 2,
            sameSite: true,
            secure: false // most be true on production mode
        }
    })
)
app.use(flash({ sessionKeyName: 'flashMessage' }))

app.get('/login' , middlewares.is_admin_unauth ,Auth.getLogin)
app.post('/login' , middlewares.is_admin_unauth ,Auth.postLogin)
app.get('/logout' , middlewares.is_admin_auth ,Auth.logout)

SetupORMRelation()

app.get('/' , middlewares.is_admin_auth ,(req ,res) => res.redirect('/dashboard'))
app.get('/dashboard' , middlewares.is_admin_auth ,async (req ,res) => {
    const admin = req.session.admin
    const auth_message = await req.consumeFlash('unauthoirzed')
    res.render('layout' ,{
        title: 'Dashboard' ,current_uri: '/dashboard' ,current_group: '' ,admin ,auth_message
    })
})

app.use('/admins' ,middlewares.is_admin_auth ,AdminsRouter)
app.use('/job-titles', middlewares.is_admin_auth, JobTitleRouter)
app.use('/employee-settings' ,middlewares.is_admin_auth ,EmployeeSettingRouter)
app.use('/employees' ,middlewares.is_admin_auth ,EmployeesRouter)
app.use('/attendance' ,middlewares.is_admin_auth, AttendanceRouter)
app.use('/deduction-bonuses' ,middlewares.is_admin_auth, Deduction_N_BonusesRouter)
app.use('/advances' ,middlewares.is_admin_auth, Advances)
app.use('/salaries' ,middlewares.is_admin_auth, SalariesRouter)

app.listen(
    server_config.port,
    server_config.host,
    () => console.log(`Server running at http://${server_config.host}:${server_config.port}`)
)