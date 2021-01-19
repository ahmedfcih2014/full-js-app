import AdvanceORM from '../orm-models/Advance.js'
import Employee from '../orm-models/Employee.js'

export default class AdvanceRepo {
    async list() {
        const advances = await AdvanceORM.findAll({include: Employee})
        return advances
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