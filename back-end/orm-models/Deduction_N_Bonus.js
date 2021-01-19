import DataTypes from 'sequelize'
import { db_orm } from '../../config.js'

const Deduction_N_Bonus = db_orm.define('deductions_n_bonuse' ,{
    operation_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    operation_type: {
        type: DataTypes.ENUM,
        values: ['deduction' ,'bonus'],
        allowNull: false
    }
} ,{
    timestamps: false
})

export default Deduction_N_Bonus