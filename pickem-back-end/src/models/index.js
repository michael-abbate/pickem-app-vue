// const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");


let env = process.env.APP_ENV || 'dev';
// let env = 'prod';
console.log(`APP_ENV: ${env}`) 
let db_url = process.env.DATABASE_URL
if (env === 'dev') {
    db_url = 'postgres://xrgaynqfydclte:388fa54398d92188a436a7e27f9b8da88d963a0391cfe61a3ebd6555e9273c4a@ec2-3-232-16-233.compute-1.amazonaws.com:5432/dd8depjl0cvitn';
}
const sequelize = new Sequelize(db_url, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.nfl_teams = require("./nflteams.model.js")(sequelize, Sequelize);

module.exports = db;


const { Client } = require('pg');

const client = new Client({
  connectionString: db_url,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();
console.log('performing your query:');
client.query("SELECT table_schema,table_name FROM information_schema.tables where table_name = 'nfl_teams'", (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });