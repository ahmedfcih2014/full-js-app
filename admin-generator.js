import bcrypt from 'bcrypt'
import Admin from './back-end/models/Admin.js'

const model = new Admin

const password = 'secret'
const saltRounds = 10

bcrypt.hash(password ,saltRounds ,async (err ,hashedPassword) => {
    if (err) throw err
    let valid = true
    await model.create({
        name: 'New Admin 3',
        username: 'admin3',
        password: hashedPassword
    })
    .catch(err => {
        valid = false
        console.log('make sure you use a unique username')
    })
    console.log(valid ? 'Work Done' : 'There an exception when proceed a DB query')
    process.exit()
})