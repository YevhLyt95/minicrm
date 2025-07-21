import { useEffect, useState } from 'react';
import AddClientForm from './components/AddClientForm';
import ClientsTable from './components/ClientsTable';
function App() {
  const [clients, setClients] = useState([]);
  const loadClients = () => {
    fetch('http://localhost:5000/clients')
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(err => console.log('❌ Fetch error:', err));
  };

  useEffect(() => {
    loadClients();
  }, []);
  return (
    <div>
      <AddClientForm onClientAdded={loadClients} />
      <ClientsTable clients={clients} />
    </div>
  );
}

export default App;