const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const protectedRoute = require('./routes/protectedRoute');
const roomRoute = require('./routes/room');
const MeetingRoom = require('./models/MeetingRoom'); // Adjust the path as per your file structure


app.use(express.json());
const mongoose = require('mongoose')
const dotenv = require( 'dotenv');
dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001

mongoose.connect(MONGODB_URI).then(()=> {
    console.log('connected to the database')
    app.listen(PORT,()=>{
        console.log('server is running on port 3001')
    })
}).catch(err =>{
    console.log('error connecting to database : ', err.message)
})

app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);
app.use('/room',roomRoute)


//Get all meeting rooms
app.get('/meeting-rooms', async (req, res) => {
    try {
      const meetingRooms = await MeetingRoom.find(); // Find all meeting rooms
      res.json(meetingRooms); // Send meeting rooms data in JSON format
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
  });

  // send the list of available meeting rooms in the response
  app.get('/meeting-rooms/available', async (req, res) => {
    try {
      const { capacity, equipments, startTime, endTime } = req.query; // Destructure query parameters
  
      // Build filter query based on parameters
      const filters = {};
      if (capacity) filters.capacity = { $gte: capacity }; // Minimum capacity
      if (equipments) filters.equipments = { $in: equipments.split(',') }; // Include equipments (comma-separated string)
  
      // Filter meeting rooms based on base criteria
      const meetingRooms = await MeetingRoom.find(filters);
  
      // Filter meeting rooms based on availability (assuming a schema field)
      const availableRooms = meetingRooms.filter((room) => {
        // Check if room is booked during requested time range (implement logic based on your schema)
        if (!startTime || !endTime) return true; // Available if no time provided
        const booked = room.bookings.some(
          (booking) =>
            !(startTime < booking.startTime || endTime <= booking.startTime || startTime >= booking.endTime || endTime > booking.endTime)
        );
        return !booked;
      });
  
      res.json(availableRooms);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
/*app.listen(PORT, () => {
console.log(`Server is running on port ${3001}`);
});*/