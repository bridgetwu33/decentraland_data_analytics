const winston = require('winston');
require('winston-daily-rotate-file');
const rTracer = require('cls-rtracer');
const {
  logFileName,
  logFileLocation,
  appName
} = require('./config');

const transport = new winston.transports.DailyRotateFile({
  filename: `${logFileLocation}${logFileName}-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '200000m',
  maxFiles: '14d',
});


export const logger = winston.createLogger({
  level: 'info' || 'debug',
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.printf(info => {
      const formattedDate = info.timestamp.replace('T', ' ').replace('Z', '');
      return `${info.level.toUpperCase()} | ${formattedDate} | [app=${appName}] | ${JSON.stringify(
        info.message
      )};`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `${logFileLocation}${logFileName}.log`,
    }),
    transport
  ],
});

logger.stream = {
  write(message, encoding) {
    logger.info(message);
  },
};

export default logger;
