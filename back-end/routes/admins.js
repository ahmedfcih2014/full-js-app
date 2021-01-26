import express from 'express'
import Admins from '../controllers/Admins.js'
import { checkSchema } from 'express-validator'
import createValidationRule from '../validations/AdminCreateValidation.js'
import editValidationRule from '../validations/AdminEditValidation.js'

const router = express.Router()

const controller = new Admins()

router.get('/' ,(req ,res) => controller.index(req ,res))
router.get('/create' ,(req ,res) => controller.create(req ,res))
router.post('/create' , checkSchema(createValidationRule), (req ,res) => controller.store(req ,res))
router.get('/edit/:id' ,(req ,res) => controller.edit(req ,res))
router.post('/edit/:id', checkSchema(editValidationRule), (req ,res) => controller.update(req ,res))
router.delete('/delete/:id' ,(req ,res) => controller.delete(req ,res))

export default router