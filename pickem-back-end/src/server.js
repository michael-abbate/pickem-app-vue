import express from 'express';
import path from 'path';
import history from 'connect-history-api-fallback';
const cookieparser = require('cookie-parser');
require('dotenv').config()
const sample_odds_json = require('../sample_odds_results.json');


// Import SQL endpoints

// Use Express
const port = process.env.PORT || 8000;
let env = process.env.APP_ENV;
let livelines = process.env.LIVE_LINES;

const app = express();

app.use(express.static(path.resolve(__dirname,'../dist'), { maxAge: '1y', etag: false}))
app.use(express.json());
app.use(cookieparser());

// let env = 'prod';
console.log(`Back-end APP_ENV: ${env}`)
if (env==='prod') {
    console.log('using connect-history-api-fallback')
    app.use(history());
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Load in models for Sequelize
const db = require("./models");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });


require('./routes')(app, env, livelines, sample_odds_json);


app.listen(port, () => {
    console.log(`Hello! Pickem-app server is running on port ${port}.`);
});