import request from 'request';
import path from 'path';

const NFLTeamsController = require('./controllers/NFLTeamsController')
const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')


module.exports = (app, env, livelines, sample_odds_json) => {
    // App Routes
    app.get('/hello', (req, res) => {
        console.log('saying hello!');
        res.send('Hello!');
    });

    app.post('/api/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register);
    
    app.post('/api/login',
        AuthenticationController.login);

    app.get('/api/nflteams', 
        NFLTeamsController.findAll);


    app.get('/api/showpicks', (req, res) => {
        console.log(livelines);
        if (env==='prod' || livelines === 'prod') {
            console.log("requesting odds from express server side.")
            request(
                { url: 'https://areyouwatchingthis.com/api/odds.json?sport=nfl' },
                (error, response, body) => {
                if (error || response.statusCode !== 200) {
                    return res.status(500).json({ type: 'error', message: err.message });
                }
                let res_json = JSON.parse(body);
                res_json['env'] = env;
                res_json['use_live_lines'] = true
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
            res_json['env'] = env;
            res_json['use_live_lines'] = false
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


    app.get('*', (req, res)=> {
        res.sendFile(path.join(__dirname,"../dist/index.html"));
    });
}