const mongoose = require('mongoose');

const personnelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Path `name` is required.']
    },
    departmentName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Personnel', personnelSchema);

