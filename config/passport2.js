const passport=require('passport');
const userModel2 = require('../module/userModel2');
require('dotenv').config();
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
  function(accessToken, refreshToken, profile, cb) {

    userModel2.findOne({googleId: profile.id},(err,user)=>{
        if(err){
return cb(err,null)
        }
        if(!user){
            const NewUser=new userModel2({
                googleId:profile.id,
                username:profile.displayName
            })
            NewUser.save();
            return cb(null,NewUser)
            

        }
        else{
            return cb(err, user);
        }
    })


    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));