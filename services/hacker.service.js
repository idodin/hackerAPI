"use strict";
const Hacker = require("../models/hacker.model");
const logger = require("./logger.service");
const bcrypt = require("bcrypt");

/**
 * @async
 * @function updateOne
 * @param {string} id
 * @param {JSON} hackerDetails
 * @return {boolean} success or failure of update
 * @description Update an account specified by its mongoId with information specified by hackerDetails.
 */
async function updateOne(id, hackerDetails) {
    const TAG = `[Hacker Service # updateOne ]:`;

    const query = {
        _id: id
    };

    const success = await Hacker.findOneAndUpdate(query, hackerDetails, function (error, user) {
        if (error) {
            logger.error(`${TAG} failed to change hacker`);
        } else if (!user) {
            logger.error(`${TAG} failed to find hacker in database`);
        } else {
            logger.debug(`${TAG} changed hacker information`);
        }
    });

    return !!(success);
}

/**
 * @async
 * @function findOne
 * @param {JSON} query
 * @return {Hacker | null} either hacker or null
 * @description Finds an hacker by some query.
 */
async function findIds(queries) {
    const TAG = `[Hacker Service # findIds ]:`;
    let ids = [];

    queries.forEach((query) => {
        let currId = await Hacker.findOne(query, "_id", function (error, hacker) {
            if (error) {
                logger.error(`${TAG} Failed to verify if hacker exist or not using ${JSON.stringify(query)}`, error);
            } else if (user) {
                logger.debug(`${TAG} hacker using ${JSON.stringify(query)} exist in the database`);
            } else {
                logger.debug(`${TAG} hacker using ${JSON.stringify(query)} do not exist in the database`);
            }
        });

        ids.push(currId);
    });

    return ids;
}

module.exports = {
    updateOne: updateOne,
    findIds: findIds,
};