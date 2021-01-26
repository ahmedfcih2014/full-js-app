import SalaryModel from '../repositories/SalaryRepo.js'
import EmployeeModel from '../repositories/EmployeeRepo.js'
import { validationResult } from 'express-validator'
import Pagination from './Pagination.js'
import { default_values } from '../../config.js'

export default class Salaries {
    constructor() {
        this.model = new SalaryModel
        this.employee_model = new EmployeeModel
        this.common_return = {
            title: 'Salaries' ,current_uri: '/salaries' ,current_group: 'hr'
        }
    }

    async index(req ,res) {
        const admin = req.session.admin
        const page = req.query.page ? parseInt(req.query.page) : default_values.page
        const limit = req.query.limit ? parseInt(req.query.limit) : default_values.limit
        const [models ,rows_number] = await this.model.list(page ,limit ,true)
        let alert_message = req.session.alert_message ? req.session.alert_message : false
        let is_danger = req.session.is_danger ? req.session.is_danger : false
        const pages = Pagination(this.common_return.current_uri ,page ,rows_number ,limit)
        res.render(
            'hr-module/salaries/index',
            {...this.common_return ,models ,alert_message ,is_danger ,pages ,admin}
        )
        req.session.alert_message = ''
        req.session.is_danger = undefined
    }

    async delete(req ,res) {
        const id = req.params.id
        const deleted = await this.model.destroy(id)
        if (deleted) {
            req.session.alert_message = 'Salary deleted successfully from our data'
            req.session.is_danger = true
            res.send({
                location: '/salaries'
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
            'hr-module/salaries/create',
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
            const salary = {
                employee_id: req.body.employee_id,
                salary: req.body.salary,
                date_from: req.body.date_from,
                date_to: req.body.date_to,
                deduction_amount: req.body.deduction_amount,
                bonus_amount: req.body.bonus_amount,
                advances_amount: req.body.advances_amount
            }
            await this.model.create(salary)
            req.session.alert_message = 'Salary stored successfully to our data'
            res.redirect('/salaries')
        }
    }

    async edit(req ,res) {
        const id = req.params.id
        const salary = await this.model.fetch(id)
        const employees = await this.employee_model.list_all()
        const errors = req.session.errors ? req.session.errors : []
        const admin = req.session.admin
        res.render(
            'hr-module/salaries/edit',
            {...this.common_return ,model: salary ,employees ,errors ,admin}
        )
    }

    async update(req ,res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.session.errors = errors.array()
            res.redirect('back')
        } else {
            const id = req.params.id
            const salary = {
                employee_id: req.body.employee_id,
                salary: req.body.salary,
                date_from: req.body.date_from,
                date_to: req.body.date_to,
                deduction_amount: req.body.deduction_amount,
                bonus_amount: req.body.bonus_amount,
                advances_amount: req.body.advances_amount
            }
            await this.model.update(id ,salary)
            req.session.alert_message = 'Salary updated successfully in our data'
            res.redirect('/salaries')
            req.session.errors = null
        }
    }
}