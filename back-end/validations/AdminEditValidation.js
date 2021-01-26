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
    username: {
        custom: {
            options: value => {
                return new Promise((resolve ,reject) => {
                    if (value.length >= 1) resolve()
                    reject()
                })
            }
        },
        errorMessage: 'Invalid username ,please enter a username'
    },
    is_super_admin: {
        in: ['0' ,'1'],
        errorMessage: 'Invalid super admin option'
    }
}