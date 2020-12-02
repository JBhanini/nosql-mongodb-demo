**John Bhanini & Siva Kumar Bhodapati**

**Class:**

NoSQL Databases

**Project:**

A simple product catalogue to apply what we learned in class. Please note that we didn't finish setting up a server for our catalogue due to the limited time we had. 

Product catalog data management is a complex problem for retailers today. (vendor-provided systems)

In today’s vendor-provided systems, product data must frequently be moved back and forth using ETL processes to ensure all systems are operating on the same data set. (Slow, error prone, expensive)


**Why MongoDB:**

- Document flexibility: Each MongoDB document can store data represented as rich JSON structures. This makes MongoDB ideal for storing just about anything, including very large catalogs with thousands of variants per item.

- Dynamic schema: JSON structures within each document can be altered at any time, allowing for increased agility and easy restructuring of data when needs change. In MongoDB, these multiple schemas can be stored within a single collection and can use shared indexes, allowing for efficient searching of both old and new formats simultaneously.

- Expressive query language: The ability to perform queries across many document attributes simplifies many tasks. This can also improve application performance by lowering the required number of database requests.

- Indexing: Powerful secondary, compound and geo-indexing options enable features like sorting and location-based queries.

- Data consistency: By default, writes are sent to the primary member of a MongoDB replica set, while reads can be sent to all members. This ensures strong consistency, an important feature for retailers, who may have many customers making requests against the same item inventory.

- Geo-distributed replicas: MongoDB replica sets can be geo-distributed, so that they are close to users for fast access, mitigating the need for CDNs in many cases.

**The Data:**

We got our original data from dataworld in a csv format https://data.world/jfreex/products-catalog-from-newchiccom

After some cleaning up, we saved what we needed in the csv folder.

**Plan of Action:**

- Clean and manipulate the data to cater to our needs. (index.js)
- Create our MongoDb. (mongoose.js)
- Create our Collections.(mongoose.js)
- Implement Indices. (mongoose.js)
- Populate our Database. (index.js)
- Preform various Queries. (server.js)
- Display our Results.

