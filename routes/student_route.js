const express = require('express')
const router = express.Router()
const Student = require('../model/Student.js')

router.use(express.json())


router.get("/allStudent", async (req,res)=>{
      try{
      let studentData = await Student.find({});
      res.json({studentData})
      }catch(err)
      {
        res.json({message: err.message})
      }
})

router.post("/searchByEmail", async (req,res)=>{
      let email = req.body.email
      if(!email)
      {
        return res.json({message: "Please send email in req body"})
          
      }
      try{      
      let student = await Student.find({email}) // Ek array of records
      if(student.length==0)
      {
        return res.json({message: "No Student found with given email ID"})
      }
      else
      {
        return res.json({info:student[0]})
      }
    } catch(err)
    {
        return res.json({message: err.message})
    }
     
})
router.get("/edit/:id", async (req,res)=>{
  let key = req.params.id
   try{
    let editdata = await Student.findById(key)
      return res.json({editdata, code: 200})
  } catch (err) {
      return res.json({ message: err.message })
  }
  
})

router.post("/update/:id", async (req,res)=>{
  let id = req.params.id
  try{
  let updateStudent = await Student.findById(id)
  let data = updateStudent
   updateStudent.firstName = req.body.firstName
   updateStudent.lastName = req.body.lastName
    await data.save()
    return res.json({ message: "Update Successfully"})
  } 
  catch (err) {
      return res.json({ message: err.message })
  }
  
})



router.get("/delete/:id", async (req,res)=>{
  let id = req.params.id
  
  try{
  await Student.findByIdAndDelete(id)
  return res.json({message: "Record deleted successfully"})
  }
  catch(err)
  {
    return res.json({message: err.message})
  }
})



router.post("/search", async (req,res)=>{
     
  let query = req.body

  try{
  let info = await Student.find(query)
   return res.json({info})
  }catch(err)
  {
    return res.json(({message: err}))
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
   let tempStudent = new Student({
       firstName, lastName, email
   })

   let savedStudent = await tempStudent.save()
   return res.json({savedStudent})
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

//update wala feature delete wale feature ki tarah daalenge, jaisey delete wale functionality mein
// hm har delete button ko click krne pe test function call kr rhe they with the id of the 
//record as a paramter usi tarah, edit wale mein bhi aap delete ki tarah button banaoge aur usko
// click krne socho update function hoga usme us record ki id pass kroge, aur record ki id pass 
// krne ke baad aap backend mein jaaunga uska id ka data leke aaunga ar phir modal mein prefill
// krwaunga, aur data change krke update krna hai