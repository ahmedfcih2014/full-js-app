import EmployeeORM from '../orm-models/Employee.js'
import EmployeeSetting from '../orm-models/EmployeeSetting.js'
import JobTitle from '../orm-models/JobTitle.js'

export default class EmployeeRepo {
    async list(page = 1 ,limit = 10 ,desc_order = false) {
        page = page <= 1 ? 1 : page
        const order = desc_order ? [['id' ,'desc']] : []
        const options = {
            order: order,
            limit,
            offset: page * limit - limit,
            include: [JobTitle ,EmployeeSetting]
        }
        const _employees = await EmployeeORM.findAndCountAll(options)
        return [_employees.rows ,_employees.count]
    }

    async list_all() {
        return await EmployeeORM.findAll()
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