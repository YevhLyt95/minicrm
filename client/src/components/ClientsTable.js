import React, { useEffect, useState } from 'react';

const ClientsTable = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/clients')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch clients');
                return res.json();
            })
            .then(data => {
                setClients(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);
    if (loading) return <div className='mt-4'>🔄 Loading clients...</div>;
    if (error) return <div className='mt-4 text-danger'>❌ Error: {error}</div>;
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
                            <td>{client.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientsTable;