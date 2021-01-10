import EmployeeSettingModel from '../models/EmployeeSetting.js'

export default class EmployeeSetting {
    constructor() {
        this.model = new EmployeeSettingModel
    }

    async index(req ,res) {
        const models = await this.model.list()
        res.render(
            'hr-module/employee-settings/index',
            {title: 'Employee Settings' ,current_uri: '/employee-settings' ,current_group: 'hr' ,settings: models}
        )
    }

    async delete(req ,res) {
        const id = req.params.id
        const deleted = await this.model.destroy(id)
        if (deleted) {
            res.send({
                location: '/employee-settings'
            })
        } else {
            res.send({message: 'server error'})
        }
    }

    create(req ,res) {
        res.render(
            'hr-module/employee-settings/create',
            {title: 'Employee Settings' ,current_uri: '/employee-settings' ,current_group: 'hr'}
        )
    }

    async store(req ,res) {
        const setting = {
            yearly_vacations: req.body.yearly_vacations,
            weakly_vacations: req.body.weakly_vacations,
            work_day_start: req.body.work_day_start,
            work_day_end: req.body.work_day_end,
            name: req.body.name
        }
        await this.model.create(setting)
        res.redirect('/employee-settings')
    }

    async edit(req ,res) {
        const id = req.params.id
        const setting = await this.model.fetch(id)
        res.render(
            'hr-module/employee-settings/edit',
            {title: 'Employee Settings' ,current_uri: '/employee-settings' ,current_group: 'hr' ,model: setting}
        )
    }

    async update(req ,res) {
        const id = req.params.id
        const setting = {
            yearly_vacations: req.body.yearly_vacations,
            weakly_vacations: req.body.weakly_vacations,
            work_day_start: req.body.work_day_start,
            work_day_end: req.body.work_day_end,
            name: req.body.name
        }
        await this.model.update(id ,setting)
        res.redirect('/employee-settings')
    }
}