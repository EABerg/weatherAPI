'use strict';

module.exports = function (app) {
    var temperatureModel = require('../models/temperatureModel');
    // weather Route(s)
    app.get("/", function (req, res, next) {
        res.status(200).json({ name: 'weatherAPI-backend' })
    });
    app.get("/currenttemp", temperatureModel.currentTemperature);
};