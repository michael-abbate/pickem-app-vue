// const config = require("../config/config");
// require('dotenv').config({path: __dirname + '/.env'})
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const Sequelize = require("sequelize");
const db = {};

// if (process.env.APP_ENV !== 'dev') {
// }

let env = process.env.APP_ENV;
// let env = 'prod';
console.log(`APP_ENV: ${env}`) 



if (env === 'prod') {
  const db_url = process.env.DATABASE_URL;

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




// ADD SQL TABLES HERE
db.nfl_teams = require("./nflteams.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize,Sequelize);
// fs
//   .readdirSync(__dirname)
//   .filter((file) =>
//     file !== 'index.js'
//   )
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize)
//     db[model.name] = model
//   })


db.Sequelize = Sequelize;
db.sequelize = sequelize;

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