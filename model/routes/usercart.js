const router = require("express").Router();
const UserCart = require('../usercart.model');

router.route('/userCartAdd').post((req,res)=>
{
    const username = req.body.username;
    const booktype = req.body.booktype;
    const bookname = req.body.bookname;
    const quantity = req.body.quantity;
    const newUserCart = new UserCart({username,booktype,bookname,quantity});
    UserCart.findOne({username : username,bookname : bookname}, function(err,user){
        if(user)
        {
            res.status(400).send()
        }
        else
        {
            newUserCart.save()
            .then(()=>{
                res.status(200).send()
            })
            .catch(err =>{
                res.status(300).send()
                console.log("newtwork Error")
            })
        }
    })
})

router.route('/userCartGet').post((req,res)=>{
    UserCart.find({username : req.body.username})
    .then(function(user){
        if(!user)
        {
            res.status(400).send();
            console.log("Error")
        }
        else
        {
            res.status(200).json(user).send();
        }
    })
})

router.route('/userCartDelete').post((req,res) => {
    const username = req.body.username
    const bookname = req.body.bookname
    UserCart.find({username : username})
    .then(function(user){
        if(user)
        {
            UserCart.findOne({bookname : bookname})
            .then(function(book){
                if(book)
                {
                    UserCart.findOneAndDelete({bookname : bookname})
                    .then(()=>
                    {
                        res.status(200).send()
                    })
                    .catch(err => {
                        console.log("Error")
                    })
                }
                else
                {
                    console.log("there is no book like that")
                }
            })
        }
        else
        {
            console.log("No user found")
        }
    })
})

module.exports = router;