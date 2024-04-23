const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Create a booking for a specific time slot
router.post('/reserve', bookController.reserveMeetingRoom);

// Obtenir toutes les réservations de l'utilisateur connecté
router.get('/reserveConnected',bookController.ReserveConnectUser);

// Get all bookings
//router.get('/all',bookController.getAllBookings); fel app.js /meeting-rooms

// Update a booking
router.put('/:bookingId', bookController.updateBooking);

// Delete a meeting room
router.delete('/:bookingId', bookController.deleteBooking);

module.exports = router;
