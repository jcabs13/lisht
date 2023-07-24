const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('First Update')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.post('/webhook', function (req, res) {
    console.log(req.body); // this is your incoming data
    res.send('Received the data!');
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Server is running...');
});
