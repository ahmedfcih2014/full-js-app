import AdminORM from "../orm-models/Admin.js"

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
                    AdminORM.findAll({where: {username: value}}).then(models => {
                        if (value.length && models[0] == undefined) resolve()
                        reject()
                    })
                })
            }
        },
        errorMessage: 'Invalid username ,please enter a unique username'
    },
    password: {
        custom: {
            options: value => {
                return new Promise((resolve ,reject) => {
                    if (value.length >= 1) resolve()
                    reject()
                })
            }
        },
        errorMessage: 'Invalid password ,please enter a password'
    },
    is_super_admin: {
        in: ['0' ,'1'],
        errorMessage: 'Invalid super admin option'
    }
}