import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import ClearanceForm from './Components/ClearanceForm/ClearanceForm';
import DocumentCollection from './Components/DocumentCollection/DocumentCollection';



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard  />} />
                <Route path="/clearance/:departmentId" element={<ClearanceForm />} />
                <Route path="/documents" element={<DocumentCollection />} />
                
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;