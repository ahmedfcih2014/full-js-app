import AdvanceModel from '../models/Advance.js'
import EmployeeModel from '../models/Employee.js'
import { validationResult } from 'express-validator'

export default class Advances {
    constructor() {
        this.model = new AdvanceModel
        this.employee_model = new EmployeeModel
    }

    async index(req ,res) {
        const models = await this.model.list()
        let alert_message = req.session.alert_message ? req.session.alert_message : false
        let is_danger = req.session.is_danger ? req.session.is_danger : false
        res.render(
            'hr-module/advances/index',
            {title: 'Advances' ,current_uri: '/advances' ,current_group: 'hr' ,models ,alert_message ,is_danger}
        )
        req.session.alert_message = ''
        req.session.is_danger = undefined
    }

    async delete(req ,res) {
        const id = req.params.id
        const deleted = await this.model.destroy(id)
        if (deleted) {
            req.session.alert_message = 'Advance deleted successfully from our data'
            req.session.is_danger = true
            res.send({
                location: '/advances'
            })
        } else {
            res.send({message: 'server error'})
        }
    }

    async create(req ,res) {
        const employees = await this.employee_model.list()
        const errors = req.session.errors ? req.session.errors : []
        res.render(
            'hr-module/advances/create',
            {title: 'Advances' ,current_uri: '/advances' ,current_group: 'hr' ,employees ,errors}
        )
        req.session.errors = []
    }

    async store(req ,res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.session.errors = errors.array()
            res.redirect('back')
        } else {
            const deduction = {
                operation_amount: req.body.operation_amount,
                operation_type: req.body.operation_type,
                employee_id: req.body.employee_id
            }
            await this.model.create(deduction)
            req.session.alert_message = 'Advance stored successfully to our data'
            res.redirect('/advances')
        }
    }

    async edit(req ,res) {
        const id = req.params.id
        const model = await this.model.fetch(id)
        const employees = await this.employee_model.list()
        const errors = req.session.errors ? req.session.errors : []
        res.render(
            'hr-module/advances/edit',
            {title: 'Advances' ,current_uri: '/advances' ,current_group: 'hr' ,model ,employees ,errors}
        )
    }

    async update(req ,res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.session.errors = errors.array()
            res.redirect('back')
        } else {
            const id = req.params.id
            const deduction = {
                operation_amount: req.body.operation_amount,
                operation_type: req.body.operation_type,
                employee_id: req.body.employee_id
            }
            await this.model.update(id ,deduction)
            req.session.alert_message = 'Advance updated successfully in our data'
            res.redirect('/advances')
            req.session.errors = []
        }
    }
}