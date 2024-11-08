// Dashboard.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ClearanceForm from '../ClearanceForm/ClearanceForm';
import ProgressTracker from '../ProgressTracker/ProgressTracker';
import Notifications from '../Notifications/Notifications';
import Welcome from '../Welcome/Welcome';
import { jsPDF } from 'jspdf';

const Dashboard = () => {
    const location = useLocation();
    const { student } = location.state; 
    const [clearanceData, setClearanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

// Check if there are exactly 8 departments and all have approved clearance
const allApproved = clearanceData.length === 8 && clearanceData.every((item) => item.status === 'approved');


    useEffect(() => {
        const fetchClearanceData = async () => {
            try {
                const encodedAdmissionNumber = encodeURIComponent(student.admissionNumber);
                const response = await axios.get(`http://localhost:5000/api/clearances/${encodedAdmissionNumber}`);
                setClearanceData(response.data);
            } catch (err) {
                setError('Failed to load clearance data.');
                console.error('Error fetching clearance data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchClearanceData();
    }, [student.admissionNumber]);

    // Polling mechanism to refresh clearance data every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            const fetchClearanceData = async () => {
                try {
                    const encodedAdmissionNumber = encodeURIComponent(student.admissionNumber);
                    const response = await axios.get(`http://localhost:5000/api/clearances/${encodedAdmissionNumber}`);
                    setClearanceData(response.data);
                } catch (err) {
                    console.error('Error fetching clearance data:', err);
                }
            };

            fetchClearanceData();
        }, 5000); 

        return () => clearInterval(interval); // Cleanup on unmount
    }, [student.admissionNumber]);

    // Function to generate a visually appealing centered landscape PDF certificate for the student
const generateCertificate = () => {
    const doc = new jsPDF('landscape', 'pt', 'A4');
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const centerX = pageWidth / 2;

    // Certificate title style
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('Clearance Certificate', centerX, 150, { align: 'center' });

    // Add a border around the certificate
    doc.setDrawColor(0, 0, 0); // Black color
    doc.setLineWidth(2);
    doc.rect(40, 40, pageWidth - 80, pageHeight - 80, 'S');

    // Student details section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text(`This is to certify that:`, centerX, 220, { align: 'center' });
    
    // Student name in larger font
    doc.setFontSize(20);
    doc.text(student.name, centerX, 260, { align: 'center' });

    doc.setFontSize(14);
    doc.text(`Admission Number: ${student.admissionNumber}`, centerX, 300, { align: 'center' });
    doc.text(`Course: ${student.course}`, centerX, 330, { align: 'center' });

    // Clearance approval section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`Has been successfully cleared by all departments.`, centerX, 380, { align: 'center' });
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Status: Cleared`, centerX, 410, { align: 'center' });

    // Footer text for date and authority signature
    doc.setFontSize(12);
    const issueDate = new Date().toLocaleDateString();
    doc.text(`Date: ${issueDate}`, 80, pageHeight - 100);
    doc.text('Principal Signature: ___________________', pageWidth - 300, pageHeight - 100);

    // Footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Kinango Technical & Vocational College', centerX, pageHeight - 60, { align: 'center' });

    // Save the generated PDF
    doc.save(`${student.name}_Clearance_Certificate.pdf`);
};


    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-12">
                    <Welcome student={student} />
                    <ClearanceForm student={student} />
                    <ProgressTracker clearanceData={clearanceData} />
                    <Notifications clearanceData={clearanceData} />

                    {/* Conditionally render the next steps only if all clearances are approved */}
                    {allApproved && (
                        <div className="text-center mt-4">
                            <div className="alert alert-success">
                                Congratulations, {student.name}! You have been cleared by all departments.
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={generateCertificate}
                            >
                                Generate Clearance Certificate
                            </button>
                            <button
                                className="btn btn-secondary mt-2"
                                onClick={() => {/* Navigate to the next steps, such as graduation application */}}
                            >
                                Proceed to Graduation Application
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
