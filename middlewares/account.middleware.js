"use strict";

const TAG = `[ ADDRESS.MIDDLEWARE.js ]`;
const mongoose = require("mongoose");
const Services = {
    Permission: require("../services/permission.service"),
    Logger: require("../services/logger.service"),
    Account: require("../services/account.service")
};

const Middleware = {
    Util: require("../middlewares/util.middleware")
}

module.exports = {
    parseAccount: parseAccount,
    // untested
    addDefaultHackerPermissions: Middleware.Util.asyncMiddleware(addDefaultHackerPermissions),
    // untested
    updatePassword: Middleware.Util.asyncMiddleware(updatePassword)
};

/**
 * @function parseAccount
 * @param {JSON} req
 * @param {JSON} res
 * @param {(err?)=>void} next
 * @return {void}
 * @description 
 * Moves firstName, lastName, email, password, dietaryRestrictions, shirtSize from req.body to req.body.accountDetails.
 * Hashes the password.
 * Adds _id to accountDetails.
 */
function parseAccount(req, res, next) {

    const accountDetails = {
        _id: mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: Services.Account.hashPassword(req.body.password),
        dietaryRestrictions: req.body.dietaryRestrictions,
        shirtSize: req.body.shirtSize
    };

    delete req.body.firstName;
    delete req.body.lastName;
    delete req.body.email;
    delete req.body.password;
    delete req.body.dietaryRestrictions;
    delete req.body.shirtSize;

    req.body.accountDetails = accountDetails;

    next();
}

/**
 * Middleware that updates the password for the current user
 * @param {*} req 
 * @param {*} res 
 * @param {(err?)=>void} next
 */
async function updatePassword(req, res, next) {
    req.body.accountDetails.permissions = await Services.Account.updatePassword(req.body.password);
    next();
}

// TODO: fix when new permission system is created
async function addDefaultHackerPermissions (req, res, next) {
    req.body.accountDetails.permissions = await Services.Permission.getDefaultPermission("Hacker");
    next();
}