const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    studentNo: {
        validate: {
            validator: function (v) {
                return /\d{9}/.test(v);
            },
            message: "Student number must be a 9 digit number"
        },
        type: String,
        required: [true, 'Please enter the student number'],
        unique: true,
    },
    firstName: {
        type: String,
        required: [true, 'Please enter the first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter the last name'],
    },
    program: {
        type: String,
        required: [true, 'Please enter a program'],
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: "Invalid Email format"
        },
        required: [true, 'Please enter an email address'],
        unique: true,
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: "Please follow the format '000-000-0000"
        },
        required: [true, 'Please enter a phone nubmer'],
    },
    street: {
        type: String,
        required: [true, 'Please enter the street address'],
    },
    city: {
        type: String,
        required: [true, 'Please enter the city'],
    },
    province: {
        type: String,
        required: [true, 'Please enter the province'],
    },
},
    {
        timestamps: true,
    })

module.exports = mongoose.model('Student', studentSchema)