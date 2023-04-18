const express = require("express");
const {
  getStatusByTrackingCode,
  cancelDelivery,
  addDelivery,
} = require("./dynamodb");
const router = express.Router();
router.use(express.json());

// api endpoint for getting delivery status by tracking code
router.post("/add", async (req, res) => {
  const delivery = req.body;
  try {
    const addedDelivery = await addDelivery(delivery);

    res.status(200).json(addedDelivery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: `Something went wrong` });
  }
});

// api endpoint for getting delivery status by tracking code
router.get("/:trackingCode", async (req, res) => {
  const { trackingCode } = req.params;
  try {
    const deliveryStatus = await getStatusByTrackingCode(trackingCode);
    if (!deliveryStatus)
      res.status(404).json({ err: "Wrong tracking code, Please check again!" });
    res.status(200).json(deliveryStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: `Something went wrong` });
  }
});

// api endpoint for updating a delivery as cancel
router.put("/cancel/:trackingCode", async (req, res) => {
  const { trackingCode } = req.params;
  try {
    const cancelledDelivery = await cancelDelivery(trackingCode);
    res.status(200).json(cancelledDelivery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: `Something went wrong` });
  }
});

module.exports = router;
