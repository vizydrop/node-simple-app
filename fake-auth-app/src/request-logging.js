const morgan = require(`morgan`);
const {log} = require(`./logger`);

module.exports = {
    enableRequestLogging: (app) => {
        const morganConfig = {
            stream: {write: log.info},
            skip: (req) => req.url === `/status`,
        };

        app.use(morgan(`:method :url`, {...morganConfig, immediate: true}));
        app.use(morgan(`:method :status :url (:res[content-length] bytes) :response-time ms`, {...morganConfig, immediate: false}));
    },
};
