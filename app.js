require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");



//-------------------- basics --------------------
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/userDB")

const userschema =new mongoose.Schema({
    email:String,
    pasword:String,
})




const secret=process.env.SECRET

console.log(process.env.SECRET)

userschema.plugin(encrypt,{secret:secret,encryptedFields:["pasword"]})

const User= new mongoose.model("User",userschema)
app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/register",(req,res)=>{
    UserName=req.body.username,
    PassWord=req.body.password 
    const user= new User ({
        email:UserName,
        pasword:PassWord
    })

 

    user.save()
    res.redirect("/login")

})

app.post("/login",(req,res)=>{
    User.find({},(err,foundUser)=>{
        foundUser.forEach(user => {
            if(req.body.username===user.email && req.body.password===user.pasword){
res.render("secrets")
            }
        });
    })
})



//-------------------- Listen Route --------------------
app.listen(3000, () => {
    console.log("Server is running at port 3000");
});
