import JobTitleModel from '../models/JobTitle.js'
import { validationResult } from 'express-validator'

export default class JobTitle {
    constructor() {
        this.model = new JobTitleModel
    }

    async index(req ,res) {
        const job_titles = await this.model.list()
        let alert_message = req.session.alert_message ? req.session.alert_message : false
        let is_danger = req.session.is_danger ? req.session.is_danger : false
        res.render(
            'hr-module/job-titles/index',
            {title: 'Job Titles' ,current_uri: '/job-titles' ,current_group: 'hr' ,job_titles ,alert_message ,is_danger}
        )
        req.session.alert_message = ''
        req.session.is_danger = undefined
    }

    async delete(req ,res) {
        const id = req.params.id
        const deleted = await this.model.destroy(id)
        if (deleted) {
            req.session.alert_message = 'Job Title deleted successfully from our data'
            req.session.is_danger = true
            res.send({
                location: '/job-titles'
            })
        } else {
            res.send({message: 'server error'})
        }
    }

    create(req ,res) {
        const errors = req.session.errors ? req.session.errors : []
        res.render(
            'hr-module/job-titles/create',
            {title: 'Job Titles' ,current_uri: '/job-titles' ,current_group: 'hr' ,errors}
        )
        req.session.errors = []
    }

    async store(req ,res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.session.errors = errors.array()
            res.redirect('back')
        } else {
            const job_title = {
                name_en: req.body.name_en,
                name_ar: req.body.name_ar
            }
            await this.model.create(job_title)
            req.session.alert_message = 'Job Title stored successfully to our data'
            res.redirect('/job-titles')
        }
    }

    async edit(req ,res) {
        const id = req.params.id
        const job_title = await this.model.fetch(id)
        const errors = req.session.errors ? req.session.errors : []
        res.render(
            'hr-module/job-titles/edit',
            {title: 'Job Titles' ,current_uri: '/job-titles' ,current_group: 'hr' ,model: job_title ,errors}
        )
    }

    async update(req ,res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.session.errors = errors.array()
            res.redirect('back')
        } else {
            const id = req.params.id
            const job_title = {
                name_en: req.body.name_en,
                name_ar: req.body.name_ar
            }
            await this.model.update(id ,job_title)
            req.session.alert_message = 'Job Title updated successfully in our data'
            res.redirect('/job-titles')
            req.session.errors = []
        }
    }
}