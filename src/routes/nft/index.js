import express from 'express';
const nftRouter = express.Router();
import {processAllMarketplaceData, prepareProcessData, processMarketplaceByDate} from './nftHandler';

/**
 * Handle an HTTP GET request to retrieve nft details.
 *
 * @function
 * @async
 * @param {object} req - Express.js request object.
 * @param {object} res - Express.js response object.
 * @returns {Promise<void>} - Sends a JSON response with process details.
 */
nftRouter.post('/processAllMarketplaceDatas', async (req, res) => {
   const { category } = req.body;
   const result = await processAllMarketplaceData(category);
   // Respond with success message and fetched result
   res.status(200).json({
       Success: true,
       message: "Success",
       result: result
   });
});


/**
 * POST endpoint to process marketplace data by date, page size, page number, and maximum size.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The processed marketplace data.
 */
nftRouter.post('/processMarketplaceByDate', async (req, res) => {
    // Extract necessary parameters from request body
    const { category, day, pageSize, pageNumber, maxSize } = req.body;

    // Call the 'processMarketplaceByDate' function to fetch process data
    // Parameters:
    //   - day: The date for which marketplace data is being processed
    //   - pageSize: The number of items per page
    //   - pageNumber: The page number to fetch
    //   - maxSize: The maximum size of data to fetch
    const dayAsNum = +day;
    const pageSizeAsNum = +pageSize;
    const pageNumberAsNum = +pageNumber;
    const maxSizeAsNum = +maxSize;
    const result = await processMarketplaceByDate(category, dayAsNum, pageSizeAsNum, pageNumberAsNum, maxSizeAsNum);

    // Respond with success message and fetched result
    res.status(200).json({
        Success: true,
        message: "Success",
        result: result
    });
});

/**
 * Handle an HTTP GET request to retrieve nft details.
 *
 * @function
 * @async
 * @param {object} req - Express.js request object.
 * @param {object} res - Express.js response object.
 * @returns {Promise<void>} - Sends a JSON response with process details.
 */
nftRouter.post('/prepareProcessData', async (req, res) => {
    const { from, to, includeFromDate  } = req.body;
     // Call the 'findProcessData' function to fetch process data.
    const result = await prepareProcessData(from, to, includeFromDate);

    res.status(200).json(({
        Success: true,
        message: "Success",
        result: result
    }));
});

export default nftRouter;