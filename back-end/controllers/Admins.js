import AdminModel from '../repositories/AdminRepo.js'
import { validationResult } from 'express-validator'
import Pagination from './Pagination.js'
import { default_values ,system_screens } from '../../config.js'
import AdminPermissionsORM from '../orm-models/AdminPermissions.js'
import bcrypt from 'bcrypt'

const saltRounds = 10

export default class Admins {
    constructor() {
        this.model = new AdminModel
        this.common_return = {
            title: 'Admins' ,current_uri: '/admins' ,current_group: ''
        }
    }

    async index(req ,res) {
        const admin = req.session.admin
        const page = req.query.page ? parseInt(req.query.page) : default_values.page
        const limit = req.query.limit ? parseInt(req.query.limit) : default_values.limit
        const [models ,rows_number] = await this.model.list(page ,limit ,true)
        let alert_message = req.session.alert_message ? req.session.alert_message : false
        let is_danger = req.session.is_danger ? req.session.is_danger : false
        const pages = Pagination(this.common_return.current_uri ,page ,rows_number ,limit)
        res.render(
            'admins/index',
            {...this.common_return ,models ,alert_message ,is_danger ,pages ,admin}
        )
        req.session.alert_message = ''
        req.session.is_danger = undefined
    }

    async delete(req ,res) {
        const id = req.params.id
        const deleted = await this.model.destroy(id)
        if (deleted) {
            req.session.alert_message = 'Admin deleted successfully from our data'
            req.session.is_danger = true
            res.send({
                location: '/admins'
            })
        } else {
            res.send({message: 'server error'})
        }
    }

    async create(req ,res) {
        const admin = req.session.admin
        const errors = req.session.errors ? req.session.errors : []
        res.render(
            'admins/create',
            {...this.common_return ,errors ,admin ,system_screens}
        )
        req.session.errors = null
    }

    async store(req ,res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.session.errors = errors.array()
            res.redirect('back')
        } else {
            const admin = {
                name: req.body.name,
                username: req.body.username,
                password: await bcrypt.hash(req.body.password ,saltRounds),
                is_super_admin: req.body.is_super_admin
            }
            const admin_model = await this.model.create(admin)
            try {
                const permissions = Object.entries(req.body.permissions)
                permissions.forEach(permission => {
                    const screen_name = permission[0]
                    const actions = permission[1]
                    AdminPermissionsORM.create({
                        screen_name: screen_name,
                        admin_id: admin_model.id,
                        view_permission: actions.view ? 1 : 0,
                        add_permission: actions.add ? 1 : 0,
                        edit_permission: actions.edit ? 1 : 0,
                        delete_permission: actions.delete ? 1 : 0
                    })
                })
            } catch (err) {}
            req.session.alert_message = 'Admin stored successfully to our data'
            res.redirect('/admins')
        }
    }

    async edit(req ,res) {
        const admin = req.session.admin
        const id = req.params.id
        const model = await this.model.fetch(id)
        const permissions = []
        model.admin_permissions.forEach(permission => {
            const perm_index = system_screens.findIndex(screen => screen.db_name === permission.screen_name)
            system_screens[perm_index].view = permission.view_permission
            system_screens[perm_index].add = permission.add_permission
            system_screens[perm_index].edit = permission.edit_permission
            system_screens[perm_index].delete = permission.delete_permission
        })
        const errors = req.session.errors ? req.session.errors : []
        res.render(
            'admins/edit',
            {...this.common_return ,model ,errors ,admin ,system_screens ,permissions}
        )
    }

    async update(req ,res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.session.errors = errors.array()
            res.redirect('back')
        } else {
            const id = req.params.id
            const admin = {}
            if (req.body.name) admin.name = req.body.name
            if (req.body.username) admin.username = req.body.username
            if (req.body.password) {
                admin.password = await bcrypt.hash(req.body.password ,saltRounds)
            }
            if (req.body.is_super_admin) admin.is_super_admin = req.body.is_super_admin
            const [model ,updated] = await this.model.update(id ,admin)
            await AdminPermissionsORM.destroy({where: {admin_id: id}})
            try {
                const permissions = Object.entries(req.body.permissions)
                permissions.forEach(permission => {
                    const screen_name = permission[0]
                    const actions = permission[1]
                    AdminPermissionsORM.create({
                        screen_name: screen_name,
                        admin_id: model.id,
                        view_permission: actions.view ? 1 : 0,
                        add_permission: actions.add ? 1 : 0,
                        edit_permission: actions.edit ? 1 : 0,
                        delete_permission: actions.delete ? 1 : 0
                    })
                })
            } catch (err) {}
            req.session.alert_message = 'Admin updated successfully in our data'
            res.redirect('/admins')
            req.session.errors = null
        }
    }
}