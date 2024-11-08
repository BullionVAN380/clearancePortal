// components/Notifications.js
import React from 'react';

const Notifications = ({ clearanceData }) => (
    <div>
        <h4>Notifications</h4>
        {clearanceData.map((item) => {
            if (item.status === 'pending') {
                return (
                    <div key={item.department} className="alert alert-info" role="alert">
                        Your clearance in the {item.department} department is pending.
                    </div>
                );
            } else if (item.status === 'rejected') {
                return (
                    <div key={item.department} className="alert alert-danger" role="alert">
                        Your clearance in the {item.department} department has been rejected. Please contact the department.
                    </div>
                );
            } else if (item.status === 'approved') {
                return (
                    <div key={item.department} className="alert alert-success" role="alert">
                        Your clearance in the {item.department} department has been approved.
                    </div>
                );
            }
            return null;
        })}
    </div>
);

export default Notifications;
