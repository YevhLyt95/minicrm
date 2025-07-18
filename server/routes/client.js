const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

//create new client
router.post('/', async (req, res) => {
    try {
        const client = await Client.create(req.body);
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//Get all clients
router.get('/', async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//Update client
router.put('/:id', async (req, res) => {
    try {
        const [update] = await Client.update(req.body, {
            where: { id: req.params.id }
        });
        updated
            ? res.json({ message: 'Client updated' })
            : res.status(404).json({ error: 'Notfound' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete client
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Client.destroy({
            where: { id: req.params.id }
        });
        deleted
            ? res.json({ message: 'Client deleted' })
            : res.status(404).json({ error: 'Not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;