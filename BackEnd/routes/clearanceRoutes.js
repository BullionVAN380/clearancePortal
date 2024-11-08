const express = require('express');
const router = express.Router();
const Clearance = require('../models/Clearance');

// Helper function to standardize department names
const standardizeDepartment = (dept) => {
    if (!dept) return dept;
    return dept.charAt(0).toUpperCase() + dept.slice(1).toLowerCase();
};

// Add a new clearance application
router.post('/', async (req, res) => {
    let { admissionNumber, department, status } = req.body;
    department = standardizeDepartment(department);

    try {
        const newClearance = new Clearance({ admissionNumber, department, status });
        await newClearance.save();
        res.status(201).json(newClearance);
    } catch (error) {
        console.error('Error adding clearance application:', error);
        res.status(400).json({ message: 'Failed to add clearance application.', error: error.message });
    }
});

// Get clearance applications, optionally filtered by department
router.get('/', async (req, res) => {
    let { department } = req.query;
    if (department) {
        department = standardizeDepartment(department);
    }
    console.log('Fetching clearances for department:', department);

    try {
        if (department) {
            const clearances = await Clearance.find({ department: new RegExp(`^${department}$`, 'i') });
            res.json(clearances);
        } else {
            const clearances = await Clearance.find();
            res.json(clearances);
        }
    } catch (error) {
        console.error('Error fetching clearance applications:', error);
        res.status(500).json({ message: 'Failed to fetch clearance applications' });
    }
});

// Get clearance data for a specific student
router.get('/:admissionNumber', async (req, res) => {
    try {
        const clearances = await Clearance.find({ admissionNumber: req.params.admissionNumber });
        res.json(clearances);
    } catch (error) {
        console.error('Error fetching clearance data:', error);
        res.status(500).json({ message: error.message });
    }
});

// Update clearance status for a specific application
router.put('/:admissionNumber/:department', async (req, res) => {
    const { admissionNumber, department } = req.params;
    const { status } = req.body;

    const standardizedDepartment = standardizeDepartment(department);

    try {
        const updatedClearance = await Clearance.findOneAndUpdate(
            {
                admissionNumber,
                department: new RegExp(`^${standardizedDepartment}$`, 'i') // Case-insensitive match
            },
            { status },
            { new: true }
        );

        if (!updatedClearance) {
            return res.status(404).json({ message: 'Application not found.' });
        }

        res.json(updatedClearance);
    } catch (error) {
        console.error('Error updating clearance status:', error);
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
