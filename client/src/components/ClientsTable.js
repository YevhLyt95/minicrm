import React, { useState } from "react";
import '../ClientsTable.css';

const ClientsTable = ({ clients, onDelete }) => {
    const [pendingDelete, setPendingDelete] = useState(null);
    const [visibleClients, setVisibleClients] = useState(clients);

    //updating visible clients during props change
    React.useEffect(() => {
        setVisibleClients(clients);
    }, [clients]);

    const handleDelete = (client) => {
        setPendingDelete(client);
        setVisibleClients(prev => prev.filter(c => c.id !== client.id));

        //10s timeout and delete from db

        setTimeout(async () => {
            if (pendingDelete && pendingDelete.id === client.id) {
                try {
                    const res = await fetch(`http://localhost:5000/clients/${client.id}`, {
                        method: 'DELETE'
                    });
                    if (!res.ok) throw new Error('Failed to delete client');
                    if (onDelete) onDelete();
                    setPendingDelete(null);
                } catch (err) {
                    alert('❌ Failed to delete client.');
                    console.error(err);
                }
            }
        }, 10000);
    };
    const handleUndo = () => {
        if (pendingDelete) {
            setVisibleClients(prev => [...prev, pendingDelete]);
            setPendingDelete(null);
        }
    };

    if (!visibleClients || visibleClients.length === 0) {
        return <div className="mt-4 alert alert-warning">⚠️ No clients available.</div>;
    }

    return (
        <div className='container mt-4'>
            <h2>📋 Client List</h2>

            {pendingDelete && (
                <div className="alert alert-info d-flex justify-content-between align-items-center">
                    <span>🗑 Client "{pendingDelete.name}" deleted.</span>
                    <button className="btn btn-sm btn-outline-primary" onClick={handleUndo}>
                        Undo
                    </button>
                </div>
            )}

            <table className='table table-striped'>
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
                    {visibleClients.map(client => (
                        <tr key={client.id} className="fade-in">
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>{client.status || 'new'}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(client)}
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
