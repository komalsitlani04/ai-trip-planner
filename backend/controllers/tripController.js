const Trip = require("../models/Trip");

// CREATE TRIP
exports.createTrip = async (req, res) => {
  try {
    const { destination, days, budget } = req.body;

    const trip = await Trip.create({
      user: req.user,
      destination,
      days,
      budget,
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};