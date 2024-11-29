const express=require ('express')
const router=express.Router();
const userController= require('../controller/userController')
const auth=require('../middleware/auth')


router.get('/login',auth.isLogin,userController.loadLogin)
router.post('/login',userController.login)//while submitting the login
router.get('/userHome',auth.checkSession,userController.loadHome)
router.get('/logout',auth.checkSession,userController.logout)
//router.get('/contact',auth.checkSession,userController.contact)

// router.get('/register',(req,res)=>{
//     res.render('user/register') })
 router.get('/register',userController.loadRegister)
// //     console.log(req.body)
// //     console.log("===============================")'
// //     //res.json(req.body)
// //     res.render('user/login')
// })
router.post('/register',userController.registerUser);  // Make sure the route is correctly linked to the controller


module.exports= router