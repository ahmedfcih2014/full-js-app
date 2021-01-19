import DataTypes from 'sequelize'
import { db_orm } from '../../config.js'

const Advance = db_orm.define('advance' ,{
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
        values: ['withdraw' ,'deposit'],
        allowNull: false
    }
} ,{
    timestamps: false
})

export default Advance