import ModelBase from './ModelBase.js'

export default class JobTitle extends ModelBase {
    constructor() {
        super()
        this.table_name = 'job_titles'
    }

    async list() {
        return this.get_all(
            this.table_name
        )
    }

    async destroy(id) {
        return this.delete_by_id(this.table_name ,id)
    }

    async create(job_title) {
        return this.create_row(
            this.table_name ,[
                {key: 'name_ar' ,value: job_title.name_ar},
                {key: 'name_en' ,value: job_title.name_en}
            ]
        )
    }

    async fetch(id) {
        return this.fetch_row(this.table_name ,id)
    }

    async update(id ,job_title) {
        return this.update_row(
            this.table_name ,id ,[
                {key: 'name_ar' ,value: job_title.name_ar},
                {key: 'name_en' ,value: job_title.name_en}
            ]
        )
    }
}