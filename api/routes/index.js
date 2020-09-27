var express = require('express');
var router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Story = require('../models/Story')

//login/landing page

router.get('/',ensureGuest,(req,res)=>{
  res.render('login',{
    layout: 'login',
  })
});

//dashboardpage

router.get('/dashboard',ensureAuth,async (req,res)=>{
  
  try{
    const stories = await (await Story.find({user:req.user.id})).toLocaleString()
    
  res.render('dashboard',{
    layout: 'main',
    name: req.user.firstName,
    stories
  })

  }catch (err){
    console.error(err)
    res.render('errors/500')
  }
  
  
});
module.exports = router;
