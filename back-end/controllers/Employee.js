import EmployeeModel from '../models/Employee.js'
import JobTitlesModel from '../models/JobTitle.js'
import EmployeeSettingModel from '../models/EmployeeSetting.js'

export default class Employee {
    constructor() {
        this.model = new EmployeeModel
        this.job_titles = new JobTitlesModel
        this.settings = new EmployeeSettingModel
    }

    async index(req ,res) {
        const models = await this.model.list()
        res.render(
            'hr-module/employees/index',
            {title: 'Employees' ,current_uri: '/employees' ,current_group: 'hr' ,employees: models}
        )
    }

    async delete(req ,res) {
        const id = req.params.id
        const deleted = await this.model.destroy(id)
        if (deleted) {
            res.send({
                location: '/employees'
            })
        } else {
            res.send({message: 'server error'})
        }
    }

    async create(req ,res) {
        const titles = await this.job_titles.list()
        const settings = await this.settings.list()
        res.render(
            'hr-module/employees/create',
            {title: 'Employees' ,current_uri: '/employees' ,current_group: 'hr' ,titles ,settings}
        )
    }

    async store(req ,res) {
        const employee = {
            name: req.body.name,
            national_id: req.body.national_id,
            join_date: req.body.join_date,
            salary: req.body.salary,
            job_title_id: req.body.job_title_id,
            setting_id: req.body.setting_id,
            phone: req.body.phone
        }
        await this.model.create(employee)
        res.redirect('/employees')
    }

    async edit(req ,res) {
        const id = req.params.id
        const employee = await this.model.fetch(id)
        const titles = await this.job_titles.list()
        const settings = await this.settings.list()
        res.render(
            'hr-module/employees/edit',
            {title: 'Employees' ,current_uri: '/employees' ,current_group: 'hr' ,model: employee ,titles ,settings}
        )
    }

    async update(req ,res) {
        const id = req.params.id
        const employee = {
            name: req.body.name,
            national_id: req.body.national_id,
            join_date: req.body.join_date,
            salary: req.body.salary,
            job_title_id: req.body.job_title_id,
            setting_id: req.body.setting_id,
            phone: req.body.phone
        }
        await this.model.update(id ,employee)
        res.redirect('/employees')
    }
}