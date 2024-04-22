const mongoose = require('mongoose');
const equipmentsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true }
});
const availabilitySchema = new mongoose.Schema({
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  is_available: { type: Boolean, required: true },
});

const meetingRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  equipments: [equipmentsSchema],
  availability:[availabilitySchema]
    
});

const MeetingRoom = mongoose.model('MeetingRoom', meetingRoomSchema);
module.exports = MeetingRoom;
