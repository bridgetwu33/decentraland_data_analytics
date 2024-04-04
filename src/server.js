const express = require('express');
const { createServer } = require("http");
const bodyParser = require('body-parser');
const app = express();
import api from './routes';
const rTracer = require('cls-rtracer')
const cors=require("cors");
const port = process.env.PORT || 8000;
import logger from './logger';
import { sequelize } from './sequelize';
import { runParcelNFTData } from './scheduler/nftscheduler';
const corsOptions ={
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

function setupDatabaseConnection() {
      logger.info(`Checking database connection...`);
      sequelize.authenticate().then(() => {
      logger.info('Connection has been established successfully.');
    }).catch((error) => {
      logger.error('Unable to connect to the database: ', error);
      process.exit(1);
  });
}

function setupNFTScheduler() {
  logger.info(`Starting scheduler process run...`);
  runParcelNFTData()
}

app.get('/health', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/api', api);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  logger.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});

const httpServer = createServer(app);
setupDatabaseConnection(); 
setupNFTScheduler();
httpServer.listen(port, '0.0.0.0', () => {
  logger.info(`Http Server listening at http://localhost:${port}`)
});
