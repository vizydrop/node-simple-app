var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.get('/', function (req, res) {
    var app = {
        'name': 'Fake Auth',
        'id': 'fakeauth',
        'version': '2.0',
        'description': 'Mocked responses for authentication',
        'authentication': [{
            'id': 'none',
            'name': 'This information is public',
            'description': 'There is no any authentication required. Just press [Connect] button and proceed to charts beauty'
        }],
        'sources': [
            {id: 'flowers', name: 'Flowers'},
            {id: 'salaries', name: 'Salaries'},
        ],
    };
    res.json(app);
});

app.post('/authenticate', function (req, res) {
    res.json({
        id: '123',
        host: 'local',
        groups: ['collaborator'],
        companies: [
            {
                'groups': [
                    'collaborator'
                ],
                'host': '59b7fbd22fc26aec5ae6a0dc',
                title: 'Board For Team'
            }
        ],
    });
});

app.post('/validate', function (req, res) {
    res.json({name: 'Fake Auth'});
});

app.listen(process.env.PORT || 8080);