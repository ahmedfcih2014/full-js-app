import bcrypt from 'bcrypt'
import AdminORM from '../orm-models/Admin.js'

export default class AdminRepo {
    async login(cred) {
        const admin = await AdminORM.findAll({username: cred.username})
        if (admin[0]) {
            const passChecked = await bcrypt.compare(cred.password ,admin[0].password)
            return passChecked ? admin[0] : undefined
        }
        return false
    }

    async create(admin) {
        const _admin = await AdminORM.create({
            ...admin
        })
        return _admin
    }
}