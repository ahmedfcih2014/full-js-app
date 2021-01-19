import Blog from './Blog.js'
import Category from './Category.js'

export default () => {
    Category.hasMany(Blog ,{
        foreignKey: 'category_id'
    })

    Blog.belongsTo(Category ,{
        foreignKey: 'category_id'
    })
}