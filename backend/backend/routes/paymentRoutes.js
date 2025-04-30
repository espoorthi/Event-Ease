const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { authenticateToken } = require("../middleware/auth");

// POST route to create a booking (payment submission)
router.post("/book", paymentController.bookTickets);

// GET route to retrieve all bookings
router.get("/book", paymentController.getBookings);

// PUT route to update a booking's status (e.g., mark as successful)
router.put("/book/:id", paymentController.updateBookingStatus);

// DELETE route to cancel a booking
router.delete("/book/:id", paymentController.cancelBooking);

// Protected routes - require authentication
router.post("/process", authenticateToken, paymentController.processPayment);
router.get("/history", authenticateToken, paymentController.getBookingHistory);
router.get(
  "/details/:paymentId",
  authenticateToken,
  paymentController.getBookingDetails
);

module.exports = router;
