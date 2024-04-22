const express = require('express');
const router = express.Router();
const meetingRoomController = require('../controllers/roomController');

// Create a new meeting room
router.post('/add', meetingRoomController.createMeetingRoom);

// Get all meeting rooms
router.get('/', meetingRoomController.getAllMeetingRooms);

// Get a single meeting room by ID
router.get('/:roomId', meetingRoomController.getMeetingRoomById);

// Update a meeting room
router.put('/:roomId', meetingRoomController.updateMeetingRoom);

// Delete a meeting room
router.delete('/:roomId', meetingRoomController.deleteMeetingRoom);

module.exports = router;
