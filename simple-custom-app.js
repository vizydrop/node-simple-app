var express = require('express');
var app = express();
var _ = require('underscore');
var bodyParser = require('body-parser');
var resolve = require('path').resolve;
var fs = require('fs');

app.use(bodyParser.json());

var sendCsvFileAsIs = function (req, res) {
    res.sendFile(resolve('./data/' + req.body.source + '.csv'));
};

var sendFilteredJsonFile = function (req, res) {

};

var dataProcessor = {
    'flowers': sendCsvFileAsIs,
    'salaries': sendCsvFileAsIs
};

var getSources = function () {
    return [
        {id: 'flowers', name: 'Flowers'},
        {id: 'salaries', name: 'Salaries'}
    ];
};

app.get('/logo', function (req, res) {
    res.sendFile(resolve('./logo.svg'));
});

app.get('/', function (req, res) {
    var app = {
        'name': 'Vizydrop Samples',
        'version': '2.0',
        'description': 'The set of samples to check vizydrop in action',
        'authentication': [{
            'id': 'none',
            'name': 'This information is public',
            'description': 'There is no any authentication required. Just press [Connect] button and proceed to charts beauty'
        }],
        'sources': getSources()
    };

    res.json(app);
});

app.post('/validate', function (req, res) {
    res.json({name: 'Vizydrop Samples'});
});

app.post('/', function (req, res) {
    dataProcessor[req.body.source](req, res);
});

app.listen(process.env.PORT || 8080);