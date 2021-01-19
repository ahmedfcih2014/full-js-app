import DataTypes ,{Sequelize} from 'sequelize'
import { db_orm } from '../../config.js'

const Attendance = db_orm.define('attendance' ,{
    operation_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    operation_type: {
        type: DataTypes.ENUM,
        values: ['attendance' ,'leave'],
        allowNull: false
    }
} ,{
    timestamps: false
})

export default Attendance