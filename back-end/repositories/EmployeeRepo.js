import EmployeeORM from '../orm-models/Employee.js'
import EmployeeSetting from '../orm-models/EmployeeSetting.js'
import JobTitle from '../orm-models/JobTitle.js'

export default class EmployeeRepo {
    async list() {
        return await EmployeeORM.findAll({include: [JobTitle ,EmployeeSetting]})
    }

    async destroy(id) {
        const deleted = EmployeeORM.destroy({
            where: {id: id}
        })
        return deleted
    }

    async create(setting) {
        return await EmployeeORM.create({
            ...setting
        })
    }

    async fetch(id) {
        return await EmployeeORM.findByPk(id)
    }

    async update(id ,employee) {
        EmployeeORM.findByPk(id).then(model => {
            model
            .update({...employee})
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