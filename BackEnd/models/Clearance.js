const mongoose = require('mongoose');

const clearanceSchema = new mongoose.Schema({
    admissionNumber: { type: String, required: true },
    department: { type: String, required: true },
    status: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'pending' }
});

module.exports = mongoose.model('Clearance', clearanceSchema);