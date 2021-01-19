import DataTypes, { Sequelize } from 'sequelize'
import { db_orm } from '../../config.js'

const Employee = db_orm.define('employee' ,{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    national_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    join_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    salary: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    job_title_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    setting_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    }
} ,{
    timestamps: false
})

export default Employee