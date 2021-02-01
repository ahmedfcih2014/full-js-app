import JobTitleModel from '../repositories/JobTitleRepo.js'
import { validationResult } from 'express-validator'
import Pagination from './Pagination.js'
import { default_values } from '../../config.js'

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
        const admin = req.session.admin
        const page = req.query.page ? parseInt(req.query.page) : default_values.page
        const limit = req.query.limit ? parseInt(req.query.limit) : default_values.limit
        const [job_titles ,rows_number] = await this.model.list(page ,limit ,true)
        let alert_message = await req.consumeFlash('alert_message')
        const pages = Pagination(this.common_return.current_uri ,page ,rows_number ,limit)
        res.render(
            'hr-module/job-titles/index',
            {...this.common_return ,job_titles ,alert_message ,pages ,admin}
        )
    }

    async delete(req ,res) {
        const id = req.params.id
        const deleted = await this.model.destroy(id)
        if (deleted) {
            await req.flash('alert_message' ,'Job Title deleted successfully from our data')
            res.send({
                location: '/job-titles'
            })
        } else {
            res.send({message: 'server error'})
        }
    }

    create(req ,res) {
        const admin = req.session.admin
        const errors = req.session.errors ? req.session.errors : []
        res.render('hr-module/job-titles/create', {...this.common_return ,errors ,admin})
        req.session.errors = null
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
            await req.flash('alert_message' ,'Job Title stored successfully to our data')
            res.redirect('/job-titles')
        }
    }

    async edit(req ,res) {
        const admin = req.session.admin
        const id = req.params.id
        const model = await this.model.fetch(id)
        const errors = req.session.errors ? req.session.errors : []
        res.render('hr-module/job-titles/edit', {...this.common_return ,model ,errors ,admin})
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
            await req.flash('alert_message' ,'Job Title updated successfully in our data')
            res.redirect('/job-titles')
            req.session.errors = null
        }
    }
}