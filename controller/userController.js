const userSchema=require('../model/usermodel')
const bcrypt=require('bcrypt')
const saltround=10;
//const userModel = require('../model/userModel');

const registerUser= async (req,res)=>{
    try{
        const {email,password}=req.body
        const user=await userSchema.findOne({email})
        if(user) {
            //req.flash('error', 'User already exists');
            const message = "user already exist";
            console.log('Message sent to view:', message); // Debugging line

            return res.render('user/register',{message})
        }  
        const hashedPassword=await bcrypt.hash(password,saltround) // toget the hashed password into this variable
        const newUser= new userSchema({
            email,
            password:hashedPassword
        })
        await newUser.save()
        const message = "user created successfully"
        console.log('Message sent to view:', message); // Debugging line

        res.render('user/login',{message})
        //alert("hii")
    }catch(error){
        console.error(error);
    res.status(500).render('user/register', { message: 'Internal server error' });
    }
} 
const login=async(req,res)=>{
    try {
        const{email,password}=req.body
        const user= await userSchema.findOne({email})
        if(!user)
            return res.render('user/login',{message:'user does not exist'})
        const isMatch= await bcrypt.compare(password,user.password) //to check user entered pswd with our pswd in bcrypt format bcoz we are encryptedone while user enters normalal one.
        if(!isMatch)
            return res.render('user/login',{message:'incorrect password'})
        req.session.user=true
        res.render('user/userHome',{message:'login successful'})
        
    } catch (error) {
        res.render('user/login',{message:'something went wrong'})
    }
}
const logout=(req,res)=>{
    

    req.session.user=null;
    res.redirect('/user/login')
}
// const contact=(req,res)=>{
//     res.redirect('/contact/login')
// }

const loadRegister=(req,res)=>{
    res.render('user/register')
}
const loadLogin=(req,res)=>{
    res.render('user/login')
}
const loadHome= (req,res)=>{
    res.render('user/userHome')
}
module.exports= {registerUser
    ,loadRegister,loadLogin,login,loadHome,logout
}