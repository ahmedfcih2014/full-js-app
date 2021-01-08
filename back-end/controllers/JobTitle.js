// we need to write our logic here
export default {
    index: (req ,res) => {
        res.send('Job Titles Index')
    },

    create: (req ,res) => {
        res.send('Job Titles Create')
    },

    save: (req ,res) => {
        res.send('Job Titles Save')
    },

    edit: (req ,res) => {
        const id = req.params.id
        res.send('Job Title Edit #' + id)
    },

    update: (req ,res) => {
        const id = req.params.id
        res.send('Job Title Update #' + id)
    },

    delete: (req ,res) => {
        const id = req.params.id
        res.send('Job Title Delete #' + id)
    }
}