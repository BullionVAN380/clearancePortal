
import React from 'react';

const Welcome = ({ student }) => (
    <div className="card mb-4 shadow-sm">
        <div className="card-header bg-primary text-white text-center">
            <h2>Welcome, {student.name}</h2>
            <p>Admission Number: {student.admissionNumber}</p>
            <p>Course: {student.course}</p>
        </div>
    </div>
);

export default Welcome;
