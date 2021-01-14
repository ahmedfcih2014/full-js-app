import AttendanceModel from '../models/Attendance.js'
import EmployeeModel from '../models/Employee.js'
import { validationResult } from 'express-validator'

export default class Attendance {
    constructor() {
        this.model = new AttendanceModel
        this.employee_model = new EmployeeModel
    }

    async index(req ,res) {
        const models = await this.model.list()
        let alert_message = req.session.alert_message ? req.session.alert_message : false
        let is_danger = req.session.is_danger ? req.session.is_danger : false
        res.render(
            'hr-module/attendance/index',
            {title: 'Attendance' ,current_uri: '/attendance' ,current_group: 'hr' ,models ,alert_message ,is_danger}
        )
        req.session.alert_message = ''
        req.session.is_danger = undefined
    }

    async delete(req ,res) {
        const id = req.params.id
        const deleted = await this.model.destroy(id)
        if (deleted) {
            req.session.alert_message = 'Attendance deleted successfully from our data'
            req.session.is_danger = true
            res.send({
                location: '/attendance'
            })
        } else {
            res.send({message: 'server error'})
        }
    }

    async create(req ,res) {
        const errors = req.session.errors ? req.session.errors : []
        const employees = await this.employee_model.list()
        res.render(
            'hr-module/attendance/create',
            {title: 'Attendance' ,current_uri: '/attendance' ,current_group: 'hr' ,employees ,errors}
        )
        req.session.errors = []
    }

    async store(req ,res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.session.errors = errors.array()
            res.redirect('back')
        } else {
            const attendance = {
                operation_date: req.body.operation_date,
                operation_type: req.body.operation_type,
                employee_id: req.body.employee_id
            }
            await this.model.create(attendance)
            req.session.alert_message = 'Attendance stored successfully to our data'
            res.redirect('/attendance')
        }
    }

    async edit(req ,res) {
        const id = req.params.id
        const model = await this.model.fetch(id)
        const employees = await this.employee_model.list()
        const errors = req.session.errors ? req.session.errors : []
        res.render(
            'hr-module/attendance/edit',
            {title: 'Attendance' ,current_uri: '/attendance' ,current_group: 'hr' ,model ,employees ,errors}
        )
    }

    async update(req ,res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.session.errors = errors.array()
            res.redirect('back')
        } else {
            const id = req.params.id
            const attendance = {
                operation_date: req.body.operation_date,
                operation_type: req.body.operation_type,
                employee_id: req.body.employee_id
            }
            await this.model.update(id ,attendance)
            req.session.alert_message = 'Attendance updated successfully in our data'
            res.redirect('/attendance')
            req.session.errors = []
        }
    }
}