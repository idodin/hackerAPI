"use strict";
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../app");
const logger = require("../services/logger.service");

const util = {
    account: require("./util/account.test.util"),
    auth: require("./util/auth.test.util")
};

const storedAccount1 = util.account.Account1;
const newAccount1 = util.account.newAccount1;

describe("GET user account", function () {
    // would this ever do anything?
    it("should fail to list the user's account on /api/account/self GET", function (done) {
        chai.request(server.app)
            .get("/api/account/self")
            .end(function (err, res) {
                res.should.have.status(401);
                res.should.be.json;
                res.body.should.have.property("message");
                res.body.message.should.equal("Not Authenticated");
                done();
            });
    });
    it("should list the user's account on /api/account/self GET", function (done) {
        const agent = chai.request.agent(server.app);
        util.auth.login(agent, storedAccount1, (error) => {
            if(error) {
                agent.close();
                return done(error);
            }
            agent
            .get("/api/account/self")
            // does not have password because of to stripped json
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property("message");
                res.body.message.should.equal("Account found by user email");
                res.body.should.have.property("data");                
                res.body.data.should.be.a("object");
                res.body.data.should.have.property("firstName");
                res.body.data.should.have.property("lastName");
                res.body.data.should.have.property("email");
                // ???
                // res.body.data.should.equal(req.user.email);
                res.body.data.should.have.property("permissions");
                res.body.data.should.have.property("dietaryRestrictions");
                res.body.data.should.have.property("shirtSize");
                done();
            });
            agent.close();
        });
    });
});

describe("POST create account", function () {
    it("should SUCCEED and create a new account", function(done) {
        chai.request(server.app)
        .post(`/api/account/create`)
        .type("application/json")
        .send(newAccount1)
        .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property("message");
            res.body.message.should.equal("Account creation successful");
            done();
        });
    });
});

describe("POST update account", function () {
    const updatedInfo = {
        "_id": storedAccount1._id,
        "firstName": "new",
        "lastName": "name"
    };
    it("should SUCCEED and update an account", function(done) {
        chai.request(server.app)
        .post(`/api/account/updateOneUser`)
        .type("application/json")
        .send(updatedInfo)
        .end(function (err, res) {
            // auth?
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property("message");
            res.body.message.should.equal("Changed account information");
            res.body.should.have.property("data");
            // Is this correct matching of data?
            res.body.data.firstName.should.equal(updatedInfo.firstName);
            res.body.data.lastName.should.equal(updatedInfo.lastName);
            done();
        });
    });
});