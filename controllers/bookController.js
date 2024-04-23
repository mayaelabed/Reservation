const Booking = require('../models/Booking');
const Room = require('../models/MeetingRoom');
const auth =require('../middleware/authMiddleware');

// Create a booking for a specific time slot
const reserveMeetingRoom = async (req, res) => {
    try {
        const { booking_id,room_id,user_id, start_time, end_time } = req.body;
        
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
            booking_id,
            room_id,
            user_id,
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

// Handle GET request for available rooms
const getAllBookings = async (req, res) => {
    
    try {
        //console.log("ma d5alch");
        const { start_time, end_time } = req.query;
        // Find overlapping reservations
        const reservationsOverlap = await Reservation.find({
            $or: [
                { start_time: { $lt: end_time }, end_time: { $gt: start_time } },
                { start_time: { $gte: start_time, $lt: end_time } },
                { end_time: { $gt: start_time, $lte: end_time } }
            ]
        });
        // Find all rooms
        const allRooms = await room_id.find({});
        //console.log(room_id);
//console.log("7abes lfou9");
        // Filter available rooms by excluding those with overlapping reservations
        const availableRooms = allRooms.filter(room => {
            return !reservationsOverlap.some(reservation => reservation.room_id.toString() === room._id.toString());
        });

        res.status(200).json(availableRooms);
       //console.log(90)
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

// Update an existing reservation
const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { room_id, start_time, end_time, is_active, canceled } = req.body;

        // Update reservation
        await Reservation.findByIdAndUpdate(id, { room_id, start_time, end_time, is_active,canceled  });

        // Respond with success message
        res.send({ message: 'Reservation updated successfully' });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Delete a reservation
const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete reservation
        await Reservation.findByIdAndDelete(id);

        // Respond with success message
        res.send('Reservation deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};


// Obtenir toutes les réservations de l'utilisateur connecté
const ReserveConnectUser= async (req, res) => {
    try {
        // Récupérer les réservations de l'utilisateur actuellement authentifié
        const reservations = await Reservation.find().populate('user_id').populate('room_id')

        // Répondre avec les réservations trouvées
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).send('Erreur du serveur');
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
};

module.exports = {
    reserveMeetingRoom,
    getAllBookings,
    updateBooking,
    deleteBooking,
    ReserveConnectUser
};
