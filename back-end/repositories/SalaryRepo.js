import Employee from '../orm-models/Employee.js'
import SalaryORM from '../orm-models/Salary.js'

export default class Salary {
    async list() {
        return await SalaryORM.findAll({include: Employee})
    }

    async destroy(id) {
        let deleted
        try {
            deleted = await SalaryORM.destroy({where: {id}})
        } catch (err) {
            deleted = 0
        }
        return deleted
    }

    async create(salary) {
        return await SalaryORM.create({...salary})
    }

    async fetch(id) {
        return await SalaryORM.findByPk(id)
    }

    async update(id ,salary) {
        SalaryORM.findByPk(id).then(model => {
            model.update({...salary}).then(res => 1)
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