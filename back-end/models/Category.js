import DataTypes from 'sequelize'
import { db_orm } from '../../config.js'

const Category = db_orm.define('category' ,{
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Category