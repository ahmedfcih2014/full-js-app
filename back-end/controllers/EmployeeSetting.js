import EmployeeSettingModel from '../repositories/EmployeeSettingRepo.js'
import { validationResult } from 'express-validator'
import Pagination from './Pagination.js'
import { default_values } from '../../config.js'

export default class EmployeeSetting {
    constructor() {
        this.model = new EmployeeSettingModel
        this.common_return ={
            title: 'Employee Settings' ,current_uri: '/employee-settings' ,current_group: 'hr'
        }
    }

    async index(req ,res) {
        const admin = req.session.admin
        const page = req.query.page ? parseInt(req.query.page) : default_values.page
        const limit = req.query.limit ? parseInt(req.query.limit) : default_values.limit
        const [settings ,rows_number] = await this.model.list(page ,limit ,true)
        let alert_message = req.session.alert_message ? req.session.alert_message : false
        let is_danger = req.session.is_danger ? req.session.is_danger : false
        const pages = Pagination(this.common_return.current_uri ,page ,rows_number ,limit)
        res.render(
            'hr-module/employee-settings/index',
            {...this.common_return ,settings ,alert_message ,is_danger ,pages ,admin}
        )
        req.session.alert_message = ''
        req.session.is_danger = undefined
    }

    async delete(req ,res) {
        const id = req.params.id
        const deleted = await this.model.destroy(id)
        if (deleted) {
            req.session.alert_message = 'Employee Setting deleted successfully from our data'
            req.session.is_danger = true
            res.send({
                location: '/employee-settings'
            })
        } else {
            res.send({message: 'server error'})
        }
    }

    create(req ,res) {
        const admin = req.session.admin
        const errors = req.session.errors ? req.session.errors : []
        res.render('hr-module/employee-settings/create', {...this.common_return ,errors ,admin})
        req.session.errors = null
    }

    async store(req ,res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.session.errors = errors.array()
            res.redirect('back')
        } else {
            const setting = {
                yearly_vacations: req.body.yearly_vacations,
                weakly_vacations: req.body.weakly_vacations,
                work_day_start: req.body.work_day_start,
                work_day_end: req.body.work_day_end,
                name: req.body.name
            }
            await this.model.create(setting)
            req.session.alert_message = 'Employee Setting stored successfully to our data'
            res.redirect('/employee-settings')
        }
    }

    async edit(req ,res) {
        const admin = req.session.admin
        const id = req.params.id
        const setting = await this.model.fetch(id)
        const errors = req.session.errors ? req.session.errors : []
        res.render('hr-module/employee-settings/edit', {...this.common_return ,model: setting ,errors ,admin})
    }

    async update(req ,res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.session.errors = errors.array()
            res.redirect('back')
        } else {
            const id = req.params.id
            const setting = {
                yearly_vacations: req.body.yearly_vacations,
                weakly_vacations: req.body.weakly_vacations,
                work_day_start: req.body.work_day_start,
                work_day_end: req.body.work_day_end,
                name: req.body.name
            }
            await this.model.update(id ,setting)
            req.session.alert_message = 'Employee Setting updated successfully in our data'
            res.redirect('/employee-settings')
            req.session.errors = null
        }
    }
}