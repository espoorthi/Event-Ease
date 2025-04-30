const express = require("express");
const path = require("path");
const router = express.Router();

// Route to serve the Spotlight events page (Main page)
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/proj.html"));
});

// Route to handle the "concert" event
router.get("/concert", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/concert.html"));
});

// Route to handle the "workshop" event
router.get("/worksh", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/worksh.html"));
});

// Route to handle the "screening" event
router.get("/screen", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/screen.html"));
});

// Route to handle the "sports" event
router.get("/sports", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/sports.html"));
});

// Route to handle payment form submission
router.post("/submit-payment", (req, res) => {
  const {
    paymentMethod,
    cardNumber,
    cardHolder,
    expiryDate,
    cvv,
    upiApp,
    upiId,
    email,
    amount,
  } = req.body;

  // Simulate payment processing
  setTimeout(() => {
    res.json({
      success: true,
      message: "Payment processed successfully",
      paymentDetails: {
        paymentMethod,
        email,
        amount,
      },
    });
  }, 2000);
});

module.exports = router;
