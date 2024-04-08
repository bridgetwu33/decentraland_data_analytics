SELECT * FROM nft_data_process;
SELECT COUNT(*) FROM orders;
SELECT COUNT(*), process_date FROM orders;
SELECT COUNT(nft_id), nft_id FROM orders
WHERE process_date BETWEEN 20230101 AND 20231231 GROUP BY nft_id HAVING COUNT(nft_id)>1 ORDER BY COUNT(nft_id) DESC;

CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(50) DEFAULT NULL,
  `nft_id` text NOT NULL,
  `process_date` int NOT NULL,
  `price` varchar(255) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `nft_data_process` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `process_date` int NOT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'Initial',
  `type` varchar(20) NOT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_update_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);


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

    {
      orders(
        first: 100
        orderBy: updatedAt
        orderDirection: asc
        where: {status: sold, category: parcel, updatedAt_gte: 1672656947, updatedAt_lt: 1675227600}
      ) {
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