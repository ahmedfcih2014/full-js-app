import AdvanceModel from '../models/Advance.js'
import EmployeeModel from '../models/Employee.js'

export default class Advances {
    constructor() {
        this.model = new AdvanceModel
        this.employee_model = new EmployeeModel
    }

    async index(req ,res) {
        const models = await this.model.list()
        res.render(
            'hr-module/advances/index',
            {title: 'Advances' ,current_uri: '/advances' ,current_group: 'hr' ,models}
        )
    }

    async delete(req ,res) {
        const id = req.params.id
        const deleted = await this.model.destroy(id)
        if (deleted) {
            res.send({
                location: '/advances'
            })
        } else {
            res.send({message: 'server error'})
        }
    }

    async create(req ,res) {
        const employees = await this.employee_model.list()
        res.render(
            'hr-module/advances/create',
            {title: 'Advances' ,current_uri: '/advances' ,current_group: 'hr' ,employees}
        )
    }

    async store(req ,res) {
        const deduction = {
            operation_amount: req.body.operation_amount,
            operation_type: req.body.operation_type,
            employee_id: req.body.employee_id
        }
        await this.model.create(deduction)
        res.redirect('/advances')
    }

    async edit(req ,res) {
        const id = req.params.id
        const model = await this.model.fetch(id)
        const employees = await this.employee_model.list()
        res.render(
            'hr-module/advances/edit',
            {title: 'Advances' ,current_uri: '/advances' ,current_group: 'hr' ,model ,employees}
        )
    }

    async update(req ,res) {
        const id = req.params.id
        const deduction = {
            operation_amount: req.body.operation_amount,
            operation_type: req.body.operation_type,
            employee_id: req.body.employee_id
        }
        await this.model.update(id ,deduction)
        res.redirect('/advances')
    }
}