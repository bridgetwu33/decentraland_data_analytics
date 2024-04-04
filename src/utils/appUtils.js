const moment = require('moment');

export function getCurrentDateAsNumber() {
    // Get the current date using Moment.js
    const currentDate = moment();
  
    // Format the date as YYYYMMDD
    const formattedDate = currentDate.format('YYYYMMDD');
  
    // Return the formatted date as a number
    return parseInt(formattedDate);
}

export function getNDates(date, n, includeFirstDate = false) {
    // Parse the provided date using Moment.js
    let startDate = moment(date, 'YYYYMMDD');

    // If includeCurrentDate is false, decrement the startDate by 1 day
    if (!includeFirstDate) {
      startDate = startDate.subtract(1, 'day');
    }

    // Create an array to store the result
    const dateRange = [];
  
    // Add the provided date to the result
    dateRange.push(parseInt(startDate.format('YYYYMMDD')));
  
    // Calculate the date range for the past n-1 days
    for (let i = 1; i < n; i++) {
      const previousDate = startDate.clone().subtract(i, 'days');
      dateRange.push(parseInt(previousDate.format('YYYYMMDD')));
    }
    // Return the date range array
    return dateRange;
}

//add docs
export function getDateRange(fromDate, toDate, includeFromDate = false) {
  // Parse the provided dates using Moment.js
  let startDate = moment(fromDate, 'YYYYMMDD');
  const endDate = moment(toDate, 'YYYYMMDD');

  // If includeFromDate is false, increment the startDate by 1 day
  if (!includeFromDate) {
      startDate = startDate.add(1, 'day');
  }

  // Create an array to store the result
  const dateRange = [];

  // Calculate the date range for the days between startDate and endDate
  while (startDate.isSameOrBefore(endDate)) {
      dateRange.push(parseInt(startDate.format('YYYYMMDD')));
      startDate.add(1, 'day');
  }

  // Return the date range array
  return dateRange;
}
