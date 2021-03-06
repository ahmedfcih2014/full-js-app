import DeductionNBonusModel from '../repositories/Deduction_N_BonusRepo.js'
import EmployeeModel from '../repositories/EmployeeRepo.js'
import { validationResult } from 'express-validator'
import Pagination from './Pagination.js'
import { default_values } from '../../config.js'

export default class DeductionNBonus {
    constructor() {
        this.model = new DeductionNBonusModel
        this.employee_model = new EmployeeModel
        this.common_return = {
            title: 'Deductions And Bonuses' ,current_uri: '/deduction-bonuses' ,current_group: 'hr'
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
            'hr-module/deductions-n-bonuses/index',
            {...this.common_return ,models ,alert_message ,pages ,admin}
        )
    }

    async delete(req ,res) {
        const id = req.params.id
        const deleted = await this.model.destroy(id)
        if (deleted) {
            await req.flash('alert_message' ,'Deduction deleted successfully from our data')
            res.send({
                location: '/deduction-bonuses'
            })
        } else {
            res.send({message: 'server error'})
        }
    }

    async create(req ,res) {
        const admin = req.session.admin
        const errors = req.session.errors ? req.session.errors : []
        const employees = await this.employee_model.list_all()
        res.render(
            'hr-module/deductions-n-bonuses/create',
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
            await req.flash('alert_message' ,'Deduction stored successfully to our data')
            res.redirect('/deduction-bonuses')
        }
    }

    async edit(req ,res) {
        const admin = req.session.admin
        const id = req.params.id
        const model = await this.model.fetch(id)
        const employees = await this.employee_model.list_all()
        const errors = req.session.errors ? req.session.errors : []
        res.render(
            'hr-module/deductions-n-bonuses/edit',
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
            await req.flash('alert_message' ,'Deduction updated successfully in our data')
            res.redirect('/deduction-bonuses')
            req.session.errors = null
        }
    }
}