const { logger } = require('../logger');
import { processAllMarketplaceData } from '../routes/nft/nftHandler';
const setAsyncInterval = (fn, ms) => {
    fn().then(() => {
      setTimeout(() => setAsyncInterval(fn, ms), ms);
    });
};


const runParcelNFTData = async () => {
      setAsyncInterval(async () => {
        try {
           // Retrieve pending process summary data
          logger.info("--------------  run nft parcel scheduler------------------");
          await processAllMarketplaceData('parcel');
        } catch (err) {
          logger.error(`Error in scheduled initial parcel NFT Data process ${err}`);
        }
      }, 
      3600000);// Interval in milliseconds (e.g., 5000ms or 5 seconds)
  
   };

   module.exports = { runParcelNFTData }