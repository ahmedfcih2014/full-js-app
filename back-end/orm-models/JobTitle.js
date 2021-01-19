import DataTypes from 'sequelize'
import { db_orm } from '../../config.js'

const JobTitle = db_orm.define('job_title' ,{
    name_ar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name_en: {
        type: DataTypes.STRING,
        allowNull: false
    }
} ,{
    timestamps: false
})

export default JobTitle