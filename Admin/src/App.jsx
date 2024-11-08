import { BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom';
import React, { useState } from 'react';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonnelLogin from './Components/PersonnelLogin/PersonnelLogin';
import PersonnelRegistration from './Components/PersonnelRegistration/PersonnelRegistration';

function App() {
  const [userRole, setUserRole] = useState(null);
  return (
    <Router>
    <Routes>
        <Route path="/login" element={userRole ? <Navigate to="/dashboard" /> : <PersonnelLogin setUserRole={setUserRole} />} />
        
        <Route path="/dashboard" element={userRole ? <AdminDashboard userRole={userRole} /> : <Navigate to="/login" />} />
        
        <Route path="/register" element={<PersonnelRegistration />} />

        <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
</Router>
);
}
export default App
