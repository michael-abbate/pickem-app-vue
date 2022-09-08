// import axios from 'axios';
import history from 'connect-history-api-fallback';
import path from 'path';
const express = require('express');
const request = require('request'); 

const port = process.env.PORT || 8000;
const app = express();

// app.use(express.static(__dirname + "/dist/"));
app.use(express.static(path.resolve(__dirname,'dist/')))
app.use(express.json());
app.use(history());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  
app.get('/showpicks', (req, res) => {
request(
    { url: 'https://areyouwatchingthis.com/api/odds.json?sport=nfl' },
    (error, response, body) => {
    if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
    }
    res.json(JSON.parse(body));
    }
)
});


// app.get(/.*/, function(req,res) {
//     res.sendFile(__dirname + "/dist/index.html");
// });

app.get('*', (req, res)=> {
    res.sendFile(path.join(__dirname,"dist/index.html"));
})

// ounted() {
//     console.log('got to mount.')
//     axios
//     .get(all_games_url)
//     .then(response => {
//         console.log('SUCCESS');
//         // Only send next 20 games. No need to send more
//         console.log(response.data.results.slice(0,20));
//         this.games = response.data.results.slice(0,20)
//         })
//     .catch(error => {
//         console.log(error)
//         this.errored = true
//         })
// }

// let all_games_url = "https://localhost:8080/api/odds.json?sport=nfl";
// if (env == "prod") {
//     all_games_url = "https://areyouwatchingthis.com/api/odds.json?sport=nfl";
// }
// app.get("/showpicks", (req, res) => {
//     axios.get(all_games_url)
//     .then(response => {
//         console.log('SUCCESSFULLY HIT API');
//         // Only send next 20 games. No need to send more
//         console.log(response.data.results.slice(0,20));
//         // this.games = response.data.results.slice(0,20)
//         res.send(response.data.results.slice(0,20))
//         })
//     .catch(error => {
//         console.log(error)
//         // this.errored = true
//         })
// });

// app.listen(port);
// console.log('Server started...');

app.listen(port, () => {
    console.log(`Hello! Pickem-app server is running on port ${port}.`);
});
