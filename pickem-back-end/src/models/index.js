// const config = require("../config/config");
// require('dotenv').config({path: __dirname + '/.env'})
require('dotenv').config()

const Sequelize = require("sequelize");


let env = process.env.APP_ENV || 'dev';
// let env = 'prod';
console.log(`APP_ENV: ${env}`) 

if (env === 'prod') {
  db_url = process.env.DATABASE_URL;

  var sequelize = new Sequelize(
    db_url,
    {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
  });
}
else {
  console.log("Connecting to local database...")
  var sequelize = new Sequelize(
    // config.db.database,
    // config.db.user,
    // config.db.password, 
    process.env.LOCAL_DB,
    process.env.LOCAL_USER,
    process.env.LOCAL_PWD,
    {
      // host: config.db.host,
      host: process.env.LOCAL_HOST,
      dialect: 'postgres',
      protocol: 'postgres'
    }
  );
  console.log("Connected to local database!")
  console.log(process.env.LOCAL_USER)

}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ADD SQL TABLES HERE
db.nfl_teams = require("./nflteams.model.js")(sequelize, Sequelize);

module.exports = db;


// const { Client } = require('pg');

// const client = new Client({
//   connectionString: db_url,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// client.connect();
// console.log('performing your query:');
// client.query("SELECT table_schema,table_name FROM information_schema.tables where table_name = 'nfl_teams'", (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//       console.log(JSON.stringify(row));
//     }
//     client.end();
//   });