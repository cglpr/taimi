package com.taimi.sample

import java.util.List;
import java.util.Set;
import javax.annotation.Resource
import com.mongodb.BasicDBObject;
import com.mongodb.BulkWriteOperation;
import com.mongodb.BulkWriteResult;
import com.mongodb.Cursor;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.ParallelScanOptions;
import com.mongodb.ServerAddress;

import org.springframework.stereotype.Component;
import org.springframework.data.mongodb.MongoDbFactory

import org.apache.log4j.Logger

import static java.util.concurrent.TimeUnit.SECONDS;


@Component
class MongoConn {
	Logger log = Logger.getLogger(MongoConn.class)
	
	@Resource(name="mongoDbFactory")
	MongoDbFactory mongoFactory
	
	public MongoConn() {
	// To directly connect to a single MongoDB server (note that this will not auto-discover the primary even
	// if it's a member of a replica set:
		log.info("MongoConn constructor")
		log.info("End of MongoConn constructor")
	}
	
	public String getRestaurantsAddress(String restaurant) {
		log.info("getRestaurantsAddress ${restaurant}")
		try {			
			def db = mongoFactory.getDb();
			DBCollection coll = db.getCollection("restaurants");
			BasicDBObject query = new BasicDBObject("name", restaurant);
			
			DBCursor cursor = coll.find(query);
			
			if(cursor.hasNext()) {
				log.info("found ${restaurant}")
				def dbo = cursor.next()
				log.info("dbo: ${dbo}")
				StringBuilder sb = new StringBuilder();
				sb.append(dbo.get("address"))
				def result = sb.toString()
				log.info("result: ${result}")
				return result;
			}
			
			return ""
		} finally {
			log.info("No need to close connection")
		}
	}
	
}
