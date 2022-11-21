import express from 'express';
import path from 'path';
import history from 'connect-history-api-fallback';
import request from 'request';

// Import SQL endpoints
const NFLTeamsController = require('./controllers/NFLTeamsController')

const sample_odds_json = require('/Users/mabbate/michael-abbate/pickem-app-vue/sample_odds_results.json');

const port = process.env.PORT || 8000;
const app = express();

app.use(express.static(path.resolve(__dirname,'../dist'), { maxAge: '1y', etag: false}))
app.use(express.json());
let env = process.env.APP_ENV;
// let env = 'prod';
console.log(`Back-end APP_ENV: ${env}`)
if (env==='prod') {
    console.log('using connect-history-api-fallback')
    app.use(history());
}
else {
    console.log("Using DEV games.")
    const sample_odds_json = require('/Users/mabbate/michael-abbate/pickem-app-vue/sample_odds_results.json');
    // console.log(`here is ${JSON.parse(sample_odds_json.results)}`);
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

const db = require("./models");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });


app.get('/hello', (req, res) => {
    console.log('saying hello!');
    res.send('Hello!');
});


app.get('/api/showpicks', (req, res) => {
    if (env==='prod') {
        console.log("requesting odds from express server side.")
        request(
            { url: 'https://areyouwatchingthis.com/api/odds.json?sport=nfl' },
            (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: err.message });
            }
            let res_json = JSON.parse(body);
            res_json['APP_ENV'] = env;
            res.json(res_json);
            // res.send(JSON.parse(body));
            }
        )
    }
    else {
        console.log("HITTING LOCALLY");
        console.log('Returning dev games...');
        // res_json = JSON.parse(sample_odds_json.results.slice(0,16))
        // let res_json = JSON.parse(sample_odds_json);
        let res_json = sample_odds_json;
        res_json['APP_ENV'] = env;
        res.json(res_json);
        // console.log(sample_odds_json.results.slice(0,16));
        // console.log(res_json);
    }
});

app.post('/api/selected', (req, res) => {
    const { picks } = req.body;
    // const { picks } = req.params.picks; // or res.param
    console.log(`Picks sent to selected page:`);
    console.log(picks);
    // I think we can add some logic here for the picks?
    res.status(200).json(picks);
    // res.json(JSON.parse(picks));
    // picks = selectedpicks;

    // sendreq.body or picks?????
    // res.send();/
});

app.get('/api/nflteams', NFLTeamsController.findAll);

app.get('*', (req, res)=> {
    res.sendFile(path.join(__dirname,"../dist/index.html"));
});


app.listen(port, () => {
    console.log(`Hello! Pickem-app server is running on port ${port}.`);
});