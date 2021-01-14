export default {
    operation_amount: {
        isNumeric: true,
        errorMessage: 'Invalid Operation Amount ,its must be a numeric value'
    },
    operation_type: {
        in: ['deduction' ,'bonus'],
        errorMessage: 'Invalid Operation Type ,its must be one of those values (deduction or bonus)'
    },
    employee_id: {
        isNumeric: true,
        errorMessage: 'Invalid Employee ,please select an employee from the drop down'
    }
}