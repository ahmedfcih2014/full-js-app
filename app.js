import express from 'express'
import {server_config} from './config.js'
import JobTitleRouter from './back-end/routes/job-titles.js'
import EmployeeSettingRouter from './back-end/routes/employee-settings.js'
import EmployeesRouter from './back-end/routes/employees.js'
import AttendanceRouter from './back-end/routes/attendances.js'
import Deduction_N_BonusesRouter from './back-end/routes/deductions-n-bonuses.js'
import Advances from './back-end/routes/advances.js'
import SalariesRouter from './back-end/routes/salaries.js'

const app = express()

// set view engine
app.set('view engine' ,'ejs')
app.set('views' ,'back-end/views')

// use this middleware for static files
app.use(express.static('./public'))
app.use(express.urlencoded({extended: true}))

app.get('/' ,(req ,res) => res.redirect('/dashboard'))
app.get('/dashboard' ,(req ,res) => {
    res.render('layout' ,{title: 'Dashboard' ,current_uri: '/dashboard' ,current_group: ''})
})

app.use('/job-titles' ,JobTitleRouter)
app.use('/employee-settings' ,EmployeeSettingRouter)
app.use('/employees' ,EmployeesRouter)
app.use('/attendance' ,AttendanceRouter)
app.use('/deduction-bonuses' ,Deduction_N_BonusesRouter)
app.use('/advances' ,Advances)
app.use('/salaries' ,SalariesRouter)

app.listen(
    server_config.port,
    server_config.host,
    () => console.log(`Server running at http://${server_config.host}:${server_config.port}`)
)