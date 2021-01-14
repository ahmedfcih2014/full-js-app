export default {
    employee_id: {
        isNumeric: true,
        errorMessage: 'Invalid Employee ,please select an employee from the drop down'
    },
    salary: {
        isNumeric: true,
        errorMessage: 'Invalid Salary ,please enter a numeric value'
    },
    date_from: {
        custom: {
            options: value => {
                return new Promise((resolve ,reject) => {
                    if (value.length >= 1) resolve()
                    reject()
                })
            }
        },
        errorMessage: 'Invalid Date From ,please select the date from calendar'
    },
    date_to: {
        custom: {
            options: value => {
                return new Promise((resolve ,reject) => {
                    if (value.length >= 1) resolve()
                    reject()
                })
            }
        },
        errorMessage: 'Invalid Date To ,please select the date from calendar'
    },
    deduction_amount: {
        isNumeric: true,
        errorMessage: 'Invalid Deduction Amount ,please enter a numeric value'
    },
    bonus_amount: {
        isNumeric: true,
        errorMessage: 'Invalid Bonus Amount ,please enter a numeric value'
    },
    advances_amount: {
        isNumeric: true,
        errorMessage: 'Invalid Advances Amount ,please enter a numeric value'
    }
}