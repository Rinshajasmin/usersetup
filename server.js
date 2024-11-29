const express = require("express");
const app=express();
const userRoutes= require('./routes/user')
const adminRoutes=require('./routes/admin')
const path=require('path');
const connectDB = require("./database/connectDB");
const session = require('express-session');
const nocache=require('nocache')

//const flash = require('connect-flash');
//const session = require('express-session');


app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(nocache())


app.use(session({
    secret: 'your_secret_key', //secret key that assign aa cookie
    resave: false,             // Prevents session from being saved back to the store if it wasn't modified
    saveUninitialized: true,   // Forces a session that is "uninitialized" to be saved to the store
    cookie: { maxAge: 120000 }  // Session expires after  2minute age of session
}));

// view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'hbs');
//app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/user',userRoutes)
app.use('/admin',adminRoutes)




connectDB();

app.listen(3001,()=>{
    console.log("server started running  at 3001")
})