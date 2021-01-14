import express from 'express'
import EmployeeSetting from '../controllers/EmployeeSetting.js'
import { checkSchema } from 'express-validator'
import validationRules from '../validations/EmployeeSettingValidation.js'

const router = express.Router()

const controller = new EmployeeSetting()

router.get('/' ,(req ,res) => controller.index(req ,res))
router.get('/create' ,(req ,res) => controller.create(req ,res))
router.post('/create' ,checkSchema(validationRules) ,(req ,res) => controller.store(req ,res))
router.get('/edit/:id' ,(req ,res) => controller.edit(req ,res))
router.post('/edit/:id' ,checkSchema(validationRules) ,(req ,res) => controller.update(req ,res))
router.delete('/delete/:id' ,(req ,res) => controller.delete(req ,res))

export default router