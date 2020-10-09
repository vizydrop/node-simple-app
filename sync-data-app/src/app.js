const express = require(`express`);
const bodyParser = require(`body-parser`);
const { enableRequestLogging } = require(`./request-logging`);
const correlationId = require(`./correlation-id`);

function createApp() {
  const app = express();

  app.use(correlationId.expressMiddleware);
  app.use(bodyParser.json());
  enableRequestLogging(app);

  app.get(`/`, (req, res) => {
    res.json({
      name: `Fake sync data app`,
      id: process.env.ENV_APP_NAME || `fakeSyncData`,
      version: `3.0`,
      description: `Mocked sync data app`,
      authentication: [
        {
          name: `Token Authentication`,
          id: `token`,
          fields: [
            {
              type: `text`,
              description: `Token`,
              id: `token`,
            },
          ],
        },
      ],
      sources: [],
      responsibleFor: {
        dataSynchronization: true,
      },
    });
  });
  app.post(`/validate`, (req, res) => {
    res.json({ name: `Test account` });
  });

  app.post(`/api/v1/synchronizer/config`, (req, res) => {
    res.json({
      types: [
        { id: `repositories`, name: `Repositories` },
        {
          id: `pullrequests`,
          name: `Pull Requests`,
        },
      ],
      filters: [
        {
          id: `owner`,
          title: `Organization`,
          type: `list`,
          datalist: true,
        },
      ],
    });
  });

  app.post(`/api/v1/synchronizer/datalist`, (req, res) => {
    const { field, dependsOn } = req.body;
    if (field === `owner`) {
      return res.json({
        items: [
          { title: `Owner1`, value: `owner1` },
          { title: `Owner2`, value: `owner2` },
        ],
      });
    }
    return res.status(400).json({ message: `error` });
  });

  app.post(`/api/v1/synchronizer/data`, (req, res) => {
    const { requestedType } = req.body;

    if (requestedType === `repositories`) {
      return res.json({
        items: [
          {
            id: `repo-1`,
            name: `1`,
            fullName: `Repo 1`,
            createdAt: `2018-11-26T11:51:25Z`,
          },
          {
            id: `repo-2`,
            name: `2`,
            fullName: `Repo 2`,
            createdAt: `2018-11-26T11:51:25Z`,
          },
          {
            id: `repo-3`,
            name: `3`,
            fullName: `Repo 3`,
            createdAt: `2018-11-26T11:51:25Z`,
          },
        ],
      });
    }

    if (requestedType === `pullrequests`) {
      return res.json({
        items: [
          {
            id: `pr1_repo-1`,
            name: `PR 1`,
            title: `PR 1`,
            active: true,
          },
          {
            id: `pr2_repo-1`,
            name: `PR 2`,
            title: `PR 2`,
            active: true,
          },
        ],
      });
    }

    return res.status(400).json({ message: `invalid requested type` });
  });

  app.post(`/api/v1/synchronizer/schema`, (req, res) => {
    const pullrequests = {
      id: { type: `id`, name: `Id` },
      name: { type: `text`, name: `Name` },
      title: { type: `text`, name: `Title` },
    };

    res.json({
      repositories: {
        name: { type: `text`, name: `Name` },
        id: {
          type: `id`,
          name: `Id`,
        },
        fullName: {
          type: `text`,
          name: `Full Name`,
        },
        createdAt: {
          type: `date`,
          name: `Created At`,
        },
      },
      pullrequests,
    });
  });

  return app;
}

module.exports = { createApp };
