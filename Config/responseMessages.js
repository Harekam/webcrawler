/**
 * Created by harekam on 27/08/15.
 */

'use strict';
const CONSTANTS = require('./constants');
let Joi = require('joi');

const ERROR_MESSAGES = {
    'SOMETHING_WRONG': 'Something went wrong.',
    'INVALID_REQUEST': 'Invalid Request.',
    'BANK_DETAILS_UNAPPROVED': 'Your bank details have not been yet approved.',
    'BANK_DETAILS_MISSING': 'You have not filled your bank details.',
    'EMAIL_NOT_SENT': 'Error while sending email, please try again later.',
    'INVALID_TIMEZONE': 'Invalid timezone.',
    'INVALID_OLD_PASSWORD': 'Invalid old password.',
    'LOCATION_NO_SERVICE': 'At the moment, TempClick is serving zip codes in San Diego County, California.',
    'NO_LOCATION_ADDED': 'Please add your location to proceed.',
    'NO_CARD_ADDED': 'Please add your card details to proceed.',
    'EMAIL_UPDATE_NOT_ALLOWED': 'Email update is not allowed.',
    'PHONE_UPDATE_NOT_ALLOWED': 'Phone number update is not allowed.',
    'DATA_NOT_FOUND': 'Data not found.',
    'NO_DATA_UPDATED': 'No data updated.',
    'INVALID_JOB_ID': 'Invalid job id',
    'NO_NEW_JOB_OFFERS': 'No job offers found.',
    'OTP_FAIL': 'Failed to send OTP on given email address and phone number.',
    'OTP_FAIL_EMAIL': 'Failed to send OTP on given email address.',
    'OTP_FAIL_PHONE': 'Failed to send OTP on given phone number.',
    'PARAMETER_MISSING': 'Parameters missing.',
    'PARENT_DETAILS_MISSING': 'Parent/Guardian details are required.',
    'OLD_PASSWORD_MISSING': 'Old password is required in order to change the password.',
    'NEW_PASSWORD_MISSING': 'New password is required in order to change the password.',
    'EXPERIENCE_MONTH': 'Experience in months missing.',
    'EXPERIENCE_YEAR': 'Experience in years missing.',
    'PHONE_AUTH_FAIL': 'You are not authorize to perform this action on this phone number.',
    'SERVING_LOCATION_NOT_EXITS': 'This serving location does not exists',
    'WRONG_PARAMETER': 'Wrong parameter.',
    'INVALID_CLINIC_INDEX': 'Invalid clinic index in ',
    'CLINIC_BLOCK_NEGATIVE_INDEX': 'Negative clinic index slot should be blocked.',
    'WAGE_MISSING': 'Wage is required.',
    'WAGE_OUT_OF_RANGE': 'Wage should be between',
    'INVALID_RANGE_ERROR': 'Invalid range.',
    'UPLOAD_ERROR': 'Error in uploading.',
    'DUPLICATE_ENTRY': 'Duplicate Entry.',
    'DUPLICATE_EMAIL': 'Duplicate email id.',
    'DUPLICATE_PHONE': 'Duplicate phone number.',
    'DUPLICATE_SLOT': 'Duplicate slot on ',
    'PRACTICE_NOT_EXISTS': 'Practice with this id does not exists.',
    'INVALID_ID': 'Invalid ID.',
    'INVALID_SYMPTOM_ID': 'Invalid symptom Id.',
    'INVALID_DOCTOR_CLINIC_ID': 'Invalid doctor clinic Id.',
    'INVALID_DOCTOR_ID': 'Invalid doctor Id.',
    'INVALID_PATIENT_MEMBER_ID': 'Invalid patient member id.',
    'INVALID_PATIENT_ID': 'Invalid patient id.',
    'PATIENT_NOT_APPOINTED': 'You can only refer those patient who have appointment history with you.',
    'ALREADY_REFER_DOCTOR_PATIENT': 'You have already referred.',
    'INVALID_REQUEST_ID': 'Invalid request id.',
    'INVALID_CARD_ID': 'Invalid card ID.',
    'INVALID_APPOINTMENT_ID': 'Invalid appointment ID.',
    'INVALID_CLINIC_ID': 'Invalid clinic ID.',
    'INVALID_PROOF_ID': 'Invalid proof ID.',
    'INVALID_CITY_ID': 'Invalid city ID.',
    'INVALID_DEGREE_ID': 'Invalid degree ID.',
    'INVALID_PRACTICE_ID': 'Invalid practice ID.',
    'INVALID_SPECIALITY_ID': 'Invalid speciality ID.',
    'INVALID_COLLEGE_ID': 'Invalid college ID.',
    'INVALID_EMPLOYEE_ID': 'Invalid employee id.',
    'INVALID_EMAIL_VERIFY_ID': 'Invalid email verification request id',
    'INVALID_FORGET_PASS_REQ_ID': 'Invalid reset password request id',
    'PHONE_NUMBER_ALREADY_EXISTS': 'Phone number already exists.',
    'PHONE_NUMBER_NOT_EXISTS': 'Phone number does not exists.',
    'EMAIL_NOT_EXISTS': 'Email does not exists.',
    'PHONE_NUMBER_NOT_FOUND': "Couldn't find the phone number.",
    'SP_NOT_RANGE': 'No Service provider in range',
    'SERVICE_PROVIDER_BOOKED_ALREADY': 'Service provider already booked.',
    'EMAIL_ALREADY_EXISTS': 'Email already exists.',
    'EMPLOYEE_NOT_AVAIL': 'Oops! It seems no one is available.',
    'EMAIL_ALREADY_VERIFIED': 'Email already verified.',
    'PHONE_ALREADY_VERIFIED': 'Phone number already verified.',
    'EMAIL_VERIFY_REQUEST_EXPIRE': 'Email verification request expired.',
    'RESET_PASS_REQUEST_EXPIRE': 'Reset password request expired.',
    'ALREADY_REPORTED_ABUSE': 'You have already reported abuse.',
    'ALREADY_REPLIED': 'You have already replied.',
    'LOGIN_ERROR': 'Invalid credentials.',
    'USER_NOT_FOUND': 'User not found.',
    'PHONE_VERIFY_FAIL': 'Phone number verification Failed.',
    'EMAIL_VERIFY_FAIL': 'Email verification Failed.',
    'PHONE_EMAIL_VERIFY_FAIL': 'Phone number and email verification failed.',
    'INVALID_PASSWORD': 'Invalid password.',
    'LOGIN_ERROR_EMAIL': 'This email address does not exists in our records.',
    'LOGIN_ERROR_PHONE': 'This phone number does not exists in our records.',
    'OTP_EXPIRED': 'OTP expired.',
    'USER_BLOCKED': 'You have been blocked by admin please contact support.',
    'PASSWORD_CHANGE_REQUEST_EXPIRE': 'Password change request has been expired.',
    'PASSWORD_CHANGE_REQUEST_INVALID': 'Invalid password change request.',
    'OLD_PASS_WRONG': 'Invalid old password.',
    'IMAGE_FORMAT_NOT_SUPPORTED': 'Unsupported image format.',
    'VIDEO_FORMAT_NOT_SUPPORTED': 'Unsupported video format.',
    'DOCUMENT_FORMAT_NOT_SUPPORTED': 'Unsupported document format.',
    'FEATURE_NOT_SUPPORTED': 'This feature in not supported yet.',
    'ERROR_ON_REGISTER_ADMIN': 'An error occurred while registering the admin, please try again later.',
    'ACCESS_DENIED': 'Access Denied.',
    'ALREADY_MARKED_HELPFUL': 'Already marked helpful.',
    'ALREADY_MARKED_UNHELPFUL': 'Already marked unhelpful.',
    'BOOKING_ALREADY_EXISTS_SLOT': 'You already have booking on this slot.',
    'SLOT_NO_CLINIC': 'This slot has no reference to any clinic.',
    'SLOT_CLINIC_REF': ' slot already has a reference to a clinic.',
    'GROUP_ADD_MEMBERS_INVALID': 'You can only add doctors you are connected with.',
    'NOTIFY_FAIL': 'Notification fail.',
    'FB_AUTH_TOKEN_MISSING': 'Facebook auth token is required.',
    'INVALID_FB_SESSION': 'Invalid facebook session.',
    'MINIMUM_REPORT_TIME': 'Minimum reporting time should be after ',
    'ALREADY_REGISTERED_SOCIAL': 'Already registered with this social account.',
    'VERIFY_EMAIL': 'Please verify email to proceed.',
    'ACTION_NOT_ALLOWED': 'You are not allowed to perform this action.',
    'VIDEO_INIT_DOCTOR_ONLY': 'Only doctor can initiate the video session.',
    'DOCTOR_NOT_APPROVED_CONNECT': 'You can only connect with approved doctors.',
    'DOCTOR_ALREADY_CMM_ADDED': '{{doctorName}} is already registered with cmm.',
    'ALREADY_MARKED_NO_SHOW': 'You have already marked no show in this appointment.',
    'ALREADY_MARKED_COMPLETED': 'You have already marked this appointment completed.',
    'ALREADY_MARKED_REACHED': 'You have already marked this appointment.',
    'ALREADY_JOB_ACCEPTED': 'Oops!!, it seems someone else accepted this job.',
    'ALREADY_REQUEST_ACCEPTED': 'You have already accepted this request.',
    'ONLY_PENDING_JOB_DELETE': 'You can only delete jobs in initial stages.',
    'HIRE_ERROR': 'You cannot hire this worker right now.',
    'YOU_NOT_AVAILABLE': 'You are not available on this job timings.',
    'YOU_JOB_COMMIT': 'You already have a committed job.',
    'EMPLOYEE_NOT_AVAILABLE': 'Employee seems to be busy on this job timings now.',
    'JOB_ALREADY_ACCEPTED': 'You have already accepted the job.',
    'JOB_ALREADY_DECLINED': 'You have already declined the job.',
    'APPROVED_PROFILE_ERROR': 'Only under review or declined profile status can be approved.',
    'DECLINE_PROFILE_ERROR': 'Only under review or approved profile status can be declined.',
    'UNDER_REVIEW_PROFILE_ERROR': 'Only declined or approved profile status can be set with status under review.',
    'ALREADY_BLOCKED': 'User already blocked.',
    'ALREADY_SLOT_BLOCKED': 'Slot already blocked.',
    'INVALID_SLOT': 'Invalid slot.',
    'ALREADY_SLOT_UNBLOCKED': 'Slot already unblocked.',
    'ALREADY_CONNECTED': 'You are already connected with this doctor.',
    'POST_ALREADY_LIKED': 'You have already liked this post.',
    'FEED_ALREADY_LIKED': 'You have already liked this feed.',
    'FEED_NOT_LIKED': 'You have not liked this feed.',
    'INVALID_POST_ID': 'Invalid post id.',
    'USER_NOT_CONNECTED': 'You need to be connected with recipient.',
    'ALREADY_RATED': 'User already rated.',
    'ALREADY_BOOKED_SLOT': 'Oops! It seems someone else booked this slot.',
    'ALL_SLOT_EMPTY': 'All slots are empty, select at least one.',
    'DOCTOR_SLOT_UNAVAILABLE': 'No slots available for this day.',
    'ALREADY_DELETED_JOB': 'Job already deleted.',
    'INVALID_DATE': 'Invalid date.',
    'INVALID_INVITATION': 'Invitation not valid.',
    'SAME_BOOKED_SLOT': 'Booking is already on these timings.',
    'ALREADY_UNBLOCKED': 'User already unblocked.',
    'ORGANIZATION_SIZE_REQUIRED': 'Organization size is required.',
    'INVALID_EMAIL': "Invalid email id.",
    'INVALID_USER_ID': "Invalid user id.",
    'INVALID_INDUSTRY_ID': "Invalid industry id.",
    'ACTION_NO_AUTH': "You are not authorize to perform this action.",
    'BACKGROUND_VERIFY_DECLINE': "You need to complete the verification.",
    'PROFILE_DETAILS_ALREADY_SUBMITTED': "Profile details have been already submitted.",
    'BOOK_PAST_DATE': "Cannot create booking of past.",
    'USER_ALREADY_SAME_CALL_STATUS': 'User already have same call status.',
    'CARD_ADD_ERROR': "Couldn't add card, verify your card details or try again later.",
    'CARD_ALREADY_DEFAULT': "This card is already set as default card.",
    'CARD_DELETE_ERROR': "Couldn't delete card, please try again later.",
    'CUSTOMER_DELETE_ERROR': "Couldn't delete account, please try again later.",
    'CARD_DELETE_ONE': "Please set other card as default card to delete this one.",
    'PAYMENT_ERROR': "Payment fail, please try again later."
};
const SUCCESS_MESSAGES = {
    'REGISTRATION_SUCCESSFUL': 'You are Registered successfully.',
    'JOB_POST_SUCCESSFUL': 'Job posted successfully.',
    'EMAIL_SENT': 'Email sent successfully.',
    'EMAIL_VERIFIED': 'Email verified successfully.',
    'PASSWORD_RESET_SUCCESS': 'Password reset successfully.',
    'DETAILS_SUBMITTED': 'Details submitted successfully.',
    'BANK_DETAILS_PENDING': 'Your bank details are being verified.',
    'SUCCESSFULLY_ADDED': 'Successfully added.',
    'ACTION_COMPLETE': 'Action complete.',
    'BASIC_INFO_ADDED': 'Basic info added successfully.',
    'PROFILE_DETAILS_ADDED': 'Profile details added successfully.',
    'PASS_LINK_SENT': 'Reset password link has been sent to the email id.',
    'LOGIN_SUCCESSFULLY': 'Logged in successfully.',
    'LOGOUT_SUCCESSFULLY': 'Logged out successfully.',
    'VALID_REQUEST': 'Valid request.',
    'CATEGORY_ADDED': 'Category added.',
    'SUBCATEGORY_ADDED': 'Subcategory added.',
    'SERVICE_ADDED': 'Service added.',
    'SUB_SERVICE_ADDED': 'Sub-service added.',
    'SERVING_LOCATION_ADDED': 'Serving Location added.',
    'APPOINTMENT_CREATED': 'Appointment created successfully.',
    'ATTACHMENT_UPLOAD': 'Attachment Uploaded successfully.'
};
const SOCKET_DEFAULT_MESSAGES = {
    'AUTH_FAIL': 'You are not authorize.',
    'AUTH_SUCCESS': 'You are authorized.',
    'INVALID_DATA': 'Invalid data.',
    'MSG_FAIL': 'Message not sent.',
    'COMM_NOT_AVAIL': "Sorry! no communicator available, we'll get back to you asap.",
    'USER_NOT_FOUND': 'User not found.',
    'REQUEST_FAIL': 'Request fail.',
    'FILE_UPLOAD_ERROR': 'File could not be uploaded.',
    'FILE_NOT_BUFFER': 'Only buffer is allowed.',
    'FILE_TYPE_ERROR': 'File type not supported.',
    'FILE_SIZE_EXCEED': 'File size too large.',
    'SOMETHING_WRONG': "Oops! something went wrong."
};
const ERROR_CODES = {
    PAYMENT_FAIL: 1,
    EMAIL_SENT_FAIL: 2,
    PHONE_SENT_FAIL: 3,
    PHONE_EMAIL_SENT_FAIL: 4
};
const SUCCESS_CODES = ERROR_CODES;//Error and success codes should be unique all across
let SWAGGER_DEFAULT_RESPONSE_MESSAGES = {};
SWAGGER_DEFAULT_RESPONSE_MESSAGES[CONSTANTS.STATUS_CODE.OK] = {'description': 'OK'};
SWAGGER_DEFAULT_RESPONSE_MESSAGES[CONSTANTS.STATUS_CODE.CREATED] = {'description': 'Created'};
SWAGGER_DEFAULT_RESPONSE_MESSAGES[CONSTANTS.STATUS_CODE.BAD_REQUEST] = {'description': 'Bad Request'};
SWAGGER_DEFAULT_RESPONSE_MESSAGES[CONSTANTS.STATUS_CODE.UNAUTHORIZED] = {'description': 'Unauthorized'};
SWAGGER_DEFAULT_RESPONSE_MESSAGES[CONSTANTS.STATUS_CODE.NOT_FOUND] = {'description': 'Not Found'};
SWAGGER_DEFAULT_RESPONSE_MESSAGES[CONSTANTS.STATUS_CODE.ALREADY_EXISTS_CONFLICT] = {'description': 'Already Exists'};
SWAGGER_DEFAULT_RESPONSE_MESSAGES[CONSTANTS.STATUS_CODE.SERVER_ERROR] = {'description': 'Internal Server Error'};

const SUCCESS_OBJECT = Joi.object().keys({
    message: Joi.string(),
    statusCode: Joi.number(),
    data: Joi.any()
}).label('Success Response');
const ERROR_OBJECT = Joi.object().keys({
    message: Joi.string(),
    statusCode: Joi.number(),
    data: Joi.any()
}).label('Error Response');
class DefaultResponse {
    constructor(statusCode, response) {
        this[CONSTANTS.STATUS_CODE.OK] = {'description': 'OK', schema: SUCCESS_OBJECT};
        this[CONSTANTS.STATUS_CODE.CREATED] = {'description': 'Created'};
        this[CONSTANTS.STATUS_CODE.BAD_REQUEST] = {'description': 'Bad Request', schema: ERROR_OBJECT};
        this[CONSTANTS.STATUS_CODE.UNAUTHORIZED] = {'description': 'Unauthorized'};
        this[CONSTANTS.STATUS_CODE.NOT_FOUND] = {'description': 'Not Found'};
        this[CONSTANTS.STATUS_CODE.ALREADY_EXISTS_CONFLICT] = {'description': 'Already Exists'};
        this[CONSTANTS.STATUS_CODE.SERVER_ERROR] = {'description': 'Internal Server Error'};
        if (statusCode && response)
            this[statusCode].schema = response;
    }
}

module.exports = {
    ERROR_CODES,
    SUCCESS_MESSAGES,
    SWAGGER_DEFAULT_RESPONSE_MESSAGES,
    ERROR_MESSAGES,
    SOCKET_DEFAULT_MESSAGES,
    DefaultResponse,
    SUCCESS_CODES

};