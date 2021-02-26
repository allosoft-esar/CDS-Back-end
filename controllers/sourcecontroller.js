const sourceModel = require('./../models/sourceModel')
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    get: async (req, res, next) => {
        try {
            let data = null;
            if (req.params.id) {
                data = await sourceModel.findOne({
                    _id: new ObjectId(req.params.id)
                })
            } else {
                data = await sourceModel.find({});
            }
            res.send(data)
        } catch (error) {
            next(error)
        }
    },
    insert: async (req, res, next) => {
        try {
            let body = req.body
            body.cds = new ObjectId(body.cds)
            console.log(body);
            const source = new sourceModel(body)
            const data = await source.save()
            res.send(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    update: async (req, res, next) => {
        try {
            const body = req.body
            const data = await sourceModel.findOneAndUpdate({
                _id: new ObjectId(req.params.id)
            }, body, { new: true })
            res.send(data)
        } catch (error) {
            next(error)
        }
    },
    delete: async (req, res, next) => {
        try {
            const data = await sourceModel.findOneAndRemove({
                _id: new ObjectId(req.params.id)
            })
            res.send(data)
        } catch (error) {
            next(error)
        }
    }
}
