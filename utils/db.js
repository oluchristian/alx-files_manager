const { MongoClient } = require('mongodb');

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || '27017';
const database = process.env.DB_DATABASE || 'files_manager';
const uri = `mongodb://${host}:${port}/${database}`;

class DBClient {
  constructor() {
    MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
      if (!err) {
        this.db = client.db(database);
        this.userCollection = this.db.collection('users');
        this.filesCollection = this.db.collection('files');
      } else {
        console.log(err.message);
        this.db = false;
      }
    });
  }

  isAlive() {
    return Boolean(this.db);
  }

  async nbUsers() {
    if (!this.isAlive()) {
      throw new Error('Database not connected');
    }
    try {
      return await this.userCollection.countDocuments();
    } catch (error) {
      console.error('Failed to count users', error);
      throw error;
    }
  }

  async nbFiles() {
    if (!this.isAlive()) {
      throw new Error('Database not connected');
    }
    try {
      return await this.filesCollection.countDocuments();
    } catch (error) {
      console.error('Failed to count files', error);
      throw error;
    }
  }
}
const dbClient = new DBClient();
module.exports = dbClient;
