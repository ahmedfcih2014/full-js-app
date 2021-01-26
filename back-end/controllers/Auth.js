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
            const session_admin = {
                name: admin.name,
                username: admin.username,
                is_super_admin: admin.is_super_admin
            }
            if (!session_admin.is_super_admin) session_admin.admin_permissions = admin.admin_permissions
            req.session.admin = session_admin
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