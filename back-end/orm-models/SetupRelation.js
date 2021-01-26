import JobTitle from './JobTitle.js'
import Employee from './Employee.js'
import Advance from './Advance.js'
import Attendance from './Attendance.js'
import Deduction_N_Bonus from './Deduction_N_Bonus.js'
import EmployeeSetting from './EmployeeSetting.js'
import Salary from './Salary.js'
import Admin from './Admin.js'
import AdminPermissions from './AdminPermissions.js'

export default () => {
    Employee.belongsTo(JobTitle ,{
        foreignKey: 'job_title_id'
    })

    Employee.belongsTo(EmployeeSetting ,{
        foreignKey: 'setting_id'
    })

    Advance.belongsTo(Employee ,{
        foreignKey: 'employee_id'
    })

    Attendance.belongsTo(Employee ,{
        foreignKey: 'employee_id'
    })

    Deduction_N_Bonus.belongsTo(Employee ,{
        foreignKey: 'employee_id'
    })

    Salary.belongsTo(Employee ,{
        foreignKey: 'employee_id'
    })

    Admin.hasMany(AdminPermissions ,{
        foreignKey: 'admin_id'
    })
}