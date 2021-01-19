import EmployeeModel from '../repositories/EmployeeRepo.js'
import JobTitlesModel from '../repositories/JobTitleRepo.js'
import EmployeeSettingModel from '../repositories/EmployeeSettingRepo.js'
import { validationResult } from 'express-validator'

export default class Employee {
    constructor() {
        this.model = new EmployeeModel
        this.job_titles = new JobTitlesModel
        this.settings = new EmployeeSettingModel
    }

    async index(req ,res) {
        const models = await this.model.list()
        console.log(models[0])
        let alert_message = req.session.alert_message ? req.session.alert_message : false
        let is_danger = req.session.is_danger ? req.session.is_danger : false
        res.render(
            'hr-module/employees/index',
            {title: 'Employees' ,current_uri: '/employees' ,current_group: 'hr' ,employees: models ,alert_message ,is_danger}
        )
        req.session.alert_message = ''
        req.session.is_danger = undefined
    }

    async delete(req ,res) {
        const id = req.params.id
        const deleted = await this.model.destroy(id)
        if (deleted) {
            req.session.alert_message = 'Employee deleted successfully from our data'
            req.session.is_danger = true
            res.send({
                location: '/employees'
            })
        } else {
            res.send({message: 'server error'})
        }
    }

    async create(req ,res) {
        const errors = req.session.errors ? req.session.errors : []
        const titles = await this.job_titles.list()
        const settings = await this.settings.list()
        res.render(
            'hr-module/employees/create',
            {title: 'Employees' ,current_uri: '/employees' ,current_group: 'hr' ,titles ,settings ,errors}
        )
        req.session.errors = []
    }

    async store(req ,res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.session.errors = errors.array()
            res.redirect('back')
        } else {
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
            req.session.alert_message = 'Employee stored successfully to our data'
            res.redirect('/employees')
        }
    }

    async edit(req ,res) {
        const id = req.params.id
        const employee = await this.model.fetch(id)
        const titles = await this.job_titles.list()
        const settings = await this.settings.list()
        const errors = req.session.errors ? req.session.errors : []
        res.render(
            'hr-module/employees/edit',
            {title: 'Employees' ,current_uri: '/employees' ,current_group: 'hr' ,model: employee ,titles ,settings ,errors}
        )
    }

    async update(req ,res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.session.errors = errors.array()
            res.redirect('back')
        } else {
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
            req.session.alert_message = 'Employee updated successfully in our data'
            res.redirect('/employees')
            req.session.errors = []
        }
    }
}