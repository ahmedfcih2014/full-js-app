import AdvanceModel from '../repositories/AdvanceRepo.js'
import EmployeeModel from '../repositories/EmployeeRepo.js'
import { validationResult } from 'express-validator'
import Pagination from './Pagination.js'
import { default_values } from '../../config.js'

export default class Advances {
    constructor() {
        this.model = new AdvanceModel
        this.employee_model = new EmployeeModel
        this.common_return = {
            title: 'Advances' ,current_uri: '/advances' ,current_group: 'hr'
        }
    }

    async index(req ,res) {
        const admin = req.session.admin
        const page = req.query.page ? parseInt(req.query.page) : default_values.page
        const limit = req.query.limit ? parseInt(req.query.limit) : default_values.limit
        const [models ,rows_number] = await this.model.list(page ,limit ,true)
        let alert_message = await req.consumeFlash('alert_message')
        const pages = Pagination(this.common_return.current_uri ,page ,rows_number ,limit)
        res.render(
            'hr-module/advances/index',
            {...this.common_return ,models ,alert_message ,pages ,admin}
        )
        req.session.is_danger = undefined
    }

    async delete(req ,res) {
        const id = req.params.id
        const deleted = await this.model.destroy(id)
        if (deleted) {
            await req.flash('alert_message' ,'Advance deleted successfully from our data')
            res.send({
                location: '/advances'
            })
        } else {
            res.send({message: 'server error'})
        }
    }

    async create(req ,res) {
        const admin = req.session.admin
        const employees = await this.employee_model.list_all()
        const errors = req.session.errors ? req.session.errors : []
        res.render(
            'hr-module/advances/create',
            {...this.common_return ,employees ,errors ,admin}
        )
        req.session.errors = null
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
            await req.flash('alert_message' ,'Advance stored successfully to our data')
            res.redirect('/advances')
        }
    }

    async edit(req ,res) {
        const admin = req.session.admin
        const id = req.params.id
        const model = await this.model.fetch(id)
        const employees = await this.employee_model.list_all()
        const errors = req.session.errors ? req.session.errors : []
        res.render(
            'hr-module/advances/edit',
            {...this.common_return ,model ,employees ,errors ,admin}
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
            await req.flash('alert_message' ,'Advance updated successfully in our data')
            res.redirect('/advances')
            req.session.errors = null
        }
    }
}