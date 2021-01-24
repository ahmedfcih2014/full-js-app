import AdvanceORM from '../orm-models/Advance.js'
import Employee from '../orm-models/Employee.js'

export default class AdvanceRepo {
    async list(page = 1 ,limit = 10 ,desc_order = false) {
        page = page <= 1 ? 1 : page
        const order = desc_order ? [['id' ,'desc']] : []
        const options = {
            order: order,
            limit,
            offset: page * limit - limit,
            include: Employee
        }
        const _advances = await AdvanceORM.findAndCountAll(options)
        return [_advances.rows ,_advances.count]
    }

    async destroy(id) {
        const deleted = await AdvanceORM.destroy({
            where: {
                id: id
            }
        })
        return deleted
    }

    async create(attendance) {
        const created = await AdvanceORM.create({
            ...attendance
        })
        return created
    }

    async fetch(id) {
        return await AdvanceORM.findByPk(id)
    }

    async update(id ,attendance) {
        AdvanceORM
        .findByPk(id)
        .then(advance => {
            advance.update({
                ...attendance
            })
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