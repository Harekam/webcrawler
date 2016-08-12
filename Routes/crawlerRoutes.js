/**
 * Created by harekamsingh on 8/10/16.
 */
'use strict';
const controllers = require('../Controller'),
    webCrawlerController = controllers.webCrawlerController,
    config = require('../Config'),
    CONSTANTS = config.CONSTANTS,
    Joi = require('joi'),
    util = require('../Utilities/util'),
    TAGS = ['api', 'review'];
let DefaultResponse = config.RESPONSE_MESSAGES.DefaultResponse;

const addAdminsInCmm = {

    method: 'POST',
    path: '/api/v1/review/crawl',
    config: {
        description: 'crawl reviews',
        tags: ['api', 'review', 'crawler'],
        handler: (request, reply) => {
            webCrawlerController.crawlReviews(request.payload, (error, success)=> {

                if (error)
                    return reply(error.response).code(error.statusCode);

                return reply(success.response).code(success.statusCode);

            });
        },
        validate: {
            payload: {
                numberOfReviewsCrawl: Joi.number().integer().default(CONSTANTS.REVIEW_CRAWL_DEFAULT).min(1),
                numberOfPagesCrawl: Joi.number().integer().default(CONSTANTS.PAGE_CRAWL_DEFAULT).min(1),
                url: Joi.string().required().trim()

            },
            failAction: util.failActionFunction
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form',
                responses: new DefaultResponse()
            }
        }

    }
};

const getReviews = {

    method: 'GET',
    path: '/api/v1/review',
    config: {
        description: 'get reviews',
        tags: TAGS,
        handler: (request, reply) => {
            webCrawlerController.getCrawledReviews(request.query, (error, success)=> {

                if (error)
                    return reply(error.response).code(error.statusCode);

                return reply(success.response).code(success.statusCode);

            });
        },
        validate: {
            query: {
                skip: Joi.number().integer().default(0).min(0),
                limit: Joi.number().integer().default(CONSTANTS.DEFAULT_LIMIT).min(1),
                reviewId: Joi.string().optional().trim()

            },
            failAction: util.failActionFunction
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form',
                responses: new DefaultResponse()
            }
        }

    }
};
const updateReview = {

    method: 'PUT',
    path: '/api/v1/review/{reviewId}',
    config: {
        description: 'update review',
        tags: TAGS,
        handler: (request, reply) => {
            webCrawlerController.updateReview(request.params.reviewId, request.payload, (error, success)=> {

                if (error)
                    return reply(error.response).code(error.statusCode);

                return reply(success.response).code(success.statusCode);

            });
        },
        validate: {
            params: {
                reviewId: Joi.string().required().trim()
            },
            payload: {
                reviewTitle: Joi.string().optional().trim(),
                reviewerName: Joi.string().optional().trim(),
                reviewDate: Joi.date().optional().format(CONSTANTS.DATE_FORMAT).description(CONSTANTS.DATE_FORMAT),
                averageRating: Joi.number().optional().min(0),
                maxRating: Joi.number().optional().min(0),
                reviewDescription: Joi.string().optional().trim()

            },
            failAction: util.failActionFunction
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form',
                responses: new DefaultResponse()
            }
        }

    }
};
const deleteReview = {

    method: 'DELETE',
    path: '/api/v1/review/{reviewId}',
    config: {
        description: 'delete review',
        tags: TAGS,
        handler: (request, reply) => {
            webCrawlerController.deleteReview(request.params, (error, success)=> {

                if (error)
                    return reply(error.response).code(error.statusCode);

                return reply(success.response).code(success.statusCode);

            });
        },
        validate: {
            params: {
                reviewId: Joi.string().required().trim()
            },
            failAction: util.failActionFunction
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form',
                responses: new DefaultResponse()
            }
        }

    }
};

module.exports = [
    addAdminsInCmm,
    getReviews,
    updateReview,
    deleteReview
];

// var url = "http://www.reviewcentre.com/reviews83409.html";
// var Osmosis = require('osmosis');
// var arr = [];
// var count = 0;
// var osmosis = new Osmosis(url);
//
// osmosis
//     .paginate('#PaginationNext-reviews', 0)
//     .find('div.ReviewCommentContentRight :nth-child(3) > a')
//     .follow('@href')
//     .set({
//         reviewTitle: '#PageTitle',
//         rating: '#ItemRating :nth-child(1)',
//         maxRating: '#ItemRating :nth-child(2)',
//         reviewerName: '#ItemMainContent > div > h2 > span :nth-child(1)',
//         reviewId: '.ReviewCommentWrapper@id',
//         reviewDate: 'div.ReviewCommentContentRight > p :nth-child(1)',
//         reviewDescription: 'div.ReviewCommentContentRight :nth-child(3)'
//     }).then(function (context, data, next, done) {
//
//     if (count === 2) {
//         osmosis.stop();
//
//         console.error(arr);
//     }
//     else {
//         next(context, data);
//         done();
//     }
//     })
//     .data(function (listing) {
//         count++;
//         arr.push(listing);
//
//     }).done(function () {
//     console.log(arr);
//     })
//     .log(console.log)
//     .error(console.log)
//     .debug(console.log).run();
