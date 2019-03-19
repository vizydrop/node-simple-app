const {log} = require(`./logger`);
const {createApp} = require(`./app`);

function createShutdownCallback(signal, exitCode = 0) {
    return (error) => {
        log.error(`Application exit by reason`, error);
        log.info(`stop app due to ${signal}`);
        process.exit(exitCode);
    };
}

process.on(`SIGTERM`, createShutdownCallback(`SIGTERM`));
process.on(`SIGINT`, createShutdownCallback(`SIGINT`));
process.on(`uncaughtException`, createShutdownCallback(`uncaughtException`, 1));
process.on(`unhandledRejection`, createShutdownCallback(`unhandledRejection`, 1));

const port = process.env.PORT || 9999;

createApp().listen(port, () => {
    log.info(`fake auth app on port: ${port}`);
});
