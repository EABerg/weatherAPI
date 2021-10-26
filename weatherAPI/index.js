'use strict';
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


var routes = require('./api/routes/weatherRoutes'); //importing route
routes(app); //register the route

app.listen(port, err => {
    if (err) {
        throw err;
    }

    console.log('weather RESTful API server started on: ' + port); //print when succesfully starting the API
});

