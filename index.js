const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json()); // To parse incoming JSON data
app.use(express.urlencoded({ extended: true })); // To parse form data

const uri = 'mongodb+srv://jegankjack121:12345@cluster0.qbb81tx.mongodb.net/sample-server';

// Sample Data Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true }
});

const User = mongoose.model('User', userSchema);

// MongoDB Connection
async function connect() {
    try {
        await mongoose.connect(uri);
        console.log('====================================');
        console.log("Mongodb connected");
        console.log('====================================');
    } catch (error) {
        console.error(error);
    }
}

connect();

// Serve HTML Form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

// POST Route - Create Sample Data
app.post('/user', async (req, res) => {
    const { name, email, age } = req.body;
    
    try {
        const newUser = new User({ name, email, age });
        await newUser.save();
        res.status(201).send(`
            <h1>User Created Successfully</h1>
            <p>Name: ${newUser.name}</p>
            <p>Email: ${newUser.email}</p>
            <p>Age: ${newUser.age}</p>
            <a href="/">Go Back</a>
        `);
    } catch (error) {
        res.status(400).send(`<h1>Error: ${error.message}</h1><a href="/">Go Back</a>`);
    }
});

// Start Server
app.listen(8000, () => {
    console.log("Server Started on port 8000");
});
