import express from 'express';
import nftRouter from './nft';

const api = express.Router();
api.use('/nft', nftRouter);

export default api;