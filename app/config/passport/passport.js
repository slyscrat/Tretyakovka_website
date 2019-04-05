  //load bcrypt
  var bCrypt = require('bcrypt-nodejs');
  var sender = require('./sender.js');
  var receiver = require('./receiver.js');
  var AuthTwitterStrategy = require('passport-twitter').Strategy;
var AuthVKStrategy = require('passport-vkontakte').Strategy;
var config = require("../config.json");
var generateHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
  };

  module.exports = function(passport,user){

  var User = user;
  var LocalStrategy = require('passport-local').Strategy;


  passport.serializeUser(function(user, done) {
          done(null, user.id);
      });

/*passport.serializeUser(function (user, done) {
  done(null, JSON.stringify(user));
});*/

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id).then(function(user) {
        if(user){
          done(null, user.get());
        }
        else{
          done(user.errors,null);
        }
      });

  });


    passport.use('vk', new AuthVKStrategy({
      clientID: config.auth.vk.app_id,
      clientSecret: config.auth.vk.secret,
      callbackURL: config.app.url + "/signin/vk/callback"
  },
  function (accessToken, refreshToken, profile, done) {
  
      console.log("vk auth: ", profile);
     User.findOne({where: {vk_id:profile.id}}).then(function(user){
  
        if(user)
        {
          userinfo = user.get();
          return done(null, userinfo);
        }
  
        else
        {
          var userPassword = generateHash(profile.id);
          var data =
          {
          name: profile.displayName,
          password: userPassword,
          photoUrl: profile.photos[0].value,
          vk_id: profile.id,
          role: 'admin'
          };
  
  
          User.create(data).then(function(newUser,created){
            if(!newUser){
              return done(null,false);
            }
  
            if(newUser){
              return done(null,newUser);
              
            }})}
})}));

passport.use(new AuthTwitterStrategy({
  //consumerKey: TWITTER_CONSUMER_KEY,
  //consumerSecret: TWITTER_CONSUMER_SECRET,
consumerKey: config.auth.twitter.app_id,
  consumerSecret: config.auth.twitter.secret,
  callbackURL: config.app.url + "/signin/twitter/callback"
},
/*function(token, tokenSecret, profile, cb) {
  User.findOrCreate({ twitterId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}*/
function (accessToken, refreshToken, profile, done) {

      console.log("twitter auth: ", profile);
  //console.log("twitter auth: ", profile.displayName);
  User.findOne({where: {tw_id:profile.id}}).then(function(user){
  
    if(user)
    {
      userinfo = user.get();
      return done(null, userinfo);
    }

    else
    {
      var userPassword = generateHash(profile.id);
      var data =
      {
      name: profile.displayName,
      password: userPassword,
      photoUrl: profile.photos[0].value,
      tw_id: profile.id,
      role: 'user'
      };


      User.create(data).then(function(newUser,created){
        if(!newUser){
          return done(null,false);
        }

        if(newUser){
          return done(null,newUser);
          
        }})}
})
  }
));

  passport.use('local-signup', new LocalStrategy(

    {           
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done){

       User.findOne({where: {email:email}}).then(function(user){

      if(user)
      {
        req.session.message = "That email is already taken"
        return done(null, false);
      }

      else
      {
        var userPassword = generateHash(password);
        var data =
        { email:email,
        password:userPassword,
        name: req.body.name,
        role: 'admin'
        };


        User.create(data).then(function(newUser,created){
          if(!newUser){
            console.log("Something went wrong");
            return done(null,false);
          }

          if(newUser){
            receiver.getEmail(data);
            sender.sendEmail(data);
            console.log("New user was created");
            return done(null,newUser);
            
          }


        });
      }


    }); 



  }



  ));
    
  //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy(
    
  {

  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
  },

  function(req, email, password, done) {

    var User = user;

    var isValidPassword = function(userpass,password){
      return bCrypt.compareSync(password, userpass);
    }

    User.findOne({ where : { email: email}}).then(function (user) {

      if (!user) {
        req.session.message = "Email doesn't exist";
        return done(null, false);
      }

      if (!isValidPassword(user.password,password)) {
        req.session.message = "Incorrect password";
        return done(null, false);

      }

      var userinfo = user.get();
      
      return done(null,userinfo);

    }).catch(function(err){

      console.log("Error:",err);
      req.session.message = "'Something went wrong with your Signin'"
      return done(null, false);


    });

  }
  ));

  }