import DataTypes from 'sequelize'
import { db_orm } from '../../config.js'

const Admin = db_orm.define('admin' ,{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_super_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    }
} ,{
    timestamps: false
})

export default Admin