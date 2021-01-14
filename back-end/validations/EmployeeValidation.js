export default {
    phone: {
        custom: {
            options: value => {
                return new Promise((resolve ,reject) => {
                    if (value.length >= 1) resolve()
                    reject()
                })
            }
        },
        errorMessage: 'Invalid phone ,please enter a valid phone number'
    },
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
    national_id: {
        custom: {
            options: value => {
                return new Promise((resolve ,reject) => {
                    if (value.length >= 1) resolve()
                    reject()
                })
            }
        },
        errorMessage: 'Invalid National ID ,please enter a valid National ID'
    },
    join_date: {
        custom: {
            options: value => {
                return new Promise((resolve ,reject) => {
                    if (value.length >= 1) resolve()
                    reject()
                })
            }
        },
        errorMessage: 'Invalid Join Date ,please select the date from calendar'
    },
    salary: {
        isNumeric: true,
        errorMessage: 'Invalid salary ,please enter a numeric value'
    },
    setting_id: {
        isNumeric: true,
        errorMessage: 'Invalid Employee Setting ,please select a setting from the drop down'
    },
    job_title_id: {
        isNumeric: true,
        errorMessage: 'Invalid Job Title ,please select a title from the drop down'
    }
}