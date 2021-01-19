import Admin from '../repositories/AdminRepo.js'

export default {
    getLogin: (req ,res) => {
        res.render('login')
    },
    postLogin: async (req ,res) => {
        const adminCont = new Admin
        const credentials = {
            'username': req.body.username,
            'password': req.body.password
        }
        const admin = await adminCont.login(credentials)
        if (admin) {
            req.session.admin = {
                name: admin.name,
                username: admin.username
            }
            res.redirect('/dashboard')
        } else {
            res.redirect('back')
        }
    },
    logout: (req ,res) => {
        req.session.admin = undefined
        res.redirect('/login')
    }
}