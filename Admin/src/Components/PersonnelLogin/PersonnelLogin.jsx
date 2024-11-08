import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const PersonnelLogin = ({ setUserRole }) => {
    const [departmentName, setDepartmentName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/personnel/login', {
                departmentName,
                password,
            });
            setUserRole(response.data.departmentName); // Save the department role
            console.log('Logged in with department:', response.data.departmentName); // Debug log
        } catch (err) {
            setError('Invalid department name or password');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <div className="row justify-content-center w-100">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <h2 className="text-center mb-4">Admin Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleLogin}>
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
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                    <div className="mt-3 text-center">
                        <p><Link to="/register"></Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonnelLogin;
