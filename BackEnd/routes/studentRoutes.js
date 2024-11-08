const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Add a new student
router.post('/', async (req, res) => {
    console.log(req.body); // Log incoming request body for debugging
    const { name, admissionNumber, course } = req.body; // Exclude clearanceStatus

    try {
        // Mongoose will automatically set clearanceStatus to 'pending' by default
        const newStudent = new Student({ name, admissionNumber, course });
        await newStudent.save();
        res.status(201).json(newStudent); // Return created student
    } catch (error) {
        console.error('Error adding student:', error); // Log detailed error
        res.status(400).json({ message: 'Failed to add student.', error: error.message }); // Return detailed error message
    }
});


// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { name, admissionNumber } = req.body;

    try {
        const student = await Student.findOne({ name, admissionNumber });
        if (!student) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
        res.json(student); // Send back the student data
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;