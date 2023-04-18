const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const deliveryService = require("./delivery-service");
app.use(express.json());

app.use("/api/delivery", deliveryService);

const port = 8000;
app.listen(port, () => {
  console.log(`ShipFast Delivery Service API Listening at Port ${port}`);
});
