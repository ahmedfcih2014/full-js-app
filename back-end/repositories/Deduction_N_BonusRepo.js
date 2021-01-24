import Deduction_N_BonusORM from '../orm-models/Deduction_N_Bonus.js'
import Employee from '../orm-models/Employee.js'

export default class Deduction_N_BonusRepo {
    async list(page = 1 ,limit = 10 ,desc_order = false) {
        page = page <= 1 ? 1 : page
        const order = desc_order ? [['id' ,'desc']] : []
        const options = {
            order: order,
            limit,
            offset: page * limit - limit,
            include: Employee
        }
        const _deductions = await Deduction_N_BonusORM.findAndCountAll(options)
        return [_deductions.rows ,_deductions.count]
    }

    async destroy(id) {
        const deleted = await Deduction_N_BonusORM.destroy({
            where: {id}
        })
        return deleted
    }

    async create(deduction) {
        return await Deduction_N_BonusORM.create({...deduction})
    }

    async fetch(id) {
        return await Deduction_N_BonusORM.findByPk(id)
    }

    async update(id ,deduction) {
        Deduction_N_BonusORM.findByPk(id).then(model => {
            model.update({...deduction})
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