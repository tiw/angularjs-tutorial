var mongodb = require('mongodb');
var format = require('util').format;
var Connection = mongodb.Connection;

exports.Db = mongodb.Db;
exports.Server = mongodb.Server;
var BSON = mongodb.BSONPure;



exports.DbMapper = function (db, collectionName) {
    var db = db;
    var collectionName = collectionName;

    this.findById = function (req, res) {
        console.log(collectionName);
        var id = req.params.id;
        db.collection(collectionName, function (err, collection) {
            if (err) {
                res.status(500);
                res.end();
            } else {
                collection.findOne({'_id':new BSON.ObjectID(id)}, function (err, item) {
                    if (err) {
                        res.status(500);
                        res.end();
                    } else {
                        res.send(item);
                    }
                });
            }
        });
    };

    this.findAll=function (req, res) {
        db.collection(collectionName, function (err, collection) {
            if (err) {
                res.status(500);
                res.end;
            } else {
                collection.find().toArray(function (err, items) {
                    res.status(200);
                    res.send(items);
                });
            }
        });
    };

    this.add = function (req, res) {
        var model = req.body;
        db.collection(collectionName, function (err, collection) {
            if (err) {
                res.status(500);
                res.end();
            }
            collection.insert(model, {safe:true}, function (err, result) {
                if (err) {
                    res.status(500);
                    res.end();
                } else {
                    res.status(201);
                    res.set('Location', '/' + collectionName + '/' + model._id);
                    res.end();
                }
            });
        });
    },

    this.update = function (req, res) {
        var id = req.params.id;
        var model = req.body;
        model._id = new BSON.ObjectID(model._id);
        db.collection(collectionName, function (err, collection) {
            if (err) {
                console.log(err);
                res.status(500);
                res.end();
            } else {
                //@todo: check if the content is there, if not return 204
                collection.update({'_id':new BSON.ObjectID(id)}, model, {safe:true}, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.end();
                    } else {
                        res.status(200);
                        res.send(model);
                    }
                });
            }
        });
    };

    this.delete = function (req, res) {
        var id = req.params.id;
        db.collection(collectionName, function (err, collection) {
            collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function (err, result) {
                if (err) {
                    res.status(500);
                    res.end();
                } else {
                    res.status(200);
                    res.end();
                }
            });
        });
    };
};
