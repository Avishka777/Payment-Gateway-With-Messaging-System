const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51PAu2GAHeHiratLEYWRtpKK6bi4YTJV6KO8n4VXJeWstuEk7CVd0ObfzQyzifFEq3mTs2V4NF5AT3fAcSe1FmVw100CpyHvKf5"
);

// Message
const accountSid = "ACc187b49eb4321fce0f4a2c305e24ad27";
const authToken = "dedce42e82a1481837486e5b85031b63";
const client = require("twilio")(accountSid, authToken);

router.get("/payment", (req, res) => {
  console.log("start");
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
      receipt_email: req.body.email,
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
  console.log("end");
});

module.exports = router;

router.get("/message", (req, res) => {
  client.messages
    .create({
      body: "Test Message",
      from: "whatsapp:+14155238886",
      to: "whatsapp:+94779994374",
    })
    .then((message) => console.log(message.sid))
    .done();
});

router.get("/sms", (req, res) => {
  client.messages
    .create({
      body: "Test Message",
      from: "+12076721160",
      to: "+94779994374",
    })
    .then((message) => console.log(message.sid))
    .done();
});


