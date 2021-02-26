const mongoose = require('mongoose')
const schema = mongoose.Schema

const sourceSchema = new schema({
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
    headers: [],
    body: [],
    queryParams: [],
    cds: {
        type: schema.Types.ObjectId,
        ref: "cds"
    },
    schedule: {
        type: {
            type: String,
            default: "year"
        }, //year, month, day
        date: Date,
        time: {
            hours: Number,
            minutes: Number,
        },
        note: String
    }
})

const source = mongoose.model('source', sourceSchema)
module.exports = source