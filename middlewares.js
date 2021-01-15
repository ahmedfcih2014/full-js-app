export default {
    is_admin_auth: (req ,res ,next) => {
        if (req.session.admin) next()
        else res.redirect('/login')
    },
    is_admin_unauth: (req ,res ,next) => {
        if (!req.session.admin) next()
        else res.redirect('/')
    }
}