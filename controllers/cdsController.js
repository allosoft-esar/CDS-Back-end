const cdsModel = require('./../models/cdsModel')
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    get: async (req, res, next) => {
        try {
            let data = {};
            let select = "name method revision";
            if (req.params.id) {
                if (req.query.revision) {
                    data = await cdsModel.findOne({
                        _id: new ObjectId(req.params.id),
                    }, select).select({ revision: { $elemMatch: { label: req.query.revision } } })
                } else {
                    data = await cdsModel.findOne({
                        _id: new ObjectId(req.params.id),
                    }, select)
                }
                if (data.method != req.method) {
                    throw false
                }
            } else {
                data = await cdsModel.find({});
            }
            res.send(data)
        } catch (error) {
            next(error)
        }
    },
    getNewId: async (req, res, next) => {
        try {
            const data = new ObjectId();
            res.send(data)
        } catch (error) {
            next(error)
        }
    },
    search: async (req, res, next) => {
        try {
            const data = await cdsModel.find({ "name": { $regex: '.*' + req.body.name + '.*' } });
            res.send(data)
        } catch (error) {
            next(error)
        }
    },
    insert: async (req, res, next) => {
        try {
            let body = req.body
            body._id = new ObjectId(body._id)
            const cds = new cdsModel(body)
            const data = await cds.save()
            res.send(data)
        } catch (error) {
            next(error)
        }
    },
}
