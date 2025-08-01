import React, { useEffect, useState } from 'react';

const ClientsTable = ({ clients, onDelete }) => {
    if (!clients || clients.length === 0) {
        return <div className="mt-4 alert alert-warning">⚠️ No clients available.</div>;
    }
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this client?')) return;
        try {
            const res = await fetch(`http://localhost:5000/clients/${id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete client');
            if (onDelete) onDelete(); // update list
        } catch (err) {
            console.error('❌ Error deleting client:', err);
            alert('Failed to delete client.');

        }
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>{client.status || 'new'}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(client.id)}
                                >
                                    🗑 Delete
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientsTable;