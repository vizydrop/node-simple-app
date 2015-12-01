var express = require('express');
var app = express();
var _ = require("underscore");
var bodyParser = require('body-parser');
var request = require("request");

app.use(bodyParser.json());

var sources = {
    "flowers": { name: 'Flowers', url: "https://raw.githubusercontent.com/vizydrop/data-samples/master/flowers.csv" },
    "germany": { name: 'Germany Unemployment', url: "https://raw.githubusercontent.com/vizydrop/data-samples/master/Germany%20unemployment%20rate%20.csv" }
};

var getSources = function() {

    return _.keys(sources).map(function(key) {
        return {
            id: key,
            name: sources[key].name
        }
    });
};

app.get('/simple', function (req, res) {
    var app = {
        "name": "Vizydrop Samples",
        "version": "2.0",
        "description": "The set of samples to check vizydrop in action",
        "authentication": [{
            "id": "none",
            "name": "This information is public",
            "description": "There is no any authentication required. Just press [Connect] button and proceed to charts beauty"
        }],
        "sources": getSources()
    };

    res.json(app);
});

app.post('/simple/validate', function (req, res) {
    res.json({ name: 'Vizydrop Samples' });
});

app.post("/simple", function(req, res) {
    var sourceId = req.body.source;
    var source = sources[sourceId];
    request(source.url).pipe(res);
});

app.listen(process.env.PORT || 8080);