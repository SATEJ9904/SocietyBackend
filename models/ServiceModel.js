const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  serviceName: { type: String},
  charges: { type: Number, required: true },
});

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;
