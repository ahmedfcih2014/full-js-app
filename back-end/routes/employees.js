import express from 'express'
import Employee from '../controllers/Employee.js'

const router = express.Router()

const controller = new Employee()

router.get('/' ,(req ,res) => controller.index(req ,res))
router.get('/create' ,(req ,res) => controller.create(req ,res))
router.post('/create' ,(req ,res) => controller.store(req ,res))
router.get('/edit/:id' ,(req ,res) => controller.edit(req ,res))
router.post('/edit/:id' ,(req ,res) => controller.update(req ,res))
router.delete('/delete/:id' ,(req ,res) => controller.delete(req ,res))

export default router