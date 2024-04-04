SELECT * FROM nft_data_process WHERE category='parcel';
SELECT * FROM orders WHERE category='parcel';
SELECT count(*), process_date, category FROM orders GROUP BY process_date, category;

CREATE TABLE `parcels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parcel_id` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);

{
  orders(first: 10, skip: 0, orderBy: updatedAt, orderDirection: asc, where: { status: sold, category: parcel, updatedAt_gt: 20240301 }) {
    category
    price
    status
    id
    updatedAt
    nft {
        id
    }
  }
}

-- avoid safety delete
SET SQL_SAFE_UPDATES = 0;
DELETE FROM orders WHERE process_date >= 20240104;

https://thegraph.com/hosted-service/subgraph/decentraland/marketplace

    {
      orders(first: 10, skip: 0, orderBy: updatedAt, orderDirection: asc, where: { status: sold, category: parcel, updatedAt_gt: 20240301 }) {
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