"use strict";

// constants kept in alphabetical order
// matches optional http://, https://, http:, https:, and optional www., and then matches for devpost.com and further parameters
const DEVPOST_REGEX = /^(http(s)?:(\/\/)?)?(www\.)?(([-a-zA-Z0-9@:%._\+~#=]{2,256}\.)?devpost\.com)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const HACKER_STATUS_NONE = "None";
const HACKER_STATUS_APPLIED = "Applied";
const HACKER_STATUS_ACCEPTED = "Accepted";
const HACKER_STATUS_WAITLISTED = "Waitlisted";
const HACKER_STATUS_CONFIRMED = "Confirmed";
const HACKER_STATUS_CANCELLED = "Cancelled";
const HACKER_STATUS_CHECKED_IN = "Checked-in";
const HACKER_STATUSES = [
    HACKER_STATUS_NONE,
    HACKER_STATUS_APPLIED,
    HACKER_STATUS_ACCEPTED,
    HACKER_STATUS_WAITLISTED,
    HACKER_STATUS_CONFIRMED,
    HACKER_STATUS_CANCELLED,
    HACKER_STATUS_CHECKED_IN
];

const HACKER = "Hacker";
const VOLUNTEER = "Volunteer";
const STAFF = "Staff";
const GODSTAFF = "GodStaff";
const SPONSOR = "Sponsor";

const SPONSOR_T1 = "SponsorT1";
const SPONSOR_T2 = "SponsorT2";
const SPONSOR_T3 = "SponsorT3";
const SPONSOR_T4 = "SponsorT4";
const SPONSOR_T5 = "SponsorT5";

const JOB_INTERESTS = ["Internship", "Full-time", "None"];
const ROLE_CATEGORIES = {
    SELF: ":self",
    ALL: ":all"
};
// enum of type of requests
const REQUEST_TYPES = {
    GET: "GET", 
    POST: "POST", 
    PATCH: "PATCH", 
    DELETE: "DELETE", 
    PUT: "PUT"
};

//Define names of the roles specifically associated with permission to create an account
const POST_ROLES = {};
POST_ROLES[HACKER] = "postHacker";
POST_ROLES[SPONSOR] = "postSponsor";
POST_ROLES[VOLUNTEER] = "postVolunteer";
POST_ROLES[STAFF] = "postStaff";

const SHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const USER_TYPES = [HACKER, VOLUNTEER, STAFF, GODSTAFF, SPONSOR];
const SPONSOR_TIERS = [SPONSOR_T1, SPONSOR_T2, SPONSOR_T3, SPONSOR_T4, SPONSOR_T5];
const EXTENDED_USER_TYPES = [HACKER, VOLUNTEER, STAFF, GODSTAFF, SPONSOR_T1, SPONSOR_T2, SPONSOR_T3, SPONSOR_T4, SPONSOR_T5];

// matches optional http://, https://, http:, https:, and optional www.
// matches the domain, and then optional route, path, query parameters
const URL_REGEX = /^(http(s)?:(\/\/)?)?(www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6})\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

const EMAIL_SUBJECTS = {};
EMAIL_SUBJECTS[HACKER_STATUS_NONE] = `Application for ${process.env.HACKATHON} incomplete`;
EMAIL_SUBJECTS[HACKER_STATUS_APPLIED] = `Thanks for applying to ${process.env.HACKATHON}`;
EMAIL_SUBJECTS[HACKER_STATUS_ACCEPTED] = `Great update from ${process.env.HACKATHON}`;
EMAIL_SUBJECTS[HACKER_STATUS_WAITLISTED] = `Update from ${process.env.HACKATHON}`;
EMAIL_SUBJECTS[HACKER_STATUS_CONFIRMED] = `Thanks for confirming your attendance to ${process.env.HACKATHON}`;
EMAIL_SUBJECTS[HACKER_STATUS_CANCELLED] = "Sorry to see you go";
EMAIL_SUBJECTS[HACKER_STATUS_CHECKED_IN] = `Welcome to ${process.env.HACKATHON}`;

const CONFIRM_ACC_EMAIL_SUBJECTS = {};
CONFIRM_ACC_EMAIL_SUBJECTS[HACKER] = `Please complete your hacker application for ${process.env.HACKATHON}`;
CONFIRM_ACC_EMAIL_SUBJECTS[SPONSOR] = `You've been invited to create a sponsor account for ${process.env.HACKATHON}`;
CONFIRM_ACC_EMAIL_SUBJECTS[VOLUNTEER] = `You've been invited to create a volunteer account for ${process.env.HACKATHON}`;
CONFIRM_ACC_EMAIL_SUBJECTS[STAFF] = `You've been invited to create a staff account for ${process.env.HACKATHON}`;

module.exports = {
    DEVPOST_REGEX: DEVPOST_REGEX,
    EMAIL_REGEX: EMAIL_REGEX,
    HACKER_STATUS_NONE: HACKER_STATUS_NONE,
    HACKER_STATUS_APPLIED: HACKER_STATUS_APPLIED,
    HACKER_STATUS_ACCEPTED: HACKER_STATUS_ACCEPTED,
    HACKER_STATUS_WAITLISTED: HACKER_STATUS_WAITLISTED,
    HACKER_STATUS_CONFIRMED: HACKER_STATUS_CONFIRMED,
    HACKER_STATUS_CANCELLED: HACKER_STATUS_CANCELLED,
    HACKER_STATUS_CHECKED_IN: HACKER_STATUS_CHECKED_IN,
    HACKER_STATUSES: HACKER_STATUSES,
    REQUEST_TYPES: REQUEST_TYPES,
    JOB_INTERESTS: JOB_INTERESTS,
    SHIRT_SIZES: SHIRT_SIZES,
    USER_TYPES: USER_TYPES,
    SPONSOR_TIERS: SPONSOR_TIERS,
    EXTENDED_USER_TYPES: EXTENDED_USER_TYPES,
    URL_REGEX: URL_REGEX,
    EMAIL_SUBJECTS: EMAIL_SUBJECTS,
    CONFIRM_ACC_EMAIL_SUBJECTS: CONFIRM_ACC_EMAIL_SUBJECTS,
    HACKER: HACKER,
    SPONSOR: SPONSOR,
    VOLUNTEER: VOLUNTEER,
    STAFF: STAFF,
    GODSTAFF: GODSTAFF,
    SPONSOR_T1: SPONSOR_T1,
    SPONSOR_T2: SPONSOR_T2,
    SPONSOR_T3: SPONSOR_T3,
    SPONSOR_T4: SPONSOR_T4,
    SPONSOR_T5: SPONSOR_T5,
    ROLE_CATEGORIES: ROLE_CATEGORIES,
    POST_ROLES: POST_ROLES
};