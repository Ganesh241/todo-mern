const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
const PORT = 5005;

app.use(cors());
app.use(express.json());

const dbURI = 'mongodb://localhost:27017/crud';

mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));


// Use routes with prefixes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});