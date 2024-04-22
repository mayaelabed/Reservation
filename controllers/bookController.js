const Booking = require('../models/Booking');
const Room = require('../models/room');
const jwtHelper = require('../utils/JWTUtils');
const sendEmail = require('../services/mail');
const OTPHelper = require('../utils/OTPGenerator');
const ejs = require('ejs');

// Create a booking for a specific time slot
exports.reserveMeetingRoom = async (req, res) => {
    try {
        const { room_id, start_time, end_time } = req.body;
        
        // Check if the room exists
        const room = await Room.findById(room_id);
        if (!room) {
            return res.status(404).json({ success: false, message: "Room not found." });
        }
        
        // Check if the room is available for the given time slot
        const isRoomAvailable = await checkRoomAvailability(room_id, start_time, end_time);
        if (!isRoomAvailable) {
            return res.status(409).json({ success: false, message: "Room is not available for the specified time slot." });
        }
        
        // Create the booking
        const booking = new Booking({
            room_id,
            start_time,
            end_time,
            is_active: true,
            canceled: false
            // You can optionally include user_id here if it's provided in the request
        });
        const savedBooking = await booking.save();
        
        // Return success response
        res.status(201).json({ success: true, message: "Meeting room reserved successfully.", booking: savedBooking });
    } catch (error) {
        console.error("Error reserving meeting room:", error);
        res.status(500).json({ success: false, message: "Could not reserve meeting room." });
    }
};

// Helper function to check if the room is available for the given time slot
async function checkRoomAvailability(roomId, startTime, endTime) {
    try {
        const conflictingBookings = await Booking.find({
            room_id: roomId,
            start_time: { $lt: endTime },
            end_time: { $gt: startTime },
            canceled: false
        });
        return conflictingBookings.length === 0;
    } catch (error) {
        console.error("Error checking room availability:", error);
        throw new Error("Could not check room availability.");
    }
}

// CRUD operations
const createBooking = async (req, res) => {
    // Create a new booking
}

const getAllBookings = async (req, res) => {
    // Retrieve all bookings
}

const getBookingById = async (req, res) => {
    // Retrieve a booking by ID
}

const updateBooking = async (req, res) => {
    // Update an existing booking
}

const deleteBooking = async (req, res) => {
    // Delete a booking
}

// Reservation function
const reserveMeetingRoom = async (req, res) => {
    // Implement reservation logic
}

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    reserveMeetingRoom
};
