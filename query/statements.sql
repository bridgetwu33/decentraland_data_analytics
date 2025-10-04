SELECT * FROM nft_data_process WHERE process_date BETWEEN 20230101 AND 20231231;
SELECT * FROM orders;
SELECT * FROM nft_daily_price;
SELECT COUNT(*) FROM orders;
SELECT COUNT(*), process_date FROM orders;
SELECT COUNT(nft_id), COUNT(DISTINCT (nft_id)) FROM orders
WHERE process_date BETWEEN 20210101 AND 20211231 GROUP BY nft_id HAVING COUNT(nft_id)>1 ORDER BY COUNT(nft_id) DESC;

select count(nft_id), nft_id from orders 
where process_date between 20230101 and 20231231 group by nft_id having count(nft_id)>1;

select count(nft_id), nft_id from orders 
where process_date between 20230101 and 20231231 group by nft_id having count(nft_id)>1 order by count(nft_id) desc;

select avg(price), process_date from orders 
where process_date between 20230101 and 20231231 group by process_date;

SELECT CONCAT(ROUND(AVG(LEFT(price, LENGTH(price) - 15)), 0), '000000000000000') AS avg_price, 
CONCAT(ROUND(MIN(LEFT(price, LENGTH(price) - 15)), 0), '000000000000000') AS min_price, 
CONCAT(ROUND(MAX(LEFT(price, LENGTH(price) - 15)), 0), '000000000000000') AS max_price,
process_date FROM orders group by process_date order by process_date asc;

CREATE TABLE `nft_daily_price` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `process_date` int NOT NULL,
  `avg_price` varchar(255) DEFAULT NULL,
  `min_price` varchar(255) DEFAULT NULL,
  `max_price` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO nft_daily_price (avg_price, min_price, max_price, process_date) SELECT CONCAT(ROUND(AVG(LEFT(price, LENGTH(price) - 15)), 0), '000000000000000') AS avg_price, 
CONCAT(ROUND(MIN(LEFT(price, LENGTH(price) - 15)), 0), '000000000000000') AS min_price, 
CONCAT(ROUND(MAX(LEFT(price, LENGTH(price) - 15)), 0), '000000000000000') AS max_price,
process_date FROM orders group by process_date order by process_date asc;