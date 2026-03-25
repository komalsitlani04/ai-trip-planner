const express = require("express");
const protect = require("../middleware/authMiddleware");
const Trip = require("../models/Trip");

const router = express.Router();


// ✅ CREATE trip
router.post("/create", protect, async (req, res) => {
  try {
    const { destination, days, budget } = req.body;

    const trip = await Trip.create({
      user: req.user,
      destination,
      days,
      budget
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ GET all trips
router.get("/", protect, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ GET single trip
router.get("/:id", protect, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.user.toString() !== req.user) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ UPDATE trip
router.put("/:id", protect, async (req, res) => {
  try {
    const { destination, days, budget } = req.body;

    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.user.toString() !== req.user) {
      return res.status(403).json({ message: "Access denied" });
    }

    trip.destination = destination || trip.destination;
    trip.days = days || trip.days;
    trip.budget = budget || trip.budget;

    const updatedTrip = await trip.save();

    res.json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ DELETE trip
router.delete("/:id", protect, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.user.toString() !== req.user) {
      return res.status(403).json({ message: "Access denied" });
    }

    await trip.deleteOne();

    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;