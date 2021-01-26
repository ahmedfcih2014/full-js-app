import { Sequelize } from 'sequelize'

const server_config = {
    port: 9090,
    host: 'localhost'
}

const db_config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'simple_erp'
}

const db_orm = new Sequelize(
    db_config.database,
    db_config.user,
    db_config.password,
    {
        host: db_config.host,
        dialect: 'mysql'
    }
)

const default_values = {
    limit: 3,
    page: 1
}

const system_screens = [
    // HR Module screens
    {db_name: 'job_titles' ,view_name: 'Job Titles'},
    {db_name: 'employee_settings' ,view_name: 'Employee Settings'},
    {db_name: 'employees' ,view_name: 'Employees'},
    {db_name: 'attendance' ,view_name: 'Attendance'},
    {db_name: 'deductions_n_bonuses' ,view_name: 'Deductions And Bonuses'},
    {db_name: 'advances' ,view_name: 'Advances'},
    {db_name: 'salaries' ,view_name: 'Salaries'}
]

export {server_config ,db_config ,db_orm ,default_values ,system_screens}