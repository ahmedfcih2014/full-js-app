export default {
    operation_date: {
        custom: {
            options: value => {
                return new Promise((resolve ,reject) => {
                    if (value.length >= 1) resolve()
                    reject()
                })
            }
        },
        errorMessage: 'Invalid Operation Date ,please select the date from calendar'
    },
    operation_type: {
        in: ['attendance', 'leave'],
        errorMessage: 'Invalid Operation Type ,its must be one of those values (attendance or leave)'
    },
    employee_id: {
        isNumeric: true,
        errorMessage: 'Invalid Employee ,please select an employee from the drop down'
    }
}