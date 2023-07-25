const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define the POST endpoint at /webhook
app.post('/webhook', async (req, res) => {
    console.log(req.body); // This will log the received JSON to your server console

    // Extract the time and rowId from the request body
    const { time, rowId } = req.body;

    // Make a request to update the Glide table row
    const glideApiToken = process.env.GLIDE_API_TOKEN;
    const appID = "mtVYx3j3ot4FzRCdp3q4"; // Replace this with your Glide app ID
    const tableName = "native-table-MX8xNW5WWoJhW4fwEeN7"; // Replace this with your table name
    const endpoint = 'https://api.glideapp.io/api/function/mutateTables';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${glideApiToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            appID: appID,
            mutations: [
                {
                    kind: 'set-columns-in-row',
                    tableName: tableName,
                    columnValues: {
                        NqLF1: time // Replace 'NqLF1' with the appropriate column name
                    },
                    rowID: rowId
                }
            ]
        }),
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        const responseData = await response.json();

        if (!response.ok || responseData.error) {
            console.error('Failed to update Glide table row:', responseData.error || response.statusText);
            return res.status(500).send('Failed to update Glide table row');
        }

        // Remember to send a response, or else the client will be left hanging
        res.status(200).send('Received');
    } catch (error) {
        console.error('Error updating Glide table row:', error.message);
        res.status(500).send('Error updating Glide table row');
    }
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

