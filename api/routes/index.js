var express = require('express');
var router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//login/landing page

router.get('/',ensureGuest,(req,res)=>{
  res.render('login.hbs',{
    layout: 'login',
  })
});

//dashboardpage

router.get('/dashboard',ensureAuth,(req,res)=>{
  
  res.render('dashboard.hbs')
});
module.exports = router;
