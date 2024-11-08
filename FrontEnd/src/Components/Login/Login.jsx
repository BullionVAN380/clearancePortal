import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState(''); // This will be the student's name
    const [password, setPassword] = useState(''); // This will be the admission number
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (username === '' || password === '') {
            setError('Both fields are required.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/students/login', {
                name: username,
                admissionNumber: password,
            });
            navigate('/dashboard', { state: { student: response.data } });
        } catch (err) {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <div className="row justify-content-center w-100">
                <div className="col-lg-6">
                    <h2 className="text-center mb-4">Student Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleLogin} style={{ maxWidth: '100%' }}>
                        <div className="mb-3">
                            <label className="form-label">Username (Name)</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password (Admission Number)</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                        <a href="#" className="d-block mt-3 text-center">Forgot Password?</a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
