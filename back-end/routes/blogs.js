import express from 'express'
import Sequelize from 'sequelize'
import Blog from '../models/Blog.js'
import Category from '../models/Category.js'
import SetupRelations from '../models/SetupRelations.js'

SetupRelations() // this is very important to add relations to models after define them

const router = express.Router()

router.get('/' ,(req ,res) => {
    Blog.findAll({
        where: {
            title: {
                [Sequelize.Op.like]: 'tow%'
            }
        },
        include: Category
    })
    .then(blogs => {
        res.send(blogs)
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(404)
    })
})

router.post('/create' ,(req ,res) => {
})

export default router