const express = require('express');
const bodyParser = require('body-parser');
const glide = require('@glideapps/tables');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Variable to store the most recent zip code
let latestZipCode = '';

// Initialize Glide table
const searchTable = glide.table({
    token: "*********************",
    app: "mtVYx3j3ot4FzRCdp3q4",
    table: "native-table-MX8xNW5WWoJhW4fwEeN7",
    columns: {
        receivedFromWebhook: { type: "string", name: "NqLF1" }
    }
});

// Define the POST endpoint at /webhook
app.post('/webhook', async (req, res) => {   // Make the callback async
    console.log(req.body);  // This will log the received JSON to your server console

    // Assuming the zip code is a property in the request body
    latestZipCode = req.body.zipCode;

    // Update Glide table row
    let searchID = '0f3MGHVYQTSHn4FwKReDZw';  // You need to provide the ID of the row you want to update
    await searchTable.setRow(searchID, {
        receivedFromWebhook: latestZipCode
    });

    // Remember to send a response, or else the client will be left hanging
    res.status(200).send('Received');
});

// Define a GET endpoint to display the latest zip code
app.get('/latestZipCode', (req, res) => {
    res.send(`Latest Zip Code: ${latestZipCode}`);
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
