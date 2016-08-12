/**
 * Created by harekam on 27/08/15.
 */
'use strict';
/*
 ----------------------------------------
 GET DATA
 ----------------------------------------
 */
exports.getData = function (model, query, projection, options, callback) {
    model.find(query, projection, options, (err, data) => {
        if (err) {
            console.error("Get Data", err);
            return callback(err);
        }
        return callback(null, data);
    });
};

/*
 ----------------------------------------
 AGGREGATE DATA
 ----------------------------------------
 */
exports.aggregateData = function (model, group, callback) {
    model.aggregate(group, (err, data) => {

        if (err) {
            console.error("Aggregate Data", err);
            return callback(err);
        }
        return callback(null, data);
    });
};
/*
 ----------------------------------------
 AGGREGATE DATA
 ----------------------------------------
 */
exports.aggregateDataWithPopulate = function (model, group, populateOptions, callback) {
    model.aggregate(group, (err, data) => {

        if (err) {
            console.error("Aggregate Data", err);
            return callback(err);
        }

        model.populate(data, populateOptions,
            function (err, populatedDocs) {

                if (err) return callback(err);
                return callback(null, populatedDocs);// This object should now be populated accordingly.
            });
        //return callback(null, data);
    });
};


/*
 ----------------------------------------
 SET DATA
 ----------------------------------------
 */
exports.setData = function (model, data, callback) {

    new model(data).save((err, resultData)=> {

        if (err) {
            console.error("SET DATA: ", err);
            return callback(err);
        }

        let result = resultData.toObject();
        delete result.__v;
        callback(null, result);

    });
};


/*
 ----------------------------------------
 DELETE DATA
 ----------------------------------------
 */
exports.deleteData = function (model, conditions, callback) {

    model.remove(conditions, (err, removed) => {

        if (err) {
            console.error("Delete Data", err);
            return callback(err);
        }
        return callback(null, removed);


    });
};

/*
 ----------------------------------------
 BATCH INSERT
 ----------------------------------------
 */
exports.batchInsert = function (model, batchData, options, callback) {
    model.collection.insert(batchData, options, (error, docs) => {

        if (error) {
            console.error("Batch insert:", error);
            return callback(error);
        }

        return callback(null, docs);

    });
};


exports.getCount = function (model, condition, callback) {
    model.count(condition, (error, count)=> {
        if (error) {
            console.error("Error Get Count: ", error);
            return callback(error);
        }
        return callback(null, count);
    })
};

/*
 ----------------------------------------
 UPDATE DATA
 ----------------------------------------
 */
exports.update = function (model, conditions, update, options, callback) {
    model.update(conditions, update, options, (err, result)=> {

        if (err) {
            console.error("Update Query: ", err);
            return callback(err);
        }
        console.log("Update Result: ", JSON.stringify(result));
        return callback(null, result);

    });
};

/*
 ---------------------------------------------------------------------------------------------
 WARNING: Not a general module just for category-sub-service tree or for three level tree only
 ---------------------------------------------------------------------------------------------
 */
exports.getDataDeepPopulateThreeLevel = function (model, query, projectionQuery, options, populateModel, nestedModel, callback) {

    model.find(query, projectionQuery, options).populate(populateModel)
        .exec((err, docs) => {

            if (err) return callback(err);

            model.populate(docs, nestedModel,
                (err, populatedDocs) => {
                    if (err) return callback(err);
                    callback(null, populatedDocs);// This object should now be populated accordingly.
                });
        });
};
/*
 ---------------------------------------------------------------------------------------------
 WARNING: Not a general module just for category-sub-service-subService tree or for four level tree only
 ---------------------------------------------------------------------------------------------
 */
exports.getDataDeepPopulateFourLevel = function (model, query, projectionQuery, options, populateModel, nestedModel, deepNestedModel, callback) {

    model.find(query, projectionQuery, options).populate(populateModel)
        .exec((err, docs) => {

            if (err) return callback(err);

            model.populate(docs, nestedModel,
                (err, populatedDocs) => {

                    if (err) return callback(err);
                    model.populate(populatedDocs, deepNestedModel,
                        (err, deepPopulatedDocs) => {
                            if (err) return callback(err);
                            callback(null, deepPopulatedDocs);
                        });
                });
        });
};

exports.getDistinctData = function (model, field, condition, callback) {
    model.distinct(field, condition, (error, result)=> {
        if (error) {
            console.error("Distinct Data", error);
            return callback(error);
        }
        return callback(null, result);
    })
};

exports.findOneAndUpdateData = function (model, conditions, update, options, callback) {
    model.findOneAndUpdate(conditions, update, options, (error, result)=> {
        if (error) {
            console.error("Find one and update", error);
            return callback(error);
        }
        return callback(null, result);
    })
};

/*
 ----------------------------------------
 GET DATA WITH REFERENCE
 ----------------------------------------
 */
exports.getDataWithReference = function (model, query, projection, options, collectionOptions, callback) {
    model.find(query, projection, options).populate(collectionOptions).exec((err, data) => {

        if (err) {
            console.error("Error Data reference: ", err);
            return callback(err);
        }
        return callback(null, data);

    });
};