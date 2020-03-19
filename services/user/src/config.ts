export default {
    port: process.env.PORT || 8080,
    logUrl: process.env.LOG_URL || 'http://syslog:8080/',
    worldUrl: process.env.WORLD_URL || 'http://world:8080/',
    eventsUrl: process.env.EVENTS_URL || 'http://events:8080/',
}
