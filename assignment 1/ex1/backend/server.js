const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = 'your_jwt_secret';

let users = [];
let students = [];
let courses = [];

// Utility functions
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') return res.sendStatus(403);
    next();
};

// Auth routes
app.post('/api/signup', async (req, res) => {
    const { firstName, lastName, studentNumber, address, city, phoneNumber, program, semester, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { id: users.length + 1, firstName, lastName, studentNumber, address, city, phoneNumber, program, semester, email, password: hashedPassword, role: 'student' };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
});

// Student routes
app.get('/api/students', authenticateToken, isAdmin, (req, res) => {
    res.json(students);
});

app.post('/api/students', authenticateToken, isAdmin, (req, res) => {
    const newStudent = { id: students.length + 1, ...req.body };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// Course routes
app.get('/api/courses', authenticateToken, (req, res) => {
    res.json(courses);
});

app.post('/api/courses', authenticateToken, isAdmin, (req, res) => {
    const newCourse = { id: courses.length + 1, ...req.body };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

app.put('/api/courses/:id', authenticateToken, isAdmin, (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = courses.find(c => c.id === courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    Object.assign(course, req.body);
    res.json(course);
});

app.delete('/api/courses/:id', authenticateToken, isAdmin, (req, res) => {
    const courseId = parseInt(req.params.id);
    courses = courses.filter(c => c.id !== courseId);
    res.sendStatus(204);
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
