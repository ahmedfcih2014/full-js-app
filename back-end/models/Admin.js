import ModelBase from './ModelBase.js'
import bcrypt from 'bcrypt'

export default class Advance extends ModelBase {
    constructor() {
        super()
        this.table_name = 'admins'
    }

    async login(cred) {
        const admin = await this.get_all(this.table_name ,undefined ,[{key: 'username', operator: '=', value:cred.username}])
        if (admin[0]) {
            const passChecked = await bcrypt.compare(cred.password ,admin[0].password)
            return passChecked ? admin[0] : undefined
        }
        return false
    }

    async create(admin) {
        return this.create_row(
            this.table_name ,[
                {key: 'username' ,value: admin.username},
                {key: 'password' ,value: admin.password},
                {key: 'name' ,value: admin.name}
            ]
        )
    }
}