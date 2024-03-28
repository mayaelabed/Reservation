const mongoose = require('mongoose');

const meetingRoomSchema = new mongoose.Schema({
  room_id: { type: String, required: true },
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  equipments: { type: [String], required: false },
  availability: {
    type: [
      {
        start_time: { type: Date, required: true },
        end_time: { type: Date, required: true },
        is_available: { type: Boolean, required: true },
      },
    ],
    default: [],
  },
});

const MeetingRoom = mongoose.model('MeetingRoom', meetingRoomSchema);

// Route to check availabilities (example):
app.get('/meeting-rooms/:roomId/availability', async (req, res) => {
  const roomId = req.params.roomId;
  const desiredStartTime = req.query.start_time; // Optional query param for specific time

  try {
    const meetingRoom = await MeetingRoom.findById(roomId);
    if (!meetingRoom) {
      return res.status(404).json({ message: 'Meeting room not found' });
    }

    let available = true; // Assuming room is available by default
    if (desiredStartTime) {
      // Implement logic to check if any existing availabilities conflict with desiredStartTime
      // You can use array filter or loop through availabilities and compare timestamps
      available = meetingRoom.availability.every(
        (availability) =>
          desiredStartTime < availability.start_time ||
          desiredStartTime > availability.end_time
      );
    }

    res.json({ available });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = mongoose.model('MeetingRoom', meetingRoomSchema);