import express from 'express';
import bodyParser from 'body-parser';
import history from 'connect-history-api-fallback';

const port = process.env.PORT || 8000
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "../dist"));
app.use(history());

app.get('/hello', (req, res) => {
    res.send('Hello! Pickem-app server is running.');
});

app.post('/hello', (req, res) => {
    res.send(`Hello ${req.body.name}`);
});

app.get('/hello/:name', (req, res) => {
    res.send(`Hello ${req.params.name}`);
});

// Actual app work... he says to paste in the data to use for the front end?
// api/products is calling a products array thats hard coded in sample app... in our case we will need to hit exteral API and send back that data.
// app.get('/api/products', (req, res) => {
//     res.status(200).json(products);
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
    console.log('Hello! Pickem-app server is running.');
});