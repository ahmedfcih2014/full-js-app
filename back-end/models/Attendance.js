import ModelBase from './ModelBase.js'

export default class Attendance extends ModelBase {
    constructor() {
        super()
        this.table_name = 'attendance'
    }

    async list() {
        return this.joins_one_root_table(
            this.table_name,
            [
                {
                    name: this.table_name,
                    fields: [
                        {name: 'id', alias: 'id'},
                        {name: 'operation_date', alias: 'operation_date'},
                        {name: 'operation_type', alias: 'operation_type'}
                    ]
                },
                {
                    name: 'employees',
                    fields: [
                        {name: 'name', alias: 'employee_name'}
                    ]
                }
            ],
            [
                {joined_table: 'employees', foreign_key: 'employee_id', primary_key: 'id'}
            ]
        )
    }

    async destroy(id) {
        return this.delete_by_id(this.table_name ,id)
    }

    async create(attendance) {
        return this.create_row(
            this.table_name ,[
                {key: 'operation_date' ,value: attendance.operation_date},
                {key: 'operation_type' ,value: attendance.operation_type},
                {key: 'employee_id' ,value: attendance.employee_id}
            ]
        )
    }

    async fetch(id) {
        return this.fetch_row(this.table_name ,id)
    }

    async update(id ,attendance) {
        return this.update_row(
            this.table_name ,id ,[
                {key: 'operation_date' ,value: attendance.operation_date},
                {key: 'operation_type' ,value: attendance.operation_type},
                {key: 'employee_id' ,value: attendance.employee_id}
            ]
        )
    }
}