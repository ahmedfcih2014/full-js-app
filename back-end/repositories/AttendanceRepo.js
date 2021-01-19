import AttendanceORM from '../orm-models/Attendance.js'
import Employee from '../orm-models/Employee.js'

export default class AttendanceRepo {
    async list() {
        return await AttendanceORM.findAll({include: Employee})
    }

    async destroy(id) {
        const deleted = await AttendanceORM.destroy({
            where: {id}
        })
        return deleted
    }

    async create(attendance) {
        return await AttendanceORM.create({...attendance})
    }

    async fetch(id) {
        return await AttendanceORM.findByPk(id)
    }

    async update(id ,attendance) {
        AttendanceORM.findByPk(id).then(model => {
            model.update({...attendance})
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