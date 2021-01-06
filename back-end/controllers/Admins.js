import express from 'express'

const router = express.Router()

router.get('/admins' ,(req ,res) => {
    res.send('Admins')
})

router.get('/admins/:id' ,(req ,res) => {
    res.send(req.params.id)
})

export default router