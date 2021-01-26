import DataTypes from 'sequelize'
import { db_orm } from '../../config.js'

const AdminPermissions = db_orm.define('admin_permission' ,{
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    screen_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    view_permission: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    add_permission: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    edit_permission: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    delete_permission: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    }
} ,{
    timestamps: false
})

export default AdminPermissions