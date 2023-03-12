const express = require('express')
const router = express.Router()
const Teacher = require('../model/Teacher.js')


router.use(express.json())

router.get("/allTeacher", async (req,res)=>{
    try{
        let teacherData = await Teacher.find({});
        res.json({teacherData})
        }catch(err)
        {
          res.json({message: err.message})
        }
})

router.get("/searchByEmail",async (req,res)=>{
    let email = req.body.email
    if(!email)
    {
      return res.json({message: "Please send email in req body"})
        
    }
    try{      
    let teacher = await Teacher.find({email}) // Ek array of records
    if(teacher.length==0)
    {
      return res.json({message: "No Teacher found with given email ID"})
    }
    else
    {
      return res.json({info:teacher[0]})
    }
  } catch(err)
  {
      return res.json({message: err.message})
  }
})

router.post("/addNew", async (req,res)=>{
    let {firstName, lastName, email} = req.body
    if(!firstName || !lastName || !email)
    {
 
          return res.json({message: "Please enter all the fields"})
    }
  try{
   email = email.toLowerCase()
    let tempTeacher = new Teacher({
        firstName, lastName, email
    })
 
    let savedTeacher = await tempTeacher.save()
    return res.json({savedTeacher})
  } catch(err)
  {
     if(err.code==11000)
     {
       return res.json({message: 'Email Id already exists'})
     }
     return res.json({message: err.message})
 
  }
 
 
 
 
})



module.exports = router

