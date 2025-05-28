const express = require('express');
const app = express();
const connectDB = require('./db');
const authRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
 

connectDB();
app.use(express.json());


app.use('/api/auth', authRoutes);

app.use('/api/events', eventRoutes);
 


app.listen(5000, () => console.log('Server running on port 5000'));
