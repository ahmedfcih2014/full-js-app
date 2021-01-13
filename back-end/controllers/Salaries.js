import SalaryModel from '../models/Salary.js'
import EmployeeModel from '../models/Employee.js'

export default class Salaries {
    constructor() {
        this.model = new SalaryModel
        this.employee_model = new EmployeeModel
    }

    async index(req ,res) {
        const models = await this.model.list()
        res.render(
            'hr-module/salaries/index',
            {title: 'Salaries' ,current_uri: '/salaries' ,current_group: 'hr' ,models}
        )
    }

    async delete(req ,res) {
        const id = req.params.id
        const deleted = await this.model.destroy(id)
        if (deleted) {
            res.send({
                location: '/salaries'
            })
        } else {
            res.send({message: 'server error'})
        }
    }

    async create(req ,res) {
        const employees = await this.employee_model.list()
        res.render(
            'hr-module/salaries/create',
            {title: 'Salaries' ,current_uri: '/salaries' ,current_group: 'hr' ,employees}
        )
    }

    async store(req ,res) {
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
        res.redirect('/salaries')
    }

    async edit(req ,res) {
        const id = req.params.id
        const salary = await this.model.fetch(id)
        const employees = await this.employee_model.list()
        res.render(
            'hr-module/salaries/edit',
            {title: 'Salaries' ,current_uri: '/salaries' ,current_group: 'hr' ,model: salary ,employees}
        )
    }

    async update(req ,res) {
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
        res.redirect('/salaries')
    }
}