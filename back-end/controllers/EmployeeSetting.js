import EmployeeSettingModel from '../repositories/EmployeeSettingRepo.js'
import { validationResult } from 'express-validator'

export default class EmployeeSetting {
    constructor() {
        this.model = new EmployeeSettingModel
    }

    async index(req ,res) {
        const models = await this.model.list()
        let alert_message = req.session.alert_message ? req.session.alert_message : false
        let is_danger = req.session.is_danger ? req.session.is_danger : false
        res.render(
            'hr-module/employee-settings/index',
            {title: 'Employee Settings' ,current_uri: '/employee-settings' ,current_group: 'hr' ,settings: models ,alert_message ,is_danger}
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
        const errors = req.session.errors ? req.session.errors : []
        res.render(
            'hr-module/employee-settings/create',
            {title: 'Employee Settings' ,current_uri: '/employee-settings' ,current_group: 'hr' ,errors}
        )
        req.session.errors = []
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
        const id = req.params.id
        const setting = await this.model.fetch(id)
        const errors = req.session.errors ? req.session.errors : []
        res.render(
            'hr-module/employee-settings/edit',
            {title: 'Employee Settings' ,current_uri: '/employee-settings' ,current_group: 'hr' ,model: setting ,errors}
        )
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
            req.session.errors = []
        }
    }
}