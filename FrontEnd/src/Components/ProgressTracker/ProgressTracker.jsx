// components/ProgressTracker.js
import React from 'react';

const ProgressTracker = ({ clearanceData }) => (
    <div className="card mb-4 shadow-sm">
        <div className="card-body">
            <h4 className="mb-3">Progress Tracker</h4>
            <ul className="list-group mb-4">
                {clearanceData.map((item) => (
                    <li
                        key={item.department}
                        className={`list-group-item d-flex justify-content-between align-items-center ${
                            item.status === 'approved'
                                ? 'list-group-item-success'
                                : item.status === 'pending'
                                ? 'list-group-item-warning'
                                : 'list-group-item-danger'
                        }`}
                    >
                        {item.department}
                        <span className="badge bg-primary rounded-pill">
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default ProgressTracker;
