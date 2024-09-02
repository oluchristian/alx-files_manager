const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => {
      console.error(err)
    });
}
// Check if the Redis client is connected
  isAlive() {
    return this.client.connected;
};
// Asynchronous function to get a value for a given key
  async get(key) {
    return new Promise((resolve, reject) => {
        this.client.get(key, (err, value) => {
            if (err) {
                reject(err);
            } else {
                resolve(value);
            }
        });
    });
  }
// Asynchronous function to set a value with an expiration duration
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
        this.client.setex(key, duration, value, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
  }
// Asynchronous function to delete a value for a given key
  async del(key){
    return new Promise((resolve, reject) => {
        this.client.del(key, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;
