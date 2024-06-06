const asyncHander = require('express-async-handler')
const Student = require('../models/student')

// Error Formatter Function
const errorFormatter = (e) => {
    let errors = {};

    // Unique value constraints 
    if (e.code && e.code === 11000) {
        let keyValue = e.keyPattern;
        if (keyValue.email) {
            errors.email = "The email address is already in use";
        }
        if (keyValue.studentNo) {
            errors.studentNo = "The student number is already in use";
        }
        return {'errors': errors};
    }

    // Validation error
    let errorMessage = e.message
    errorMessage = errorMessage.substring(errorMessage.indexOf(':') + 1).trim();

    let errorArr = errorMessage.split(',').map(err => err.trim());
    errorArr.forEach(error => {
        let [key, value] = error.split(':').map(err => err.trim())
        errors[key] = value;
    })
    
    return { 'errors' : errors }
}

//@ desc    Get All Students
//@ route   GET /api/student
//@ access  PUBLIC   
const getStudents = asyncHander(async (req, res) => {
    let students = await Student.find()
    res.status(200).json(students)
}) //END getStudents

//@ desc    Get a Student by ID
//@ route   GET /api/student/:id
//@ access  PUBLIC  
const getStudentById = asyncHander(async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        return res.status(200).json(student)
    } catch (error) {
        return res.status(404).json({ message: 'Failed to retrieve the student data', error })
    }
}) //END getStudentById


//@ desc    Create a Student
//@ route   POST /api/student
//@ access  PUBLIC   
const addStudent = asyncHander(async (req, res) => {
    try {
        let newStudent = await Student.create(req.body)
        res.status(201).json(newStudent);
    } catch (error) {
        let err = errorFormatter(error);
        return res.status(500).json(err);
    }
}) //END addStudent

//@ desc    Update a Student
//@ route   PUT /api/student/:id
//@ access  PUBLIC   
const updateStudent = asyncHander(async (req, res) => {
    // Check if user data can be retrieved from the DB     
    try {
        await Student.findById(req.params.id)
    } catch (error) {
        return res.status(404).json({ message: 'Failed to retrieve the student data', error })
    }

    try {
        let updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true,
        })
        res.status(200).json(updatedStudent)
    } catch (error) {
        let err = errorFormatter(error)
        return res.status(500).json(err);
    }
}) //END updateStudent

//@ desc    Delete a Student
//@ route   POST /api/student/:id
//@ access  PUBLIC   
const deleteStudent = asyncHander(async (req, res) => {
    // Check if user data can be retrieved from the DB 
    try {
        await Student.findById(req.params.id)
    } catch (error) {
        return res.status(404).json({ message: 'Failed to retrieve the student data', error })
    }

    try {
        let student = await Student.findById(req.params.id)
        await Student.deleteOne(student)
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        return res.status(404).json({ message: 'Failed to delete the student data', error })
    }

}) //END deleteStudent

module.exports = {
    getStudents, getStudentById, addStudent, updateStudent, deleteStudent,
}