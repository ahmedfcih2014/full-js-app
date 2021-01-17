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

export {server_config ,db_config ,db_orm}