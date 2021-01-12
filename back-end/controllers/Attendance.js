import AttendanceModel from '../models/Attendance.js'
import EmployeeModel from '../models/Employee.js'

export default class Attendance {
    constructor() {
        this.model = new AttendanceModel
        this.employee_model = new EmployeeModel
    }

    async index(req ,res) {
        const models = await this.model.list()
        res.render(
            'hr-module/attendance/index',
            {title: 'Attendance' ,current_uri: '/attendance' ,current_group: 'hr' ,models}
        )
    }

    async delete(req ,res) {
        const id = req.params.id
        const deleted = await this.model.destroy(id)
        if (deleted) {
            res.send({
                location: '/attendance'
            })
        } else {
            res.send({message: 'server error'})
        }
    }

    async create(req ,res) {
        const employees = await this.employee_model.list()
        res.render(
            'hr-module/attendance/create',
            {title: 'Attendance' ,current_uri: '/attendance' ,current_group: 'hr' ,employees}
        )
    }

    async store(req ,res) {
        const attendance = {
            operation_date: req.body.operation_date,
            operation_type: req.body.operation_type,
            employee_id: req.body.employee_id
        }
        await this.model.create(attendance)
        res.redirect('/attendance')
    }

    async edit(req ,res) {
        const id = req.params.id
        const model = await this.model.fetch(id)
        res.render(
            'hr-module/attendance/edit',
            {title: 'Attendance' ,current_uri: '/attendance' ,current_group: 'hr' ,model}
        )
    }

    async update(req ,res) {
        const id = req.params.id
        const attendance = {
            operation_date: req.body.operation_date,
            operation_type: req.body.operation_type,
            employee_id: req.body.employee_id
        }
        await this.model.update(id ,attendance)
        res.redirect('/attendance')
    }
}