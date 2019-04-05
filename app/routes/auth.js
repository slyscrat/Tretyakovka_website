var authController = require('../controllers/authcontroller.js');
var authenticator = require('./addFuncs.js');

module.exports = function(app,passport){

app.get('/signup', authController.signup);
app.get('/', authController.main);

app.get('/signin', authController.signin);
app.get('/signin/tw', passport.authenticate('twitter'))
app.get('/signin/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/signin'}), function(req, res){
    res.redirect('/dashboard');
})
app.get('/signin/vk', passport.authenticate('vk', {
    scope: ['friends']
}));
app.get('/signin/vk/callback', function(req, res, next){	
    req.query.error ? res.redirect('/'): next();
    },
    passport.authenticate('vk', {
        failureRedirect: '/signin'
    }), 
    function (req, res) {
        // Successful authentication, redirect home.
    res.redirect('/dashboard');}
);
app.post('/signup', passport.authenticate('local-signup', { successRedirect: '/dashboard',
                                                    failureRedirect: '/signup'}
                                                    ));


app.get('/dashboard', authenticator.isLoggedIn, authController.dashboard);


app.get('/logout', authController.logout);

app.post('/signin', passport.authenticate('local-signin',  { successRedirect: '/dashboard',
                                                    failureRedirect: '/signin'}
                                                    ));
}






