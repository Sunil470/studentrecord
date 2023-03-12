const mongoose = require('mongoose')




const TeacherSchema = new mongoose.Schema({
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

    
}, {timestamps: true})



const Teacher = mongoose.model("teacher", TeacherSchema)
module.exports = Teacher