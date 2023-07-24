const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware that helps us to parse JSON bodies
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    console.log(req.body);  // This will print the received JSON to your server console

    // Assuming the zip code is a property in the request body
    let zipCode = req.body.zipCode;

    // Now, you can do something with the received zipCode...
    // ...

    // Remember to send a response, or else the requester will hang waiting
    res.status(200).send('Received');
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
