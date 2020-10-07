const { log } = require(`./logger`);
const { createExpressRequestLogMiddleware } = require(`@vizydrop/logger`);
module.exports = {
  enableRequestLogging: (app) => {
    app.use(createExpressRequestLogMiddleware({ logger: log }));
  },
};
