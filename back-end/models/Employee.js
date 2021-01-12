import ModelBase from './ModelBase.js'

export default class Employee extends ModelBase {
    constructor() {
        super()
        this.table_name = 'employees'
    }

    async list() {
        return this.joins_one_root_table(
            this.table_name,
            [
                {
                    name: this.table_name,
                    fields: [
                        {name: 'id', alias: 'id'},
                        {name: 'name', alias: 'name'},
                        {name: 'phone', alias: 'phone'},
                        {name: 'national_id', alias: 'national_id'},
                        {name: 'salary', alias: 'salary'}
                    ]
                },
                {
                    name: 'job_titles',
                    fields: [
                        {name: 'name_ar', alias: 'job_title_name'}
                    ]
                },
                {
                    name: 'emplyee_settings',
                    fields: [
                        {name: 'name', alias: 'setting_name'}
                    ]
                }
            ],
            [
                {joined_table: 'job_titles', foreign_key: 'job_title_id', primary_key: 'id'},
                {joined_table: 'emplyee_settings', foreign_key: 'setting_id', primary_key: 'id'}
            ]
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