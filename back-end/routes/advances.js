import express from 'express'
import Advances from '../controllers/Advances.js'
import { checkSchema } from 'express-validator'
import validationRule from '../validations/AdvanceValidation.js'

const router = express.Router()

const controller = new Advances()

router.get('/' ,(req ,res) => controller.index(req ,res))
router.get('/create' ,(req ,res) => controller.create(req ,res))
router.post('/create' , checkSchema(validationRule), (req ,res) => controller.store(req ,res))
router.get('/edit/:id' ,(req ,res) => controller.edit(req ,res))
router.post('/edit/:id', checkSchema(validationRule), (req ,res) => controller.update(req ,res))
router.delete('/delete/:id' ,(req ,res) => controller.delete(req ,res))

export default router