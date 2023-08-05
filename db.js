const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI='mongodb+srv://sakethsid:Dollie28@cluster0.fkx9wxx.mongodb.net/codecampmern?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});
