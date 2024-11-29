const adminmodel = require('../model/adminmodel')
const adminSchema=require('../model/adminmodel')
const bcrypt=require('bcrypt')
const usermodel = require('../model/usermodel')


const loadLogin=(req,res)=>{
    res.render('admin/login')
}
const login= async(req,res)=>{
    try {
        const{email,password}= req.body
        const admin= await adminmodel.findOne({email})
        if(!admin)
            return res.render('admin/login',{message:'Invalid credentials'})
        const isMatch= await bcrypt.compare(password,admin.password)
        if(!isMatch)
            return res.render('admin/login',{message:'incorrect password'})
        req.session.admin=true
        res.redirect('/admin/dashBoard')


    } catch (error) {
      res.send(error)  
    }
}
const loadDashBoard=async(req,res)=>{
    try {
        const admin=req.session.admin
        if(!admin) return res.redirect('/admin/login')
            const users= await usermodel.find({})
        res.render('admin/dashBoard',{users})
    } catch (error) {
        
    }
}
const editUser= async(req,res)=>{
    try {
        const {email,password,id}=req.body
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await usermodel.findByIdAndUpdate({_id:id},
            {$set:{email,passsword:hashedPassword}})
        
        res.redirect('/admin/dashBoard')
    } catch (error) {
        console.log(error)
    }
}
const deleteUser=async(req,res)=>{
    try {
        const {id}=req.params;
        const user= await usermodel.findOneAndDelete({_id:id})
        res.redirect('/admin/dashBoard')
    } catch (error) {
        console.log(error);
        
    }
}
const addUser=async(req,res)=>{
    try {
        const {email,password}=req.body
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser= new usermodel({
            email,
            password:hashedPassword
        })
    await newUser.save();
    res.redirect('/admin/dashBoard')
        
    } catch (error) {
        console.log(error)
    }
}
const logout=(req,res)=>{
    req.session.destroy()
    

    res.redirect('/admin/login')
}
module.exports={loadLogin,login,loadDashBoard,editUser,deleteUser,addUser,logout}