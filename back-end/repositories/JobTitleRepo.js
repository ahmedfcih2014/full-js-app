import JobTitleORM from '../orm-models/JobTitle.js'

export default class JobTitleRepo {
    async list(page = 1 ,limit = 10 ,desc_order = false) {
        page = page <= 1 ? 1 : page
        const order = desc_order ? [['id' ,'desc']] : []
        const options = {
            order: order,
            limit,
            offset: page * limit - limit
        }
        const _titles = await JobTitleORM.findAndCountAll(options)
        return [_titles.rows ,_titles.count]
    }

    async list_all() {
        return await JobTitleORM.findAll()
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