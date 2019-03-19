const logger = require(`@vizydrop/logger`);
const correlationId = require(`./correlation-id`);

const log = logger.createLogger({
    correlationId: {
        enabled: true,
        getCorrelationId: correlationId.correlator.getId,
        emptyValue: `nocorrelation`,
    },
    mode: process.env.NODE_ENV,
    level: process.env.LOG_LEVEL || `info`,
});

module.exports = {
    log,
};
