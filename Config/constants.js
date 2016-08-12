/**
 * Created by harekam on 26/08/15.
 */
'use strict';

const STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    DO_NOT_PROCESS: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_FAILURE: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    ALREADY_EXISTS_CONFLICT: 409,
    UNSUPPORTED_MEDIA_TYPE: 415,
    SERVER_ERROR: 500
};
const TIME_UNITS = {
    MONTHS: 'months',
    MILLI: 'milli',
    HOURS: 'hours',
    MINUTES: 'minutes',
    YEARS: 'years',
    SECONDS: 'seconds',
    WEEKS: 'weeks',
    DAYS: 'days'
};

const SORT_ORDER = {
    ASC: 'ASC',
    DESC: 'DESC'
};
const SOCKET_EVENTS = {
    'ERROR': 'fatal error',
    'UNREAD_LAST_MESSAGE': 'unread last message',
    'SEND_LOCATION': 'send location',
    'SEND_MESSAGE': 'send message',
    'CONNECT_WITH_RECIPIENT': 'connect with recipient',
    'DISCONNECT_WITH_RECIPIENT': 'disconnect from recipient',
    'NEW_MESSAGE': 'new message',
    'ACTIVITY_STATUS_UPDATE': 'send activity status update',
    'FETCH_ACTIVITY_STATUS_UPDATE': 'fetch activity status update',
    'FETCH_LOCATION': 'fetch location',
    'DISCONNECT': 'disconnect',
    'UNAUTHORIZED': 'unauthorized',
    'AUTHENTICATION': 'authentication',
    'AUTHENTICATED': 'authenticated',
    'CONNECTION': 'connection',
    'NEW_NOTIFICATION': 'new notification'
};
const supportedImageFormats = {
    jpg: true,
    png: true,
    tif: true,
    bmp: true,
    gif: true,
    webp: true,
    psd: true,
    jxr: true
};
const supportedVideoFormats = {
    'video/mp4': 'mp4',
    mp4: true,
    mkv: true,
    webm: true,
    mov: true,
    avi: true,
    wmv: true,
    mpg: true,
    flv: true
};
const supportedDocumentFormats = {
    pdf: true,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/msword': 'doc',
    jpg: true,
    png: true,
    tif: true,
    bmp: true,
    webp: true,
    psd: true,
    jxr: true
};
const DATE_FORMAT = 'DD-MM-YYYY';
const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm';
const READABLE_DATETIME_FORMAT = "dddd, MMMM Do YYYY, hh:mm A";
const TIMEZONE_INDIA = "Asia/Kolkata";
const JAVASCRIPT_TIMESTAMP_FORMAT = 'YYYY/MM/DD HH:mm';

const ONE_DAY_MILLI = 8.64e+7;
const DEFAULT_LIMIT = 100;
const REGEX = {
    SPECIAL_CHAR_REMOVAL: /[^A-Z0-9]/ig,
    OBJECT_ID: /^[0-9a-fA-F]{24}$/,
    ALPHA_SPACE_DOT: /^[a-zA-Z\s\.]+$/,
    PHONE_NUMBER: /^[1-9][0-9]*$/,
    NUMBER_ONLY: /^[0-9]+$/,
    OTP_NUMBER: /^[0-9]*$/,
    YEAR_NUMBER_ONLY: /^[1-9][0-9]*$/,
    ALPHABET_ONLY: /^[a-zA-Z ]*$/
};
const REVIEW_CRAWL_DEFAULT = 20;
const PAGE_CRAWL_DEFAULT = 1;

module.exports = {
    REGEX,
    REVIEW_CRAWL_DEFAULT,
    PAGE_CRAWL_DEFAULT,
    supportedImageFormats,
    supportedDocumentFormats,
    supportedVideoFormats,
    TIME_UNITS,
    DATE_FORMAT,
    TIMESTAMP_FORMAT,
    SORT_ORDER,
    SOCKET_EVENTS,
    STATUS_CODE,
    TIMEZONE_INDIA,
    DEFAULT_LIMIT,
    READABLE_DATETIME_FORMAT,
    JAVASCRIPT_TIMESTAMP_FORMAT,
    ONE_DAY_MILLI
};