const Booking = require("../models/Booking");
const User = require("../models/User");
const nodemailer = require("nodemailer");

// POST method for booking tickets (payment submission)
exports.bookTickets = (req, res) => {
  const {
    concert,
    ticketDetails,
    paymentMethod,
    email,
    cardDetails,
    upiDetails,
    totalAmount,
  } = req.body;

  // Validate input
  if (!paymentMethod || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  // Simulating payment processing logic
  const booking = {
    id: bookings.length + 1,
    paymentMethod,
    email,
    cardDetails,
    upiDetails,
    status: "Pending",
  };

  // Simulate saving the booking
  bookings.push(booking);

  setTimeout(() => {
    // Assume payment success and update status
    booking.status = "Completed";

    // Save the updated booking status
    const updatedBooking = { ...booking };

    res.status(201).json({
      success: true,
      message: "Payment Successful!",
      booking: updatedBooking,
    });
  }, 2000);
};

// GET method to retrieve all bookings
exports.getBookings = (req, res) => {
  res.status(200).json({ success: true, bookings });
};

// PUT method to update a booking's status
exports.updateBookingStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const booking = bookings.find((b) => b.id === parseInt(id));
  if (!booking) {
    return res
      .status(404)
      .json({ success: false, message: "Booking not found" });
  }

  booking.status = status;
  res.status(200).json({ success: true, message: "Booking updated", booking });
};

// DELETE method to cancel a booking
exports.cancelBooking = (req, res) => {
  const { id } = req.params;

  const index = bookings.findIndex((b) => b.id === parseInt(id));
  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Booking not found" });
  }

  bookings.splice(index, 1);
  res.status(200).json({ success: true, message: "Booking cancelled" });
};

exports.processPayment = async (req, res) => {
  try {
    const {
      eventName,
      eventType,
      name,
      email,
      phone,
      ticketCount,
      totalAmount,
      paymentDetails,
      date,
      time,
      venue,
    } = req.body;
    const userId = req.user.userId;

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Create a unique payment ID only if payment details are provided
    const paymentId = paymentDetails
      ? "PAY-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9)
      : null;

    // Create new booking with all required fields
    const booking = new Booking({
      userId: user._id,
      userName: name || user.name, // Use provided name or user's name
      userEmail: email || user.email, // Use provided email or user's email
      eventName,
      eventType,
      ticketCount,
      totalAmount,
      paymentId,
      date: date || new Date().toISOString().split("T")[0], // Use provided date or today
      time: time || "19:00", // Use provided time or default
      venue: venue || "Event Venue", // Use provided venue or default
      status: "confirmed",
    });

    // Save booking to database
    await booking.save();

    // --- Add Email Confirmation Logic ---
    try {
     
      const transporter = nodemailer.createTransport({
        service: "gmail", // e.g., 'gmail', 'sendgrid', etc.
        auth: {
          user: "eventeasebookings@gmail.com", 
          pass: "pqfr ufab yosl glyn", 
        },
      });

      const mailOptions = {
        from: '"EventEase Booking" <eventeasebookings@gmail.com>', // Sender address
        to: booking.userEmail, // User's email from booking details
        subject: "Your Event Booking Confirmation - EventEase", // Subject line
        text: `Hello ${booking.userName},

Thank you for booking tickets with EventEase!

Your booking for the event "${booking.eventName}" (${booking.eventType}) is confirmed.
Event Date: ${booking.date}
Event Time: ${booking.time}
Venue: ${booking.venue}
Tickets Booked: ${booking.ticketCount}
Total Amount: ₹${booking.totalAmount}

We look forward to seeing you there!

Best regards,
The EventEase Team`, // Plain text body
        // You can also add an html property for a richer email:
        // html: `<b>Hello ${booking.userName},</b><br><br>Thank you for booking...`
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      console.log(
        "Confirmation email sent successfully to:",
        booking.userEmail
      );
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // Decide if you want to inform the user about the email failure
      // For now, we just log the error and continue returning success for the booking itself
    }
    // --- End Email Confirmation Logic ---

    // Populate user details in the response
    await booking.populate("userId", "name email");

    res.status(200).json({
      success: true,
      message: "Booking confirmed successfully",
      booking: {
        paymentId: booking.paymentId,
        eventName: booking.eventName,
        eventType: booking.eventType,
        name: booking.userName,
        email: booking.userEmail,
        phone: phone || "",
        ticketCount: booking.ticketCount,
        totalAmount: booking.totalAmount,
        status: booking.status,
        date: booking.date,
        time: booking.time,
        venue: booking.venue,
        user: {
          name: booking.userId.name,
          email: booking.userId.email,
        },
      },
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    res.status(500).json({
      success: false,
      message: "Payment processing failed",
      error: error.message,
    });
  }
};

// Get payment history for a user
exports.getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const payments = await Payment.find({ userId });
    res.json(payments);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching payment history",
      error: error.message,
    });
  }
};

exports.getBookingHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    const bookings = await Booking.find({ userId })
      .populate("userId", "name email")
      .sort({ bookingDate: -1 })
      .select("-__v");

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching booking history:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching booking history",
      error: error.message,
    });
  }
};

exports.getBookingDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const userId = req.user.userId;

    const booking = await Booking.findOne({ paymentId, userId })
      .populate("userId", "name email")
      .select("-__v");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Error fetching booking details:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching booking details",
      error: error.message,
    });
  }
};
