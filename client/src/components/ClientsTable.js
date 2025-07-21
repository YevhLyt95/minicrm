import React, { useEffect, useState } from 'react';

const ClientsTable = ({ clients }) => {
    if (!clients || clients.length === 0) {
        return <div className="mt-4 alert alert-warning">⚠️ No clients available.</div>;
    }
    return (
        <div className='container mt-4'>
            <h2>📋 Client List</h2>
            <table className='table table-stripped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>{client.status || 'new'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientsTable;