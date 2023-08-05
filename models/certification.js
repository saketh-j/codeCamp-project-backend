const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  title: String,
});

const Certification = mongoose.model('Certification', certificationSchema);

module.exports = Certification;
