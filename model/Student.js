const mongoose = require('mongoose')
const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
})

const Student = mongoose.model("student", StudentSchema)
module.exports = Student