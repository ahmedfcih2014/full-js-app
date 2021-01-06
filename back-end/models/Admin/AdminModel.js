import mysql_promise from 'mysql2/promise'
import Admin from './Admin.js'

export default class AdminModel {
    async list(limit = 10) {

    }

    async get(id) {

    }

    async insert(admin) {
        if (!admin instanceof Admin) throw 'admin most be an Admin object'

    }

    async update(admin) {
        if (!admin instanceof Admin) throw 'admin most be an Admin object'

    }

    async delete(id) {

    }
}