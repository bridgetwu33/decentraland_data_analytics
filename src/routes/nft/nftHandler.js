const { logger } = require('../../logger');
const { request } = require('graphql-request');
const { marketPlaceUrl, category } = require('../../config');
const { Op } = require("sequelize");
import { sequelize  } from '../../sequelize';
const { getDateRange, getCurrentDateAsNumber} = require('../../utils/appUtils');
const { orders, nftDataProcess } = sequelize.models;

// GraphQL query string with the subgraph query
function generateGraphQLQuery(category, first, skip, updatedAt_gt) {
  return `
    {
      orders(first: ${first}, skip: ${skip}, orderBy: updatedAt, orderDirection: asc, where: { status: sold, category: "${category}", updatedAt_gt: "${updatedAt_gt}" }) {
        category
        nftAddress
        price
        status
        id
        updatedAt
        blockNumber
        nft {
          owner {
            id
          }
          name
          tokenURI
          owner {
            id
          }
        }
      }
    }
  `;
}

// Define a function to find an nftDataProcess record by date and get its update status
const findNftDataProcessByDate = async (date) => {
  try {
    // Find the nftDataProcess record with the provided date
    const nftDataProcessRecord = await sequelize.models.nftDataProcess.findOne({
      where: {
        processDate: date // Use the correct column name here
      }
    });
    // If an nftDataProcess record is found, return its update status
    if (nftDataProcessRecord&&nftDataProcessRecord.status) {
      console.log(`Found nftDataProcess record with status: ${nftDataProcessRecord.status}`);
      return nftDataProcessRecord;
    } else {
      // If no record is found for the provided date, return null or handle the case accordingly
      return null;
    }
  } catch (error) {
    // Handle any errors that occur during the database query
    logger.error(`Error finding nftDataProcess record by date ${date}: ${error.message}`);
    throw error;
  }
};

export const processAllMarketplaceData = async (categoryInput) => {
  // const nftDataProcessRecords = await sequelize.models.nftDataProcess.findAll({
  //   where: {
  //     status: "Initial", 
  //     type: "PARCEL"
  //   }
  // });
  let nftDataProcessRecords = null;
  if(categoryInput==='parcel') {
    nftDataProcessRecords = await sequelize.models.nftDataProcess.findAll({
      where: {
        status: "Initial", 
        type: "parcel"
      }
    });
  } else if(categoryInput==='estate') {
    nftDataProcessRecords = await sequelize.models.nftDataProcess.findAll({
      where: {
        status: "Initial", 
        type: "estate"
      }
    });
  }

  if(nftDataProcessRecords === null) {
    throw new Error("nftDataProcessRecords === null");
  }

  // Initialize an array to store date-process count pairs
  const processedCountsByDate = [];
  const selectedCategory = categoryInput || category; // Use categoryInput if it's not null or undefined, otherwise use category from config
  // Iterate through each nftDataProcess record
  for (const record of nftDataProcessRecords) {
    // Process each record here
    logger.info("------------  process date: %s --------------", record.processDate);
    const day = record.processDate;
    // Fetch the processed count for the current date
    const savedRecordsCount = await getMarketplacePaging(selectedCategory, 1000, 1, day, 500);
    // Store the date and its corresponding processed count in the array
    processedCountsByDate.push({ date: day, count: savedRecordsCount });
  }

  return {
    success: true,
    result: processedCountsByDate, // Return the array with date-process count pairs
    message: "Successfully processed all nftDataProcess records with status 'Initial'."
  };
}
export const processMarketplaceByDate = async (categoryInput, day, pageSize, pageNumber, maxSize) => {
  try {
    const nftDataProcessRecord = await findNftDataProcessByDate(day)
    logger.info("nftDataProcessRecord.status: %s, category: %s, date: %s",nftDataProcessRecord.status, categoryInput, day);
    if(nftDataProcessRecord && nftDataProcessRecord.status=="Initial") {
      const selectedCategory = categoryInput || category; // Use categoryInput if it's not null or undefined, otherwise use category from config
      const data = await getMarketplacePaging(selectedCategory, pageSize, pageNumber, day, maxSize)
      return {
        success: true,
        result: data,
        message: "procssed "+ day
      }
    } 
    return {
      resuccess: true,
      result: "",
      message: "Date in "+ day + " has been processed."
    }

  } catch (error) {
      logger.error('Error executing query getMarketplace:', error);
  }
};

export const getMarketplacePaging = async (categoryReq, pageSize, pageNumber, updatedAt_gt, maxPage) => {
  try {
    const results = [];
    let savedRecordsCount = 0;
    let hasNextPage = true;
    let page = pageNumber;

    //mark it as pending process
    await nftDataProcess.update({ status: 'Pending' }, { where: { processDate: updatedAt_gt, type: categoryReq} });
    console.log("hasNextPage", hasNextPage)
    while (hasNextPage) {
      // Generate the GraphQL query
      logger.info("fetch market data, page: %s, pageSize: %s, updatedAt_gt: %s", page, pageSize, updatedAt_gt);

      if (page >= maxPage) {
        hasNextPage = false;
        return savedRecordsCount;
      }

      let skip = pageSize * (page - 1);
      // if (skip > 5000) {
      //   logger.warn('Skipping records exceeds the maximum limit of 5000. Fetching maximum allowed records.');
      //   skip = 5000;
      //   hasNextPage = false; // Terminate after fetching the maximum allowed records
      // }
      const query = generateGraphQLQuery(categoryReq, pageSize, skip, updatedAt_gt);
      // Execute the GraphQL query
      const pageResults = await request(marketPlaceUrl, query);
      // Check if pageResults is a valid array of orders
      if (!Array.isArray(pageResults?.orders)) {
          throw new Error('Invalid response format: pageResults is not an array of orders');
      }
         // Loop through each order in pageResults.orders and save it to the database
         for (const order of pageResults.orders) {
          try {
            // Create a new record in the orders table using Sequelize
            await sequelize.models.orders.create({
              category: order.category,
              processDate: updatedAt_gt,
              nftAddress: order.nftAddress,
              price: order.price,
              status: order.status,
              orderId: order.id,
              updatedAt: order.updatedAt,
              blockNumber: order.blockNumber,
              nftOwnerId: order.nft.owner.id,
              nftName: order.nft.name ?? "", // Default to empty string if null
              nftTokenUri: order.nft.tokenURI ?? "" // Default to empty string if null
            });
            savedRecordsCount++;
          } catch (error) {
            // Log errors for individual orders
            logger.error(`Error saving order ${order.id} to the database:`, error);
          }
        }
      // Add the page results to the overall results
      results.push(...pageResults.orders);
      // If the number of results retrieved is less than the page size,
      // there are no more pages to fetch
      if (pageResults.orders.length < pageSize) {
        hasNextPage = false;
      } else {
        // Move to the next page
        page++;
      }
    }

    //mark it as complete after all process are done
    await nftDataProcess.update({ status: 'Complete' }, { where: { processDate: updatedAt_gt, type: categoryReq } });

    return savedRecordsCount;
  } catch (error) {
    logger.error('Error executing query getMarketplace:', error);
    await nftDataProcess.update({ status: 'Complete' }, { where: { processDate: updatedAt_gt, type: categoryReq } });
    // throw error; // Rethrow the error to be handled by the caller
  }
};


export const prepareProcessData = async (from, to, includeFromDate) => {
  try {
    const days = getDateRange(from, to, includeFromDate);
    logger.info("passing days: %s", days);
    let sqlQuery = `
      SELECT process_date
      FROM nft_data_process
      WHERE process_date IN (${days.map(() => '?').join(', ')})
    `;
    // Replace the placeholders with actual values
    for (let i = 0; i < days.length; i++) {
      sqlQuery = sqlQuery.replace('?', days[i]);
    }
    const results = await sequelize.query(sqlQuery, {
      type: sequelize.QueryTypes.SELECT
    });
 
    if (!results || results.length === 0) {
      logger.info('No results found in the database.');
      const res = await createProcessRecord(days);
      return res;
    }
    logger.info('Dates found in the database: : %s', results);
    // Ensure that results is an array of dates
    const existingDates = results.map(result => result.process_date);
    // Find the dates that are not in the database
    const remainingDates = days.filter(date => !existingDates.includes(date));
    logger.info('Remaining dates to be inserted: : %s', remainingDates);
    const res = await createProcessRecord(remainingDates);
    return res;

  } catch (error) {
    logger.error('Error executing prepareProcessData:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export  const createProcessRecord = async(days) => {
  try {
    const results = [];
    for (const date of days) {
      // Assuming process.create() returns a Promise
      try {
        const result1 = await nftDataProcess.create({
          type: 'parcel',
          processDate: date,
          status: 'Initial'
          // Other necessary properties...
        });

        const result2 = await nftDataProcess.create({
          type: 'estate',
          processDate: date,
          status: 'Initial'
          // Other necessary properties...
        });

        logger.info(`create nftDataProcess date ${date}`);
        // Add object with id and date to the results array
        results.push({ id: result1.id, date: result1.processDate }); 
      } catch (error) {
        // Log errors for individual dates
        logger.error(`Error nftDataProcess date ${date}:`, error);
      }
    }

    return results; // Return the array of objects containing id and date
  } catch (error) {
    logger.error(`Error processing date ${date}:`, error);
    throw error;
  }
}