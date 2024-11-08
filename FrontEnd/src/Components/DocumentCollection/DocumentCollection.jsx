import React from 'react';

const DocumentCollection = ({ documents }) => {
    return (
        <div className="container">
            <h2>Document Collection Status</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Document Name</th>
                        <th>Collected</th>
                        <th>Date Collected</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((doc) => (
                        <tr key={doc.name}>
                            <td>{doc.name}</td>
                            <td>{doc.collected ? '✔️' : '❌'}</td>
                            <td>{doc.dateCollected || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Upload/Download Options */}
        </div>
    );
};

export default DocumentCollection;