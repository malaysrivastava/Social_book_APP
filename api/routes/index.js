var express = require('express');
var router = express.Router();

//login/landing page

router.get('/',(req,res)=>{
  res.render('login.hbs',{
    layout: 'login',
  })
});

//dashboardpage

router.get('/dashboard',(req,res)=>{
  res.render('dashboard.hbs')
});
module.exports = router;
