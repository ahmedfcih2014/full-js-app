export default {
    name: {
        custom: {
            options: value => {
                return new Promise((resolve ,reject) => {
                    if (value.length >= 1) resolve()
                    reject()
                })
            }
        },
        errorMessage: 'Invalid name ,please enter a name'
    },
    work_day_end: {
        custom: {
            options: value => {
                return new Promise((resolve ,reject) => {
                    if (value.length >= 1) resolve()
                    reject()
                })
            }
        },
        errorMessage: 'Invalid Day End ,please select the time from calendar'
    },
    work_day_start: {
        custom: {
            options: value => {
                return new Promise((resolve ,reject) => {
                    if (value.length >= 1) resolve()
                    reject()
                })
            }
        },
        errorMessage: 'Invalid Day Start ,please select the time from calendar'
    },
    weakly_vacations: {
        isNumeric: true,
        errorMessage: 'Invalid Weakly Vacations ,please enter a valid number'
    },
    yearly_vacations: {
        isNumeric: true,
        errorMessage: 'Invalid Yearly Vacations ,please enter a valid number'
    }
}