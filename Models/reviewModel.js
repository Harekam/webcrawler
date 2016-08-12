/**
 * Created by harekamsingh on 8/11/16.
 */
'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const review = new Schema({
    reviewId: {type: String, required: true, unique: true},
    reviewTitle: {type: String, required: true},
    reviewerName: {type: String, required: true},
    isDeleted: {type: Boolean, default: false},
    reviewDate: {type: Date, required: true},
    averageRating: {type: Number, required: true},
    maxRating: {type: Number, required: true},
    reviewDescription: {type: String, required: true}
}, {timestamps: {createdAt: 'reviewDate', updatedAt: 'reviewUpdatedAt'}});
module.exports = mongoose.model('reviews', review);