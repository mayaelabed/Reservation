const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  room_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'MeetingRoom' }, // reference to MeetingRoom model
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true ,ref: 'User'}, // optional depending on your implementation
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  is_active: { type: Boolean, required: true, default: true },
  canceled : { type:Boolean,required:true,default:false},
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;