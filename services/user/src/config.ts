import path from "path";

export default {
    port: process.env.PORT || 8080,
    roomsPath: process.env.ROOM_PATH || path.join(__dirname, '..', 'data', 'files'),
    logUrl: process.env.LOG_URL || 'http://syslog:8080/',
}
