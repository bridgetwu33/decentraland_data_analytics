const dotenv = require('dotenv');
const config = require('config');

dotenv.config();

module.exports = {
  dbHost: process.env.DATABASE_URL || config.get('DATABASE_URL'),
  dbPort: process.env.DATABASE_PORT || config.get('DATABASE_PORT'),
  dbUserName: process.env.DB_USERNAME || config.get('DB_USERNAME'),
  dbPassword: process.env.DB_PASSWORD || config.get('DB_PASSWORD'),
  dbName: process.env.DB_NAME || config.get('DB_NAME'),
  dbDialect: process.env.DB_DIALECT || config.get('DB_DIALECT'),
  dbLogging: process.env.DB_LOGGING || config.get('DB_LOGGING'),
  dbPoolMax: process.env.DB_POOL_MAX || config.get('DB_POOL_MAX'),
  dbPoolMin: process.env.DB_POOL_MIN || config.get('DB_POOL_MIN'),
  dbPoolAcquire: process.env.DB_POOL_ACQUIRE || config.get('DB_POOL_ACQUIRE'),
  dbPoolIdle: process.env.DB_POOL_IDLE || config.get('DB_POOL_IDLE'),
  logFileName: process.env.LOG_FILE_NAME || config.get('LOG_FILE_NAME'),
  logFileLocation: process.env.LOG_FILE_LOCATION || config.get('LOG_FILE_LOCATION'),
  appName: process.env.APP_NAME || config.get('APP_NAME'),
  marketPlaceUrl: process.env.MARKET_PLACE_URL || config.get('MARKET_PLACE_URL'),
  category: process.env.CATEGORY || config.get('MARKET_PLACE_URL')
};
