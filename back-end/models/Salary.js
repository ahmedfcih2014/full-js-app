import ModelBase from './ModelBase.js'

export default class Salary extends ModelBase {
    constructor() {
        super()
        this.table_name = 'salaries'
    }

    async list() {
        return this.joins_one_root_table(
            this.table_name,
            [
                {
                    name: this.table_name,
                    fields: [
                        {name: 'id', alias: 'id'},
                        {name: 'salary', alias: 'salary'},
                        {name: 'date_from', alias: 'date_from'},
                        {name: 'date_to', alias: 'date_to'}
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

    async create(salary) {
        return this.create_row(
            this.table_name ,[
                {key: 'employee_id' ,value: salary.employee_id},
                {key: 'salary' ,value: salary.salary},
                {key: 'date_from' ,value: salary.date_from},
                {key: 'date_to' ,value: salary.date_to},
                {key: 'deduction_amount' ,value: (salary.deduction_amount ? salary.deduction_amount : 0)},
                {key: 'bonus_amount' ,value: (salary.bonus_amount ? salary.bonus_amount : 0)},
                {key: 'advances_amount' ,value: (salary.advances_amount ? salary.advances_amount : 0)}
            ]
        )
    }

    async fetch(id) {
        return this.fetch_row(this.table_name ,id)
    }

    async update(id ,salary) {
        return this.update_row(
            this.table_name ,id ,[
                {key: 'employee_id' ,value: salary.employee_id},
                {key: 'salary' ,value: salary.salary},
                {key: 'date_from' ,value: salary.date_from},
                {key: 'date_to' ,value: salary.date_to},
                {key: 'deduction_amount' ,value: (salary.deduction_amount ? salary.deduction_amount : 0)},
                {key: 'bonus_amount' ,value: (salary.bonus_amount ? salary.bonus_amount : 0)},
                {key: 'advances_amount' ,value: (salary.advances_amount ? salary.advances_amount : 0)}
            ]
        )
    }
}