const MeetingRoom = require('../models/MeetingRoom');

// Create a new meeting room
/*exports.createMeetingRoom = async (req, res) => {
  try {
    const {name, capacity, equipments, availability } = req.body;
   
    const equipmentArray = equipments && equipments.map(equipment => ({
        name: equipment.name,
        quantity: equipment.quantity
      })) || [];
      
      const availabilityArray = availability && availability.map(availability => ({
        start_time: availability.start_time,
        end_time: availability.end_time,
        is_available: availability.is_available
      })) || [];
      
    const newMeetingRoom = new MeetingRoom({
      name,
      capacity,
      equipments: equipmentArray,
      availability : availabilityArray
    });
    const savedMeetingRoom = await newMeetingRoom.save();
    res.status(201).json(savedMeetingRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};*/
exports.createMeetingRoom = async (req, res) => {
  try {
	console.log("1")
    const {name, capacity, equipments, availability } = req.body;
   console.log("2")
    const equipmentArray = equipments && equipments.map(equipment => ({
        name: equipment.name,
        quantity: equipment.quantity
      })) || [];
      console.log("3")
      const availabilityArray = availability && availability.map(availability => ({
        start_time: availability.start_time,
        end_time: availability.end_time,
        is_available: availability.is_available
      })) || [];
      console.log(req.body.name)
	console.log(req.body.capacity)
      console.log(availabilityArray)
	console.log(equipmentArray)
      console.log("4")
    const newMeetingRoom = new MeetingRoom({
      name,
      capacity,
      equipments: equipmentArray,
      availability : availabilityArray
    });
	console.log("5")
    const savedMeetingRoom = await newMeetingRoom.save();
	console.log("6")
    res.status(201).json(savedMeetingRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Get all meeting rooms
exports.getAllMeetingRooms = async (req, res) => {
  try {
    const meetingRooms = await MeetingRoom.find();
    res.json(meetingRooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a single meeting room by ID
exports.getMeetingRoomById = async (req, res) => {
  const roomId = req.params.roomId;
  try {
    const meetingRoom = await MeetingRoom.findById(roomId);
    if (!meetingRoom) {
      return res.status(404).json({ message: 'Meeting room not found' });
    }
    res.json(meetingRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a meeting room
exports.updateMeetingRoom = async (req, res) => {
  const roomId = req.params.roomId;
  const updates = req.body;
  try {
    const updatedMeetingRoom = await MeetingRoom.findByIdAndUpdate(roomId, updates, { new: true });
    if (!updatedMeetingRoom) {
      return res.status(404).json({ message: 'Meeting room not found' });
    }
    res.json(updatedMeetingRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a meeting room
exports.deleteMeetingRoom = async (req, res) => {
  const roomId = req.params.roomId;
  try {
    const deletedMeetingRoom = await MeetingRoom.findByIdAndDelete(roomId);
    if (!deletedMeetingRoom) {
      return res.status(404).json({ message: 'Meeting room not found' });
    }
    res.json({ message: 'Meeting room deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
