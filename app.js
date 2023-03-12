const express = require('express')
const app = express()
const studentRoute = require('./routes/student_route')
const teacherRoute = require('./routes/teacher_route')
const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config() // Agar aapke environment variable ka naam hi hai .env toh aapko path pass krne ki jarurat nahi hai


const PORT = process.env.PORT || 3000
// SOLID principles of OOPS
// Database -> Collections -> Records
// Excel (File) -> Sheets (Collection) -> Rows
// Middleware 
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Connected with Database")
}).catch((err)=>{
    console.log(err)
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


app.use("/student", studentRoute)
app.use("/teacher", teacherRoute)


app.listen(PORT, (err)=>{
    if(err)
    console.log(err)
    else
    console.log("Server is running on PORT:", PORT)
})
