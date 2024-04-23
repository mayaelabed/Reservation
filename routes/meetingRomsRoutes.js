const express = require('express');
const User = require('../models/MeetingRoom');

const router = express.Router();


router.get('/meeting-rooms', async (req, res) => {
  try {
    const meetingRooms = await MeetingRoom.find();
    res.json(meetingRooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/*app.get('/meeting-rooms/available', async (req, res) => {
  const { capacity, equipments, startTime, endTime } = req.query; // Get query parameters for filtering

  const filters = {};

  if (capacity) {
    filters.capacity = { $gte: capacity }; // Greater than or equal to requested capacity
  }

  if (equipments) {
    filters.equipments = { $in: equipments.split(',') }; // Include rooms with any of the equipments listed (comma-separated)
  }

  if (startTime && endTime) {
    // Implement logic to check availability based on timestamps (refer to booking schema for availability field)
    // You can use filters like $and or dedicated filters for availabilities
  }

  try {
    const availableRooms = await MeetingRoom.find(filters);
    res.json(availableRooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});*/
module.exports = router;
