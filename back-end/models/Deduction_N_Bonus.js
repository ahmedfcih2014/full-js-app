import ModelBase from './ModelBase.js'

export default class Deduction_N_Bonus extends ModelBase {
    constructor() {
        super()
        this.table_name = 'deductions_n_bonuses'
    }

    async list() {
        return this.joins_one_root_table(
            this.table_name,
            [
                {
                    name: this.table_name,
                    fields: [
                        {name: 'id', alias: 'id'},
                        {name: 'operation_amount', alias: 'operation_amount'},
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
                {key: 'operation_amount' ,value: attendance.operation_amount},
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
                {key: 'operation_amount' ,value: attendance.operation_amount},
                {key: 'operation_type' ,value: attendance.operation_type},
                {key: 'employee_id' ,value: attendance.employee_id}
            ]
        )
    }
}