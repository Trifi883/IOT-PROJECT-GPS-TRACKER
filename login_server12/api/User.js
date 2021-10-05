const express = require('express') ; 
const router = express.Router(); 
//mongodb user mode
const User = require('./../models/User'); 
 const bcrypt = require('bcrypt') ; 

//Signup 
router.post('/signup' , (req ,res) => { 
    let{name , email , password , dateOfBirth}= req.body ; 
     name = name; 
     email = email;
     password = password; 
     dateOfBirth = dateOfBirth; 

     if (name=="" || email=="" || password =="" || dateOfBirth =="" ) {

        res.json({
             status:"FAILED" , 
             message : "empty input fields !"
 
        }) ; 
     } else if(password.length < 8){
        
        res.json({
             status:"FAILED" , 
             message : "password is too short !"
        }) 

     }else {
    //checking if user already exist 
    User.find({email}).then(result => {
        if(result.length){
            //user exist !!!!!!!!
        res.json({
             status:"FAILED" , 
             message : "User with the provided email already exists"
        }) 

        }else{
                 //create new user
                 //password handling 
                 const saltRounds= 10 ; 
                 bcrypt.hash(password , saltRounds).then(hashedPassword =>{
                  const newUser = new User({
                    name,
                    email , 
                    password:hashedPassword , 
                    dateOfBirth 
                  }); 

                  newUser.save().then( result => {
                    res.json({
                        status : "SUCCESS" ,
                        message:"Signup successful" , 
                        data:result , 
                    }) 
                  }).catch(err => {
              res.json({
             status:"FAILED" , 
             message : err
                   }) 

                  })
                }).catch(err => {
                     res.json({
                        status:"FAILED", 
                        message:"An error occurred while checking for existing user !" })
                 })
        }
    }).catch(err => { 
      console.log(err);
      res.json({
          status:"FAILED", 
          message:"An error occurred while checking for existing user !!"
      }) 
    })

     }
    
})
//signin 
router.post('/signin' , (req , res) =>{ 
  
  let {email , password}=req.body ; 
  email = email;
  password =password ; 
  if(email=="" || password == ""){
    res.json({ 
      status :"FAILED" , 
      message:"Empty credentials supplied"
    })
  } else {
     //check if user exist 
     User.find({email}).then(data => {
      if(data){
        //User exists 
        const hashedPassword = data[0].password ; 
        bcrypt.compare(password , hashedPassword).then(result => {
         if(result){
          res.json({
            status: "SUCCESS",
            message: "Signin successful",
            data: data,
          });
         }else {
           res.json({
              status : "Failed",
              message : "Invalid passowrd entered!" 
          })
         }
        })
        .catch(err => {
         res.json({ 
          status: "FAILED", 
          message:"An error occurred while comparing passwords"
       })
        })

      } else {
         res.json({ 
          status: "FAILED", 
          message:"Invalid credentials  entered!"
       })
      }
     })
     .catch(err => { 
            res.json({
          status: "FAILED", 
          message:"An error occurred while checking for existing user"

            })

     })

  }
   
})
router.get('/get',(req,res)=> {
User.find().then(result => {res.json(result)}).catch(err =>{
    res.json(err)
    console.log(err)})
});

module.exports = router ; 
