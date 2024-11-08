const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    admissionNumber: { type: String, required: true, unique: true }, 
    course: { type: String, required: true }, 
    clearanceStatus: { type: String, default: 'pending' } 
});

module.exports = mongoose.model('Student', studentSchema);