import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = ({ userRole }) => {
    const [clearanceApplications, setClearanceApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [studentName, setStudentName] = useState('');
    const [students, setStudents] = useState('');
    const [admissionNumber, setAdmissionNumber] = useState('');
    const [course, setCourse] = useState('');
    const [addSuccess, setAddSuccess] = useState(null);

    // Fetch clearance applications based on department role
    useEffect(() => {
        const fetchClearanceApplications = async () => {
            try {
                console.log('Fetching clearances for department:', userRole);
                const response = await axios.get(`https://clearanceportalbackend.onrender.com/api/clearances`, {
                    params: { department: userRole }
                });
                setClearanceApplications(response.data);
            } catch (error) {
                setError('Failed to load clearance applications.');
                console.error("Error fetching clearance applications:", error);
            } finally {
                setLoading(false);
            }
        };

        if (userRole) fetchClearanceApplications();
    }, [userRole]);

    const handleApproval = async (admissionNumber) => {
        try {
            const url = `https://clearanceportalbackend.onrender.com/api/clearances/${encodeURIComponent(admissionNumber)}/${encodeURIComponent(userRole)}`;
            await axios.put(url, { status: 'approved' });
            setClearanceApplications(clearanceApplications.map(app =>
                app.admissionNumber === admissionNumber
                    ? { ...app, status: 'approved' }
                    : app
            ));
        } catch (err) {
            console.error('Error approving application:', err);
        }
    };

    const handleRejection = async (admissionNumber) => {
        try {
            const url = `https://clearanceportalbackend.onrender.com/api/clearances/${encodeURIComponent(admissionNumber)}/${encodeURIComponent(userRole)}`;
            console.log('Rejection URL:', url); // Debug log
            await axios.put(url, { status: 'rejected' });
            setClearanceApplications(clearanceApplications.map(app =>
                app.admissionNumber === admissionNumber
                    ? { ...app, status: 'rejected' }
                    : app
            ));
        } catch (err) {
            console.error('Error rejecting application:', err);
        }
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        if (studentName && admissionNumber && course) { 
            try {
                const newStudent = { name: studentName, admissionNumber, course }; // Remove clearanceStatus
                const response = await axios.post('https://clearanceportalbackend.onrender.com/api/students', newStudent);
                setStudents([...students, response.data]); // Ensure setStudents is defined or remove if unnecessary
                setStudentName('');
                setAdmissionNumber('');
                setCourse('');
                setAddSuccess('Student added successfully');
            } catch (error) {
                alert("Error adding student. Please check the console for details.");
                console.error("Error adding student:", error.response ? error.response.data : error.message);
            }
        } else {
            alert("Please fill in all fields.");
        }
    };
    

    return (
        <div className="container">
            <h2>{userRole} Dashboard</h2>
            {userRole === 'HOD' && ( // Only show "Add Student" form for HOD
                <div className="mt-4">
                    {addSuccess && <div className="alert alert-success">{addSuccess}</div>}
                    
                    <h4>Add Student</h4>
                    <form onSubmit={handleAddStudent} className="mb-4">
                        <div className="mb-3">
                            <label className="form-label">Student Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={studentName} 
                                onChange={(e) => setStudentName(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Admission Number</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={admissionNumber} 
                                onChange={(e) => setAdmissionNumber(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Course</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={course} 
                                onChange={(e) => setCourse(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Student</button>
                    </form>
                </div>
            )}

            {loading ? (
                <p>Loading applications...</p>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <div>
                    <h4>Clearance Applications</h4>
                    {clearanceApplications.length === 0 ? (
                        <p>No clearance applications found for the {userRole} department.</p>
                    ) : (
                        clearanceApplications.map(app => (
                            <div key={app.admissionNumber} className="border p-2 mb-2">
                                <p>Admission Number: {app.admissionNumber}</p>
                                <p>Status: {app.status.charAt(0).toUpperCase() + app.status.slice(1)}</p>
                                {app.status === 'pending' && (
                                    <>
                                        <button className="btn btn-success me-2" onClick={() => handleApproval(app.admissionNumber)}>Approve</button>
                                        <button className="btn btn-danger" onClick={() => handleRejection(app.admissionNumber)}>Reject</button>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}

            
        </div>
    );
};

export default AdminDashboard;
