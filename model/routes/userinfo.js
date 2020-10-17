const router = require("express").Router();
let UserInfo = require('../userinfo.model');
var salt = 10;
const bcrypt = require("bcrypt");



/* Profile Page API */

router.route('/getProfile').post((req,res) =>{
    UserInfo.findOne({username : req.body.username})
    .then(function(user){
        if(user)
        {
            res.status(200).json(user).send()
        }
    })
    .catch(err => {
        res.status(300).send()
        console.log("Error")
    })
})


/* Forgor password validation API */ 

router.route('/getUser').post((req,res) =>{
    UserInfo.findOne({username : req.body.username, email : req.body.email})
    .then(function(user){
        if(user)
        {
            res.status(200).json(user).send()
        }
        else
        {
            res.status(300).send()
            console.log("Error")
        }
    })
})

/* Password update API */

router.route('/updatePassword').post((req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    UserInfo.findOne({email : email})
    .then(function(user){
        if(user)
        {
           UserInfo.findOneAndUpdate({email : email, password : password})
           .then(()=>{
               res.status(200).send()
           })
           .catch(err =>{
               res.status(400).send()
               console.log("Error")
           })
        }
    })
})

/* Signup page API */

router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const newUserInfo = new UserInfo({username,email,password});
    UserInfo.findOne({username : username}, async (err,user) => {
        if(user)
        {
            res.status(300).send()
        }
        else
        {
            const salt = await bcrypt.genSalt(10);
            newUserInfo.password = await bcrypt.hash(newUserInfo.password, salt);
            await newUserInfo.save()
            .then(() => {
                res.status(200).send()
                console.log("Success")
            })
            .catch(err => res.status(400).send());
        }
    })
})

/* Login API */

router.route('/getUserInfo').post((req,res)=>{
    UserInfo.findOne({username : req.body.username})
    .then(function(user){
        if(!user)
        {
            res.status(400).send();
        }
        else
        {
            bcrypt.compare(req.body.password, user.password, function (err, result) 
            {
                if (result == true) 
                {
                    res.status(200).json(user).send();
                } 
                else   
                {
                    res.status(400).send();
                }
            });
        }
    })
})

module.exports = router;