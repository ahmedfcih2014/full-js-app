import express from 'express'
import JobTitle from '../controllers/JobTitle.js'

const router = express.Router()

router.get('/' ,JobTitle.index)
router.get('/create' ,JobTitle.create)
router.post('/create' ,JobTitle.save)
router.get('/edit/:id' ,JobTitle.edit)
router.post('/edit/:id' ,JobTitle.update)
router.delete('/delete/:id' ,JobTitle.delete)

export default router