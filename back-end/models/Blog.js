import DataTypes from 'sequelize'
import { db_orm } from '../../config.js'

const Blog = db_orm.define('blog' ,{
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sub_title: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Blog