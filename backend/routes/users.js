const express = require('express');
const { restart } = require('nodemon');
const router = express.Router()
const User = require('../models/User')

// Route 1 : Create a USER using POST "/api/users/createuser"
router.post('/createuser', async (req, res) => {
    let success = false; 
    try {
      let user = await User.findOne({email: req.body.email})
      if(user){
          return res.status(400).json({success, error: "Sorry a user with this email already exist"})
      }

      user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
      })
      success =  true
      user = user.toObject();
      delete user.password
      res.json({success, user})

    } catch (error) {
      console.error(error.message)
      res.status(500).send("Internal Server Error")
    }
  })

  // Route 2 : Login a USER using POST "/api/users/login"
  router.post('/login', async (req, res) => {
    // const {email, password} = req.body
    try {
      let user = await User.findOne(req.body).select("-password")
      if(!user){
        success = false;
        return res.status(400).json({success, error: "Please try to login with correct credentials"})
      }

      success = true;
      res.json({success, user})

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

  // Route 3 : 

module.exports = router