const { MongoClient } = require('mongodb');

const connectionString = 'mongodb://localhost:27017';
const client = new MongoClient(connectionString);

try {
  let db = client.db("jogo");
  module.exports = db;
} catch(e) {
  console.error(e);
}