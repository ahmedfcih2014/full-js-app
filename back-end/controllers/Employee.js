import EmployeeModel from '../repositories/EmployeeRepo.js'
import JobTitlesModel from '../repositories/JobTitleRepo.js'
import EmployeeSettingModel from '../repositories/EmployeeSettingRepo.js'
import { validationResult } from 'express-validator'
import Pagination from './Pagination.js'
import { default_values } from '../../config.js'

export default class Employee {
    constructor() {
        this.model = new EmployeeModel
        this.job_titles = new JobTitlesModel
        this.settings = new EmployeeSettingModel
        this.common_return = {title: 'Employees' ,current_uri: '/employees' ,current_group: 'hr'}
    }

    async index(req ,res) {
        const admin = req.session.admin
        const page = req.query.page ? parseInt(req.query.page) : default_values.page
        const limit = req.query.limit ? parseInt(req.query.limit) : default_values.limit
        const [employees ,rows_number] = await this.model.list(page ,limit ,true)
        let alert_message = await req.consumeFlash('alert_message')
        const pages = Pagination(this.common_return.current_uri ,page ,rows_number ,limit)
        res.render('hr-module/employees/index', {...this.common_return ,employees ,alert_message ,pages ,admin})
    }

    async delete(req ,res) {
        const id = req.params.id
        const deleted = await this.model.destroy(id)
        if (deleted) {
            await req.flash('alert_message' ,'Employee deleted successfully from our data')
            res.send({
                location: '/employees'
            })
        } else {
            res.send({message: 'server error'})
        }
    }

    async create(req ,res) {
        const admin = req.session.admin
        const errors = req.session.errors ? req.session.errors : []
        const titles = await this.job_titles.list_all()
        const settings = await this.settings.list_all()
        res.render('hr-module/employees/create', {...this.common_return ,titles ,settings ,errors ,admin})
        req.session.errors = null
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
            await req.flash('alert_message' ,'Employee stored successfully to our data')
            res.redirect('/employees')
        }
    }

    async edit(req ,res) {
        const admin = req.session.admin
        const id = req.params.id
        const model = await this.model.fetch(id)
        const titles = await this.job_titles.list_all()
        const settings = await this.settings.list_all()
        const errors = req.session.errors ? req.session.errors : []
        res.render('hr-module/employees/edit', {...this.common_return ,model ,titles ,settings ,errors ,admin})
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
            await req.flash('alert_message' ,'Employee updated successfully in our data')
            res.redirect('/employees')
            req.session.errors = null
        }
    }
}