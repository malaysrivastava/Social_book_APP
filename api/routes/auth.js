var express = require('express');
const passport = require('passport');
var router = express.Router();

//AUth with google

router.get('/google',passport.authenticate('google',{ scope: ['profile']}))

//Google auth callback
// GET /auth/google/callback

router.get('/google/callback',passport.authenticate('google',{failureRedirect:
'/'}),(req,res)=>{
    res.redirect('/dashboard')
});

//logout user

router.get('/logout', (req,res)=>{
    req.logout()
    res.redirect('/')
})

module.exports = router;
