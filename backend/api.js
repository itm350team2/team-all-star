const AWS = require('aws-sdk');
var events = require('./events.js');

// Configure AWS SDK
AWS.config.update({ region: 'your-region' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Function to write data to DynamoDB
async function writeToDynamoDB(data) {
    const params = {
        TableName: 'YourTableName',
        Item: data,
    };

    try {
        await dynamoDB.put(params).promise();
        console.log('Event written to DynamoDB');
    } catch (error) {
        console.error('Error writing to DynamoDB:', error.message);
        console.error('Error details:', error);
        throw error;
    }
}

// Handler to get all events
exports.events = function (req, res) {
    res.json(events);
};

// Handler to get a specific event
exports.event = function (req, res) {
    res.json(events[req.params.eventId]);
};

// Handler to create a new event and write to DynamoDB
exports.createEvent = async function (req, res) {
    const event = {
        id: req.body.id,
        name: req.body.name,
        date: req.body.date,
    };

    try {
        await writeToDynamoDB(event);
        res.status(200).send('Event written to DynamoDB');
    } catch (error) {
        res.status(500).send('Error writing to DynamoDB');
    }
};



