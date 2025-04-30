const Booking = require("../models/Booking");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const {
      eventName,
      eventType,
      ticketCount,
      totalAmount,
      date,
      time,
      venue,
    } = req.body;

    // Get user details from the authenticated request
    const userId = req.user.userId;
    const userName = req.user.name;
    const userEmail = req.user.email;

    // Create new booking
    const booking = new Booking({
      userId,
      userName,
      userEmail,
      eventName,
      eventType,
      ticketCount,
      totalAmount,
      date,
      time,
      venue,
    });

    // Save booking to database
    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Error creating booking",
      error: error.message,
    });
  }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookings = await Booking.find({ userId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: error.message,
    });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching booking",
      error: error.message,
    });
  }
};
