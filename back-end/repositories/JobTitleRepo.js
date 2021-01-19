import JobTitleORM from '../orm-models/JobTitle.js'

export default class JobTitleRepo {
    async list() {
        const titles = await JobTitleORM.findAll()
        return titles
    }

    async destroy(id) {
        const deleted = await JobTitleORM.destroy({
            where: {
                id: id
            }
        })
        return deleted
    }

    async create(job_title) {
        const title = await JobTitleORM.create({...job_title})
        return title
    }

    async fetch(id) {
        const title = await JobTitleORM.findByPk(id)
        return title
    }

    async update(id ,job_title) {
        JobTitleORM
        .findByPk(id)
        .then(job => {
            job.update({...job_title})
            .then(res => 1)
            .catch(err => {
                console.log(err)
                return 0
            })
        })
        .catch(err => {
            console.log(err)
            return 0
        })
    }
}