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
        const page = req.query.page ? parseInt(req.query.page) : default_values.page
        const limit = req.query.limit ? parseInt(req.query.limit) : default_values.limit
        const [models ,rows_number] = await this.model.list(page ,limit ,true)
        let alert_message = req.session.alert_message ? req.session.alert_message : false
        let is_danger = req.session.is_danger ? req.session.is_danger : false
        const pages = Pagination(this.common_return.current_uri ,page ,rows_number ,limit)
        res.render(
            'hr-module/deductions-n-bonuses/index',
            {...this.common_return ,models ,is_danger ,alert_message ,pages}
        )
        req.session.alert_message = ''
        req.session.is_danger = undefined
    }

    async delete(req ,res) {
        const id = req.params.id
        const deleted = await this.model.destroy(id)
        if (deleted) {
            req.session.alert_message = 'Deduction deleted successfully from our data'
            req.session.is_danger = true
            res.send({
                location: '/deduction-bonuses'
            })
        } else {
            res.send({message: 'server error'})
        }
    }

    async create(req ,res) {
        const errors = req.session.errors ? req.session.errors : []
        const employees = await this.employee_model.list()
        res.render(
            'hr-module/deductions-n-bonuses/create',
            {...this.common_return ,employees ,errors}
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
            req.session.alert_message = 'Deduction stored successfully to our data'
            res.redirect('/deduction-bonuses')
        }
    }

    async edit(req ,res) {
        const id = req.params.id
        const model = await this.model.fetch(id)
        const employees = await this.employee_model.list()
        const errors = req.session.errors ? req.session.errors : []
        res.render(
            'hr-module/deductions-n-bonuses/edit',
            {...this.common_return ,model ,employees ,errors}
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
            req.session.alert_message = 'Deduction updated successfully in our data'
            res.redirect('/deduction-bonuses')
            req.session.errors = []
        }
    }
}