export default {
    operation_amount: {
        isNumeric: true,
        errorMessage: 'Invalid Operation Amount ,its must be a numeric value'
    },
    operation_type: {
        in: ['withdraw' ,'deposit'],
        errorMessage: 'Invalid Operation Type ,its must be one of those values (withdraw or deposit)'
    },
    employee_id: {
        isNumeric: true,
        errorMessage: 'Invalid Employee ,please select an employee from the drop down'
    }
}