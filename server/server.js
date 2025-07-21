const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const clientsRouter = require('./routes/client');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/clients', clientsRouter); //new route
sequelize.sync() //create new tables if still not exist
    .then(() => {
        console.log('✅ DB synced');
        app.listen(5000, () => console.log('🚀 Server running on port 5000'));
    })
    .catch((error) => console.log('❌ DB error:', error));