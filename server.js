// import axios from 'axios';
const express = require('express');

const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + "/dist/"));

app.get(/.*/, function(req,res) {
    res.sendFile(__dirname + "/dist/index.html");
});

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
    console.log('Hello! Pickem-app server is running.');
});
