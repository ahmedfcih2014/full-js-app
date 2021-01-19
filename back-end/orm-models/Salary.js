import DataTypes, { Sequelize } from 'sequelize'
import { db_orm } from '../../config.js'

const Salary = db_orm.define('salary' ,{
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    salary: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0
    },
    date_from: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    date_to: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    deduction_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    bonus_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    advances_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
} ,{
    timestamps: false
})

export default Salary