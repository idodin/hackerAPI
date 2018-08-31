"use strict";

const TAG = `[ TEAM.MIDDLEWARE.js ]`;
const mongoose = require("mongoose");
const Services = {
    Permission: require("../services/permission.service"),
    Logger: require("../services/logger.service"),
    Hacker: require("../services/hacker.service")
};

module.exports = {
    // untested
    parseAccount: function (req, res, next) {

        const teamDetails = {
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            members: Services.Hacker.findIds,
            hackSubmitted: req.body.hackSubmitted,
            devpostURL: req.body.devpostURL,
            projectName: req.body.projectName
        };

        delete req.body.name;
        delete req.body.members;
        delete req.body.hackSubmitted;
        delete req.body.devpostURL;
        delete req.body.projectName;

        req.body.teamDetails = teamDetails;

        next();
    },
};