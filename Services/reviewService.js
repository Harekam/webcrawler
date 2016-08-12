/**
 * Created by harekamsingh on 8/11/16.
 */
'use strict';
const DaoManager = require('./DaoManager');
const models = require('../Models');
const util = require('../Utilities/util');
const constants = require('../Config').CONSTANTS;
const MODEL = models.review;

function bulkUpsertReviews(data, callback) {
    let bulk = MODEL.collection.initializeUnorderedBulkOp();
    for (let i = 0, len = data.length; i < len; i++) {
        bulk.find({reviewId: data[i].reviewId}).upsert().update({$set: data[i]});
    }
    bulk.execute((err, res)=> {
        if (err) {
            console.error(err);
            return callback(err);
        }
        return callback(null, res);
    });
}

function getReviews(data, callback) {
    let query = {isDeleted: false};
    if (data.reviewId) {
        query.reviewId = data.reviewId;
        data.limit = 1;
        data.skip = 0;
    }
    DaoManager.getData(MODEL, query, {__v: 0, _id: 0}, {lean: true, limit: data.limit, skip: data.skip}, callback);
}
function getReviewsCount(data, callback) {
    let query = {isDeleted: false};
    if (data.reviewId)query.reviewId = data.reviewId;
    DaoManager.getCount(MODEL, query, callback);
}
function updateReviewById(data, callback) {
    let query = {reviewId: data.reviewId, isDeleted: false};
    delete data.reviewId;
    DaoManager.update(MODEL, query, data, {limit: 1, lean: true}, callback);
}
function deleteReviewById(data, callback) {
    let query = {reviewId: data.reviewId, isDeleted: false};
    DaoManager.update(MODEL, query, {isDeleted: true}, {limit: 1, lean: true}, callback);
}
module.exports = {
    bulkUpsertReviews,
    getReviews,
    getReviewsCount,
    updateReviewById,
    deleteReviewById
};