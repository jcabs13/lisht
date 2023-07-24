const express = require('express');
const bodyParser = require('body-parser');
const glide = require('@glideapps/tables');
const fetch = require('cross-fetch'); // Add this line to import 'fetch' module

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Initialize Glide table
const searchTable = glide.table({
    token: process.env.GLIDE_API_TOKEN, // Get the token from environment variables
    app: "mtVYx3j3ot4FzRCdp3q4",
    table: "native-table-MX8xNW5WWoJhW4fwEeN7",
    columns: {
        receivedFromWebhook: { type: "string", name: "NqLF1" }
    }
});

// Define the POST endpoint at /webhook
app.post('/webhook', async (req, res) => {   // Make the callback async
    console.log(req.body);  // This will log the received JSON to your server console

    // Extract the time and rowId from the request body
    const { time, rowId } = req.body;

    // Update Glide table row
    await searchTable.setRow(rowId, {
        receivedFromWebhook: time
    });

    // Remember to send a response, or else the client will be left hanging
    res.status(200).send('Received');
});

// Define a GET endpoint at /
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Use the PORT environment variable, or fall back to 3000 if it's not set
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
