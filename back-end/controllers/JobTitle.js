import JobTitleModel from '../repositories/JobTitleRepo.js'
import { validationResult } from 'express-validator'

export default class JobTitle {
    constructor() {
        this.model = new JobTitleModel
        this.common_return = {
            title: 'Job Titles' ,
            current_uri: '/job-titles' ,
            current_group: 'hr'
        }
    }

    async index(req ,res) {
        const page = req.query.page ? parseInt(req.query.page) : 1
        const limit = req.query.limit ? parseInt(req.query.limit) : 1
        const [job_titles ,rows_number] = await this.model.list(page ,limit ,true)
        let alert_message = req.session.alert_message ? req.session.alert_message : false
        let is_danger = req.session.is_danger ? req.session.is_danger : false
        const pages = []
        const pages_count = Math.ceil(rows_number / limit)
        const set_medium_btn = pages_count > 6 ? true : false
        for(let i = 0; i < pages_count; i++) {
            if (set_medium_btn && (i + 1) == 4) {
                pages.push({
                    link: '#',
                    name: '...',
                    disable: true
                })
                i = pages_count - 3
            } else {
                pages.push({
                    link: this.common_return.current_uri + '?page=' + (i + 1) + '&limit=' + limit,
                    name: (i + 1),
                    is_active: page == (i + 1) ? true : false
                })
            }
        }
        res.render(
            'hr-module/job-titles/index',
            {...this.common_return ,job_titles ,alert_message ,is_danger ,pages}
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
        res.render('hr-module/job-titles/create', {...this.common_return ,errors})
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
        const model = await this.model.fetch(id)
        const errors = req.session.errors ? req.session.errors : []
        res.render('hr-module/job-titles/edit', {...this.common_return ,model ,errors})
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