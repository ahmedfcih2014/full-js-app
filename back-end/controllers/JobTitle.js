import JobTitleModel from '../models/JobTitle.js'

export default class JobTitle {
    constructor() {
        this.model = new JobTitleModel
    }

    async index(req ,res) {
        const job_titles = await this.model.list()
        res.render(
            'hr-module/job-titles/index',
            {title: 'Job Titles' ,current_uri: '/job-titles' ,current_group: 'hr' ,job_titles: job_titles}
        )
    }

    async delete(req ,res) {
        const id = req.params.id
        const deleted = await this.model.destroy(id)
        if (deleted) {
            res.send({
                location: '/job-titles'
            })
        } else {
            res.send({message: 'server error'})
        }
    }

    create(req ,res) {
        res.render(
            'hr-module/job-titles/create',
            {title: 'Job Titles' ,current_uri: '/job-titles' ,current_group: 'hr'}
        )
    }

    async store(req ,res) {
        const job_title = {
            name_en: req.body.name_en,
            name_ar: req.body.name_ar
        }
        await this.model.create(job_title)
        res.redirect('/job-titles')
    }

    async edit(req ,res) {
        const id = req.params.id
        const job_title = await this.model.fetch(id)
        res.render(
            'hr-module/job-titles/edit',
            {title: 'Job Titles' ,current_uri: '/job-titles' ,current_group: 'hr' ,model: job_title}
        )
    }

    async update(req ,res) {
        const id = req.params.id
        const job_title = {
            name_en: req.body.name_en,
            name_ar: req.body.name_ar
        }
        await this.model.update(id ,job_title)
        res.redirect('/job-titles')
    }
}