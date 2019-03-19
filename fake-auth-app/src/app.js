const express = require(`express`);
const bodyParser = require(`body-parser`);
const {enableRequestLogging} = require(`./request-logging`);
const correlationId = require(`./correlation-id`);
const userStore = require(`./user-store`);

function createApp() {
    const app = express();

    app.use(correlationId.expressMiddleware);
    app.use(bodyParser.json());
    enableRequestLogging(app);

    app.get(`/`, (req, res) => {
        res.json({
            name: `Fake Auth`,
            id: `fakeauth`,
            version: `3.0`,
            description: `Mocked responses for authentication`,
            authentication: [{
                id: `token`,
                name: `Token`,
            }],
            sources: [],
            responsibleFor: {
                dataProviding: false,
                userAuthentication: true,
            },
        });
    });

    app.post(`/revoke`, (req, res) => {
        const token = req.body.token;
        userStore.revokeAccess(token);
        res.json({ok: true});
    });

    app.post(`/authenticate`, (req, res) => {
        const token = req.body.fields.token;

        if (token === `invalid-token`) {
            return res.sendStatus(401);
        }

        const user = userStore.getUser(token);
        if (user.blocked) {
            res.sendStatus(401);
        }

        return res.json(user);
    });

    app.post(`/validate`, (req, res) => {
        res.json({});
    });

    return app;
}

module.exports = {createApp};
