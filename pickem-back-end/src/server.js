import express from 'express';
import path from 'path';
import history from 'connect-history-api-fallback';
import request from 'request';

const port = process.env.PORT || 8000;
const app = express();

app.use(express.static(path.resolve(__dirname,'../dist'), { maxAge: '1y', etag: false}))
app.use(express.json());
app.use(history());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });


app.get('/hello', (req, res) => {
    res.send('Hello!');
});


app.get('/api/showpicks', (req, res) => {
    console.log("requesting odds from express server side.")
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

// app.get('/api/selected', (req, res) => {
//     const { picks } = req.body;
//     res.status(200).json(picks);
// });

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


app.listen(port, () => {
    console.log(`Hello! Pickem-app server is running on port ${port}.`);
});