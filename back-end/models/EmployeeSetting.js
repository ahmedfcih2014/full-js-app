import ModelBase from './ModelBase.js'

export default class EmployeeSetting extends ModelBase {
    constructor() {
        super()
        this.table_name = 'emplyee_settings'
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
                {key: 'yearly_vacations' ,value: setting.yearly_vacations},
                {key: 'weakly_vacations' ,value: setting.weakly_vacations},
                {key: 'work_day_start' ,value: setting.work_day_start},
                {key: 'work_day_end' ,value: setting.work_day_end},
                {key: 'name' ,value: setting.name}
            ]
        )
    }

    async fetch(id) {
        return this.fetch_row(this.table_name ,id)
    }

    async update(id ,setting) {
        return this.update_row(
            this.table_name ,id ,[
                {key: 'yearly_vacations' ,value: setting.yearly_vacations},
                {key: 'weakly_vacations' ,value: setting.weakly_vacations},
                {key: 'work_day_start' ,value: setting.work_day_start},
                {key: 'work_day_end' ,value: setting.work_day_end},
                {key: 'name' ,value: setting.name}
            ]
        )
    }
}