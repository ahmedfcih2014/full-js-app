import bcrypt from 'bcrypt'
import AdminORM from '../orm-models/Admin.js'
import AdminPermissionsORM from '../orm-models/AdminPermissions.js'

export default class AdminRepo {
    async login(cred) {
        const admin = await AdminORM.findAll({username: cred.username ,include: AdminPermissionsORM})
        if (admin[0]) {
            const passChecked = await bcrypt.compare(cred.password ,admin[0].password)
            return passChecked ? admin[0] : undefined
        }
        return false
    }
    async list(page = 1 ,limit = 10 ,desc_order = false) {
        page = page <= 1 ? 1 : page
        const order = desc_order ? [['id' ,'desc']] : []
        const options = {
            order: order,
            limit,
            offset: page * limit - limit
        }
        const _admins = await AdminORM.findAndCountAll(options)
        return [_admins.rows ,_admins.count]
    }

    async create(admin) {
        const _admin = await AdminORM.create({
            ...admin
        })
        return _admin
    }
    async fetch(id) {
        return await AdminORM.findByPk(id ,{include: AdminPermissionsORM})
    }

    async update(id ,model) {
        const admin = await AdminORM.findByPk(id)
        const updated = await admin.update(model)
        return [admin ,updated]
    }
}