const AWS = require('aws-sdk');
var events = require('./events.js');

// Configure AWS SDK
AWS.config.update({ region: 'your-region' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Function to write data to DynamoDB
function writeToDynamoDB(data) {
    const params = {
        TableName: 'YourTableName',
        Item: data,
    };

    return dynamoDB.put(params).promise();
}

// Handler to get all events
exports.events = function (req, res) {
    // Retrieve events logic here (if needed, replace with DynamoDB read logic)
    res.json(events);
};

// Handler to get a specific event
exports.event = function (req, res) {
    // Ensure req.params.eventId is used correctly
    res.json(events[req.params.eventId]);
};

// Handler to create a new event and write to DynamoDB
exports.createEvent = function (req, res) {
    const event = {
        id: req.body.id,
        name: req.body.name,
        date: req.body.date,
    };

    writeToDynamoDB(event)
        .then(data => {
            res.status(200).send('Event written to DynamoDB');
        })
        .catch(error => {
            console.error('Error writing to DynamoDB:', error);
            res.status(500).send('Error writing to DynamoDB');
        });
};
