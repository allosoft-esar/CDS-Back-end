const mongoose = require('mongoose')
const schema = mongoose.Schema

const cdsSchema = new schema({
    _id: schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    method: {
        type: String,
        default: "GET"
    },
    description: {
        type: String
    },
    revision: [],
})

const cds = mongoose.model('cds', cdsSchema)
module.exports = cds