import React, { useState } from 'react';

const AddClientForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [message, setMessage] = useState('');
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Creation error');
            const data = await response.json();
            setMessage(`✅ Client added: ${data.name}`);
            setFormData({ name: '', email: '', phone: '' });
        } catch (err) {
            setMessage(`❌ ${err.message}`);

        }
    };

    return (
        <div className="container mt-4">
            <h3>Add new client</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Add</button>
            </form>

            {message && <div className="mt-3 alert alert-info">{message}</div>}
        </div>
    );

}
export default AddClientForm;
