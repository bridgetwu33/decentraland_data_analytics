const Sequelize = require("sequelize");
const { dbHost, dbPort, dbLogging, dbUserName, dbPassword, dbName, dbDialect, dbPoolMin, dbPoolAcquire, dbPoolIdle} = require('../config');
const { applyAssociations } = require('./applyAssociations');
import logger from '../logger';

//initialize Sequelize with database information
const sequelize = new Sequelize(
    dbName, 
    dbUserName,
    dbPassword, 
    {
       host: dbHost,
       dialect: dbDialect,
       port: dbPort,
       logging: dbLogging,
       operationsAliases: false,
       pool: {
           max: 10,
           min: dbPoolMin,
           acquire: dbPoolAcquire,
           idle: dbPoolIdle
       }
   }
);
//load sequelize models 
const modelDefiners = [
    require('./models/nftDataProcess.model'),
    require('./models/orders.model'),
    // Add more models here...
    // require('./models/item'),
];
//inject modes with sequelize instance 
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

logger.info("sequelize model relationship setup");
applyAssociations(sequelize);

module.exports = {
    sequelize
}