require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const path = require('path')
const {userModel, Connection} = require('./model/user')

// Set EJS as the view engine
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))


app.get('/',(req,res)=>{
   res.send(`Hello User, to get more information about the site <a href='http://localhost:${PORT}/all' >Click here</a> `)
})

app.get('/create',(req,res)=>{
    res.render("create")
 })

 app.get('/all',async (req,res)=>{
   const allUsers =  await userModel.find()
   // res.send(allUsers)
    res.render("allUsers",{users:allUsers})
 })

 app.post('/addUser',async (req,res)=>{
    const{name,email,image} = req.body
   //  console.log(name,email,image)
     await userModel.create({name:name,email:email,image:image})
    res.redirect('/all')
 })

 app.get('/edit/:id',async (req,res)=>{

   // console.log(req.params.id)
    const user = await userModel.findById({_id:req.params.id}) // fetch the user details by id  that need to update later
   //  console.log(user)

    res.render('update',{updateUser:user})    //render the update page with the user details 
})
app.post('/update/:id',async (req,res)=>{
      // console.log(req.params.id)
      await userModel.findOneAndUpdate({_id:req.params.id}, {name:req.body.name,email:req.body.email,image:req.body.image}) ;
      res.redirect('/all')
})

app.get('/delete/:id',async (req,res) => {
   // console.log(req.params.id)
   await userModel.findOneAndDelete({_id:req.params.id})
   res.redirect("/all")
})

Connection()

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})