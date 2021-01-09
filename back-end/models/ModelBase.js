import mysql from 'mysql2/promise'
import {db_config} from '../../config.js'

export default class ModelBase {
    async get_all(table_name ,fileds ,conditions) {
        let query = 'SELECT '
        if (fileds && typeof fileds[Symbol.iterator] === 'function') {
            fileds.forEach(filed => {
                query += `filed ,`
            })
            query = query.slice(0 ,-1)
        } else {
            query += '* '
        }
        query += `FROM ${table_name}`
        if (conditions && typeof conditions[Symbol.iterator] === 'function') {
            query += ` where `
            conditions.forEach(condition => {
                query += `${condition.key} ${condition.operator} '${condition.value}'`
            })
        }
        query += ` ORDER BY id DESC`
        const connection = await mysql.createConnection(db_config);
        const [rows] = await connection.execute(query);
        return rows
    }

    async delete_by_id(table_name ,id) {
        let query = `DELETE FROM ${table_name} WHERE id = ${id}`
        const connection = await mysql.createConnection(db_config);
        const [rows] = await connection.execute(query);
        return rows.affectedRows
    }

    async create_row(table_name ,data) {
        let query = `INSERT INTO ${table_name} `
        if (data && typeof data[Symbol.iterator] === 'function') {
            let fileds = '(' ,values = '('
            data.forEach(input => {
                fileds += `${input.key},`
                values += `'${input.value}',`
            })
            fileds = fileds.slice(0 ,-1)
            values = values.slice(0 ,-1)
            fileds += ')'
            values += ')'

            query += `${fileds} VALUES ${values}`
            const connection = await mysql.createConnection(db_config);
            const [rows] = await connection.execute(query);
            return rows.affectedRows
        }
        return 0
    }

    async fetch_row(table_name ,id) {
        let query = `SELECT * FROM ${table_name} WHERE id = ${id}`
        const connection = await mysql.createConnection(db_config);
        const [rows] = await connection.execute(query);
        return rows[0]
    }

    async update_row(table_name ,id ,data) {
        let query = `UPDATE ${table_name} SET `
        if (data && typeof data[Symbol.iterator] === 'function') {
            data.forEach(input => {
                query += `${input.key} = '${input.value}',`
            })
            query = query.slice(0 ,-1)
            query += ` WHERE id = ${id}`
            console.log(query)
            const connection = await mysql.createConnection(db_config);
            const [rows] = await connection.execute(query);
            return rows.affectedRows
        }
        return 0
    }
}