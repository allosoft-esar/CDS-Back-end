const cdsModel = require('./../models/cdsModel')
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    get: async (req, res, next) => {
        try {
            let data = {};
            let select = "name method revision description";
            if (req.params.id) {
                const id = new ObjectId(req.params.id);

                if (req.query.revision) {
                    data = await cdsModel.aggregate([
                        {
                            $match: {
                                _id: id,
                            }
                        },
                        { $unwind: "$revision" },
                        {
                            $match: {
                                "revision.label": req.query.revision,
                            }
                        },
                        {
                            "$project": {
                                "name": 1,
                                "description": 1,
                                "revision": 1,
                                "method": 1
                            }
                        },
                    ])
                    data = await data[0]
                } else {
                    data = await cdsModel.findOne({
                        _id: id,
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
    getById: async (req, res, next) => {
        try {
            const data = await cdsModel.findOne({
                _id: new ObjectId(req.params.id),
            })
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
    update: async (req, res, next) => {
        try {
            const body = req.body
            const data = await cdsModel.findOneAndUpdate({
                _id: new ObjectId(req.params.id)
            }, body, { new: true })
            res.send(data)
        } catch (error) {
            next(error)
        }
    },
    delete: async (req, res, next) => {
        try {
            const data = await cdsModel.findOneAndRemove({
                _id: new ObjectId(req.params.id)
            })
            res.send(data)
        } catch (error) {
            next(error)
        }
    }
}
