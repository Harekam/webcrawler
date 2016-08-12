/**
 * Created by harekamsingh on 8/11/16.
 */
'use strict';
const async = require('async'),
    Osmosis = require('osmosis'),
    Services = require('../Services'),
    util = require('../Utilities/util'),
    config = require('../Config'),
    ERROR_MESSAGES = config.RESPONSE_MESSAGES.ERROR_MESSAGES;

function crawlReviews(payload, callbackRoute) {
    async.auto({
        crawl: (callback)=> {
            let arrUrl = payload.url.split('.');
            if ((payload.url.indexOf('http://www.reviewcentre.com') !== 0) ||
                (arrUrl[arrUrl.length - 1] && arrUrl[arrUrl.length - 1].toLowerCase() !== 'html')) {
                return callback(ERROR_MESSAGES.INVALID_REVIEW_CENTRE_URL);
            }
            let arrReviews = [];
            let count = 0;
            let osmosis = new Osmosis(payload.url);
            osmosis
                .paginate('#PaginationNext-reviews', payload.numberOfPagesCrawl - 1)
                .find('div.ReviewCommentContentRight :nth-child(3) > a')
                .follow('@href')
                .set({
                    reviewTitle: '#PageTitle',
                    averageRating: '#ItemRating :nth-child(1)',
                    maxRating: '#ItemRating :nth-child(2)',
                    reviewerName: '#ItemMainContent > div > h2 > span :nth-child(1)',
                    reviewId: '.ReviewCommentWrapper@id',
                    reviewDate: 'div.ReviewCommentContentRight > p :nth-child(1)',
                    reviewDescription: 'div.ReviewCommentContentRight :nth-child(3)'
                }).then((context, data, next, done) => {

                if (count === payload.numberOfReviewsCrawl) {
                    osmosis.stop();
                    return callback(null, arrReviews);
                }
                else {
                    next(context, data);
                    done();
                }
            })
                .data((listing)=> {
                    listing.reviewId = listing.reviewId.replace('ReviewBox-', '');
                    listing.isDeleted = false;
                    listing.reviewerName = listing.reviewerName || 'Anonymous';
                    listing.reviewDate = util.convertStringDateToDate(listing.reviewDate, 'DD/MM/YYYY');
                    listing.averageRating = parseFloat(listing.averageRating);
                    listing.maxRating = parseFloat(listing.maxRating);
                    count++;
                    arrReviews.push(listing);

                }).done(()=> {
                return callback(null, arrReviews);
            })
                .error((err)=> {
                    return callback(err);
                }).run();

        },
        insert: ['crawl', (callback, results)=> {
            if (!util.isEmpty(results.crawl)) {
                return Services.reviewService.bulkUpsertReviews(results.crawl, callback);
            }
            return callback(null);
        }]
    }, (err, results)=> {
        if (err)return callbackRoute(util.createErrorResponse(err));
        return callbackRoute(null, util.createSuccessResponse(`${results.crawl.length} review(s) crawled.`));
    })
}
function getCrawledReviews(queryParams, callbackRoute) {
    async.auto({
        totalReviews: (callback)=> {
            Services.reviewService.getReviewsCount(queryParams, callback);
        },
        reviews: (callback)=> {
            Services.reviewService.getReviews(queryParams, callback);
        }
    }, (err, results)=> {
        if (err)return callbackRoute(util.createErrorResponse(err));
        return callbackRoute(null, util.createSuccessResponse(null, null, results));
    })
}
function updateReview(reviewId, payload, callbackRoute) {
    async.auto({
            reviews: (callback)=> {
                if (util.isEmpty(payload))return callback(ERROR_MESSAGES.PARAMETER_MISSING);

                Services.reviewService.updateReviewById(Object.assign(payload, {reviewId}), (err, res)=> {
                    if (err)return callback(err);
                    if (res.n === 0)return callback(ERROR_MESSAGES.INVALID_ID);
                    return callback(null);
                });
            }
        },
        (err, results)=> {
            if (err)return callbackRoute(util.createErrorResponse(err));
            return callbackRoute(null, util.createSuccessResponse(null, null, results));
        })
}
function deleteReview(payload, callbackRoute) {
    async.auto({
            reviews: (callback)=> {
                Services.reviewService.deleteReviewById(payload, (err, res)=> {
                    if (err)return callback(err);
                    if (res.n === 0)return callback(ERROR_MESSAGES.INVALID_ID);
                    return callback(null);
                });
            }
        },
        (err, results)=> {
            if (err)return callbackRoute(util.createErrorResponse(err));
            return callbackRoute(null, util.createSuccessResponse(null, null, results));
        })
}
module.exports = {
    crawlReviews,
    getCrawledReviews,
    updateReview,
    deleteReview
};