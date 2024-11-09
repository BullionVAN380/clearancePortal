import React, { useState } from 'react';
import axios from 'axios';

const PersonnelRegister = () => {
    const [name, setName] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        // Ensure all fields are filled out
        if (!name || !departmentName || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post('https://clearanceportalbackend.onrender.com/api/personnel/register', {
                name,
                departmentName,
                password,
            });
            console.log('Registration successful', response.data);
        } catch (err) {
            setError('Error registering personnel: ' + (err.response?.data?.message || err.message));
            console.error('Error registering personnel:', err);
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <div className="row justify-content-center w-100">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <h2 className="text-center mb-4">Admin Registration</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Department Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={departmentName}
                                onChange={(e) => setDepartmentName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PersonnelRegister;
