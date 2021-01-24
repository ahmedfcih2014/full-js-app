import EmployeeSettingORM from '../orm-models/EmployeeSetting.js'

export default class EmployeeSetting {
    async list(page = 1 ,limit = 10 ,desc_order = false) {
        page = page <= 1 ? 1 : page
        const order = desc_order ? [['id' ,'desc']] : []
        const options = {
            order: order,
            limit,
            offset: page * limit - limit
        }
        const _settings = await EmployeeSettingORM.findAndCountAll(options)
        return [_settings.rows ,_settings.count]
    }

    async destroy(id) {
        EmployeeSettingORM.destroy({
            where: {id}
        })
        .then(res => 1)
        .catch(err => {
            console.log(err)
            return 0
        })
    }

    async create(setting) {
        return await EmployeeSettingORM.create({...setting})
    }

    async fetch(id) {
        return await EmployeeSettingORM.findByPk(id)
    }

    async update(id ,setting) {
        EmployeeSettingORM.findByPk(id).then(model => {
            model.update({...setting})
            .then(res => 1)
            .catch(err => {
                console.log(err)
                return 0
            })
        })
        .catch(err => {
            console.log(err)
            return 0
        })
    }
}