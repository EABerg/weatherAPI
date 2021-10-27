'use strict';

var supertest = require("supertest");
var should = require("should");

//get the temperatureModel
var sourceFile = require("../sourceFile");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");
// This agent refers to the source server where the information is comming from.
var source = supertest.agent(sourceFile.weatherSource);

// UNIT test begin

describe("Check status of source", function () {

    it("should return a 401 page", function (done) {

        // calling the source api and check if it's not down
        source
            .get("/")
            .expect("Content-type", /json/)
            .expect(401) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 401
                res.status.should.equal(401);
                done();
            });
    });

    it("header should contain version " + sourceFile.sourceVersion, function (done) {

        // calling the source api and check for the version
        source
            .get("/")
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                // the server version is being checked
                res.header.server.should.equal(sourceFile.sourceVersion);
                done();
            });
    });

});

describe("Check status of API", function () {

    it("should return home page", function (done) {

        // calling home page api
        server
            .get("/")
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                res.status.should.equal(200);
                done();
            });
    });

    it("should return /currenttemp page", function (done) {

        // calling currenttemp page api
        server
            .get("/currenttemp")
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                res.status.should.equal(200);
                done();
            });
    });

});

describe("Information from API", function () {

    it("should return from homepage should be text", function (done) {

        // calling home page api
        server
            .get("/")
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                res.body.name.should.equal('weatherAPI-backend');
                done();
            });
    });

    it("should return from currenttemp page should be number", function (done) {

        // calling currenttemp page api
        server
            .get("/currenttemp")
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                res.body.currentTemp.should.be.type('number');
                done();
            });
    });

});