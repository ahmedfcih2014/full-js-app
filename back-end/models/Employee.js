import ModelBase from './ModelBase.js'

export default class Employee extends ModelBase {
    constructor() {
        super()
        this.table_name = 'employees'
    }

    async list() {
        return this.get_all(
            this.table_name
        )
    }

    async destroy(id) {
        return this.delete_by_id(this.table_name ,id)
    }

    async create(setting) {
        return this.create_row(
            this.table_name ,[
                {key: 'name' ,value: setting.name},
                {key: 'national_id' ,value: setting.national_id},
                {key: 'join_date' ,value: setting.join_date},
                {key: 'salary' ,value: setting.salary},
                {key: 'job_title_id' ,value: setting.job_title_id},
                {key: 'setting_id' ,value: setting.setting_id},
                {key: 'phone' ,value: setting.phone}
            ]
        )
    }

    async fetch(id) {
        return this.fetch_row(this.table_name ,id)
    }

    async update(id ,setting) {
        return this.update_row(
            this.table_name ,id ,[
                {key: 'name' ,value: setting.name},
                {key: 'national_id' ,value: setting.national_id},
                {key: 'join_date' ,value: setting.join_date},
                {key: 'salary' ,value: setting.salary},
                {key: 'job_title_id' ,value: setting.job_title_id},
                {key: 'setting_id' ,value: setting.setting_id},
                {key: 'phone' ,value: setting.phone}
            ]
        )
    }
}