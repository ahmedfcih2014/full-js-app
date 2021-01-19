import EmployeeSettingORM from '../orm-models/EmployeeSetting.js'

export default class EmployeeSetting {
    async list() {
        return await EmployeeSettingORM.findAll()
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