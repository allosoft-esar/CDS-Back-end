const cdsModel = require('./../models/cdsModel')
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    get: async (req, res, next) => {
        try {
            let data = {};
            let select = "name revision description";
            if (req.params.id) {
                const id = new ObjectId(req.params.id);

                if (req.query.revision) {
                    data = await cdsModel.aggregate([
                        {
                            $match: {
                                _id: id,
                                method: req.method
                            }
                        },
                        { $unwind: "$revision" },
                        {
                            $match: {
                                "revision.label": req.query.revision,
                            }
                        },
                        {
                            $addFields: {
                                value: "$revision.value",
                                dataSet: "$revision.dataSet"
                            }
                        },
                        {
                            "$project": {
                                "name": 1,
                                "description": 1,
                                "value": 1,
                                "dataSet": 1
                            }
                        },
                    ])
                    data = await data[0]
                } else {
                    data = await cdsModel.findOne({
                        _id: id,
                        method: req.method
                    }, select)
                }
            } else {
                data = await cdsModel.find({});
            }
            if (data) {
                res.send(data)
            } else {
                throw false;
            }
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
