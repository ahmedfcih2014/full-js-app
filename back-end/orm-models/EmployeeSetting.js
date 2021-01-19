import DataTypes from 'sequelize'
import { db_orm } from '../../config.js'

const EmployeeSetting = db_orm.define('emplyee_setting' ,{
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    yearly_vacations: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 21
    },
    weakly_vacations: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2
    },
    work_day_start: {
        type: DataTypes.STRING,
        allowNull: true
    },
    work_day_end: {
        type: DataTypes.STRING,
        allowNull: true
    }
} ,{
    timestamps: false
})

export default EmployeeSetting