const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Node.js and Express');
});

server.get('/users', async (req, res) => {
    try {
        const users = await db.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'The users informatio could not be retrieved' });
    }
});

server.get('/users/:id', async (req, res) => {
    try {
        const users = await db.findById(req.params.id);
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'The user with the specified ID does not exist' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

server.put('/users/:id', async (req, res) => {
    try {
        const users = await db.update(req.params.id, req.body);
        if (users) {
           res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'User could not be found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

server.post('/users', async (req, res) => {
    try {
        const users = await db.insert(req.body);
        if (users) {
            res.status(201).json(users);
        } else {
            res.status(400).json({ message: 'Please provide name and bio for user.' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error while saving the user to the database' });
    }
});

server.delete('/user/:id', async (req, res) => {
    try {
        const count = await db.remove(req.params.id);
        if (count > 0) {
            res.status(201).json({ message: 'User was successfully deleted' });
        } else {
            res.status(404).json({ message: 'This user could not be found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error deleting this user' });
    }
});

const port = 5000;
server.listen(port, () => console.log(`\n*** api running on port ${port} ***\n`));