
const express = require('express');
const Personnel = require('../models/Personnel'); // Make sure you have a Personnel model
const bcrypt = require('bcryptjs'); // For password hashing
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { name, departmentName, password } = req.body; // Destructure name from req.body
    try {
        if (!name || !departmentName || !password) {  // Check that name is provided
            return res.status(400).json({ message: 'Name, Department Name, and Password are required' });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newPersonnel = new Personnel({
            name,               
            departmentName,
            password: hashedPassword, 
        });

        await newPersonnel.save();
        res.status(201).json({ message: 'Personnel registered successfully' });
    } catch (err) {
        console.error('Error registering personnel:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { departmentName, password } = req.body;
    try {
        const personnel = await Personnel.findOne({ departmentName });

        if (!personnel) {
            return res.status(400).json({ message: 'Invalid department name or password' });
        }

        const isMatch = await bcrypt.compare(password, personnel.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid department name or password' });
        }

        res.status(200).json({ departmentName: personnel.departmentName });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
