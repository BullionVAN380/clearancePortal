import React, { useState } from 'react';
import axios from 'axios';

const departments = [
    "Finance",
    "Sports",
    "HOD",
    "Procurement",
    "Deputy Principal",
    "Principal",
    "Technician",
    "Store Keeper"
];

const ClearanceForm = ({ student }) => {
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDepartment) {
            setError('Please select a department.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/clearances', {
                admissionNumber: student.admissionNumber,
                department: selectedDepartment,
                status: 'pending' // Initial status
            });
            setSuccessMessage(`Application submitted for ${selectedDepartment}.`);
            setSelectedDepartment('');
            setError('');
        } catch (err) {
            setError('Failed to submit application. Please try again.');
            console.error('Error submitting application:', err);
        }
    };

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-info text-white">
                <h5>Apply for Clearance</h5>
            </div>
            <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Select Department</label>
                        <select 
                            className="form-select" 
                            value={selectedDepartment} 
                            onChange={(e) => setSelectedDepartment(e.target.value)} 
                            required
                        >
                            <option value="">Choose...</option>
                            {departments.map(department => (
                                <option key={department} value={department}>{department}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Application</button>
                </form>
            </div>
        </div>
    );
};

export default ClearanceForm;