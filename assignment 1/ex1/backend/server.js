const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// In-memory database to store users
let users = [];

// Sign up route
app.post('/signup', (req, res) => {
    const { firstName, lastName, address, city, phoneNumber, semester, email, password } = req.body;
    const newUser = { firstName, lastName, address, city, phoneNumber, semester, email, password };
    users.push(newUser);
    res.status(201).send('User created successfully');
});

// Sign in route
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        res.status(200).send('Sign in successful');
    } else {
        res.status(401).send('Invalid email or password');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
