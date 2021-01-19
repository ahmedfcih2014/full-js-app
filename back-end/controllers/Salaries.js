import SalaryModel from '../repositories/SalaryRepo.js'
import EmployeeModel from '../repositories/EmployeeRepo.js'
import { validationResult } from 'express-validator'

export default class Salaries {
    constructor() {
        this.model = new SalaryModel
        this.employee_model = new EmployeeModel
    }

    async index(req ,res) {
        const models = await this.model.list()
        let alert_message = req.session.alert_message ? req.session.alert_message : false
        let is_danger = req.session.is_danger ? req.session.is_danger : false
        res.render(
            'hr-module/salaries/index',
            {title: 'Salaries' ,current_uri: '/salaries' ,current_group: 'hr' ,models ,alert_message ,is_danger}
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
        const errors = req.session.errors ? req.session.errors : []
        const employees = await this.employee_model.list()
        res.render(
            'hr-module/salaries/create',
            {title: 'Salaries' ,current_uri: '/salaries' ,current_group: 'hr' ,employees ,errors}
        )
        req.session.errors = []
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
        const employees = await this.employee_model.list()
        const errors = req.session.errors ? req.session.errors : []
        res.render(
            'hr-module/salaries/edit',
            {title: 'Salaries' ,current_uri: '/salaries' ,current_group: 'hr' ,model: salary ,employees ,errors}
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
            req.session.errors = []
        }
    }
}