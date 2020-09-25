var express = require('express');
var router = express.Router();

//login/landing page

router.get('/',(req,res)=>{
  res.send('Login')
});

//dashboardpage

router.get('/dashboard',(req,res)=>{
  res.send('Dashboard')
});
module.exports = router;
