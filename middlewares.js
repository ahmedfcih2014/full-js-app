export default {
    is_admin_auth: (req ,res ,next) => {
        if (req.session.admin) next()
        else res.redirect('/login')
    },
    is_admin_unauth: (req ,res ,next) => {
        if (!req.session.admin) next()
        else res.redirect('/')
    },
    is_admin_authorized: async (req ,res ,next) => {
        const admin = req.session.admin
        if (admin.is_super_admin) next()
        else {
            const path = req.page_name
            const atuhorized = admin.admin_permissions.filter(perm => perm.screen_name === path)
            if (!atuhorized[0]) {
                await req.flash('unauthoirzed' ,'You are not authorized to visit this page')
                res.redirect('/')
            }
            else next()
        }
    }
}