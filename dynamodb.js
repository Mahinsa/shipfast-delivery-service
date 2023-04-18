const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_DELIVERIES = "shipfast_deliveries";

const addDelivery = async (delivery) => {
  const params = {
    TableName: TABLE_DELIVERIES,
    Item: {
      tracking_code: delivery.trackingCode,
      status: delivery.status,
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString(),
    },
  };

  await dynamoClient.put(params).promise();
  return params.Item;
};

// delivery status by tracking code
const getStatusByTrackingCode = async (trackingCode) => {
  const params = {
    TableName: TABLE_DELIVERIES,
    Key: {
      tracking_code: trackingCode,
    },
  };
  return await dynamoClient.get(params).promise();
};

// cancel delivery
const cancelDelivery = async (trackingCode) => {
  const params = {
    TableName: TABLE_DELIVERIES,
    Item: {
      tracking_code: trackingCode,
    },
    UpdateExpression: "set #status = :status",
    ExpressionAttributeNames: {
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":v_status": "CANCEL",
    },
    ReturnValues: "ALL_NEW",
  };

  return await dynamoClient.update(params).promise();
};

module.exports = {
  dynamoClient,
  getStatusByTrackingCode,
  cancelDelivery,
  addDelivery,
};
