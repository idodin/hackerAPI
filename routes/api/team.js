"use strict";

const express = require("express");

const Controllers = {
    Team: require("../../controllers/team.controller")
};
const Middleware = {
    Validator: {
        /* Insert the require statement to the validator file here */
        Team: require("../../middlewares/validators/team.validator"),
        RouteParam: require("../../middlewares/validators/routeParam.validator"),
    },
    /* Insert all of ther middleware require statements here */
    parseBody: require("../../middlewares/parse-body.middleware"),
    Team: require("../../middlewares/team.middleware"),
    Auth: require("../../middlewares/auth.middleware"),
};
const Services = {
    Hacker: require("../../services/hacker.service"),
};

module.exports = {
    activate: function (apiRouter) {
        const teamRouter = new express.Router();

        /**
         * @api {post} /team/ create a new team
         * @apiName createTeam
         * @apiGroup Team
         * @apiVersion 0.0.8
         * 
         * @apiParam (body) {String} name Name of the team.
         * @apiParam (body) {MongoID[]} [members] Array of members in team.
         * @apiParam (body) {String} [devpostURL] Devpost link to hack. Once the link is sent, the hack will be considered to be submitted.
         * @apiParam (body) {String} [projectName] Name of the team.
         * 
         * @apiSuccess {string} message Success message
         * @apiSuccess {object} data Team object
         * @apiSuccessExample {object} Success-Response: 
         *      {
                    "message": "Team creation successful", 
                    "data": {...}
                }

         * @apiError {string} message Error message
         * @apiError {object} data empty
         * @apiErrorExample {object} Error-Response: 
         *      {"message": "Error while creating team", "data": {}}
         */
        teamRouter.route("/").post(
            // Validators
            Middleware.Validator.Team.newTeamValidator,

            Middleware.parseBody.middleware,

            Middleware.Team.parseTeam,

            // check that member is not already in a team
            Middleware.Team.ensureUniqueHackerId,

            Middleware.Team.createTeam,
            Controllers.Team.createdTeam
        );

        /**
         * @api {patch} /team/join/ Allows a logged in hacker to join a team by name
         * @apiName patchJoinTeam
         * @apiGroup Team
         * @apiVersion 1.1.1
         * 
         * @apiParam (body) {string} [name] Name of the team to join
         * @apiSuccess {string} message Success message
         * @apiSuccess {object} data {}
         * @apiSuccessExample {object} Success-Response: 
         *      {
         *          "message": "Team join successful.", 
         *          "data": {}
         *      }
         * @apiPermission Administrator
         */
        teamRouter.route("/join/").patch(
            Middleware.Auth.ensureAuthenticated(),
            Middleware.Auth.ensureAuthorized(),

            Middleware.Validator.Team.joinTeamValidator,
            // need to check that the team is not full
            Middleware.Team.ensureSpace,

            Middleware.Team.updateHackerTeam,

            Controllers.Team.joinedTeam
        );

        /**
         * @api {get} /team/:id get a team's information
         * @apiName getTeam
         * @apiGroup Team
         * @apiVersion 0.0.8
         * 
         * @apiParam (param) {ObjectId} id a team's unique mongoId
         * 
         * @apiSuccess {String} message Success message
         * @apiSuccess {Object} data Team object
         * @apiSuccessExample {object} Success-Response: 
         *      {
                    "message": "Successfully retrieved team information", 
                    "data": {...}
                }

         * @apiError {String} message Error message
         * @apiError {Object} data empty
         * @apiErrorExample {object} Error-Response: 
         *      {"message": "Team not found", "data": {}}
         */
        teamRouter.route("/:id").get(
            Middleware.Validator.RouteParam.idValidator,
            Middleware.parseBody.middleware,

            Middleware.Team.findById,
            Controllers.Team.showTeam
        );

        /**
         * @api {patch} /team/:hackerId Update a team's information. The team is specified by the hacker belonging to it.
         * @apiName patchTeam
         * @apiGroup Team
         * @apiVersion 0.0.8
         * 
         * @apiParam (param) {ObjectId} hackerId a hacker's unique Id
         * 
         * @apiSuccess {String} message Success message
         * @apiSuccess {Object} data Team object
         * @apiSuccessExample {object} Success-Response: 
         *      {
                    "message": "Team update successful.", 
                    "data": {...}
                }

         * @apiError {String} message Error message
         * @apiError {Object} data Query input that caused the error.
         * @apiErrorExample {object} Error-Response: 
         *      {"message": "Team not found", "data": {teamId}}
         */
        teamRouter.route("/:hackerId").patch(
            Middleware.Auth.ensureAuthenticated(),

            Middleware.Auth.ensureAuthorized([Services.Hacker.findById]),

            Middleware.Validator.Team.patchTeamValidator,
            Middleware.Validator.RouteParam.hackeridValidator,
            Middleware.parseBody.middleware,
            Middleware.Team.parsePatch,

            Middleware.Team.getByHackerId,
            Middleware.Team.updateTeam,

            Controllers.Team.updatedTeam
        );

        apiRouter.use("/team", teamRouter);
    }
};