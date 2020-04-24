const express = require('express');
const router = express.Router();
let Register = require('../models/register');
let Login = require('../models/login');
const jwt = require('jsonwebtoken');
const Product = require('../models/products');

const mongoose = require('mongoose');
const db = "mongodb+srv://chidimma:Chidimma11@imagesappdb-q8gyg.mongodb.net/imagesappdb?retryWrites=true&w=majority";

//check mongodb connection
mongoose.connect(db, err => {
    if (err) {
        console.log('error from mongodb', err);
    } else {
        console.log('connected successfully to mongodb');
    }
})


//middleware for connection checking for jwt 

router.get('/', (req, res) => {
    res.send('From API route');
});

//fetch register APi
router.post('/register', (req, res) => {
    let userData = req.body;
    let newUser = new Register(userData);
    Register.findOne({ email: userData.email}, (error, user) => {
        if(error){
            console.log('error from registration API')
        } else {
            if(user){
                res.status(400).send('User Already Exist')
            } else {
                newUser.save((error, registeredUser) => {
                    if(error) {
                        console.log('error from the register API', error);
                        alert('user wasnt saved try again or check your connection')
                    } else {
                        let payload = { subject: registeredUser._id};
                        let token = jwt.sign(payload, 'secretKey');
                        res.status(200).send({token});
                    }
                });
            }
        }
    })
   
});

//fetch login Api
router.post('/login', (req, res)  => {
    let userData = req.body;
    Login.findOne({ email: userData.email}, (error, user)=> {
        if(error) {
            console.log('errors from login API', error)
        } else {
            if(!user) {
                res.status(401).send('invalid email address');
            } else{
                if( user.password !== userData.password){
                    res.status(401).send('wrong password');
                }else {
                    let payload = { subject: user._id};
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({token});
                }
            }
        }
    })
});

//fetch product from API 
router.get('/products', (req, res) => {
    Product.find((err, document) => {
        if (err) {
            console.log('could not get product from DB', err)
        } else {
            res.json(document);
        }
    })
});


module.exports = router