module.exports=function(app,passport){
    app.get('/',
        function(req, res) {
            res.render('home', { user: req.user });
        });

    app.get('/login',
        function(req, res){
            res.render('login',{message:req.flash('loginMessage')});
        });

    app.post('/login',
        passport.authenticate('local-login', {
            failureRedirect: '/login' ,
            successRedirect: '/profile',
            failureFlash:    true
        }));

    app.get('/signup',
        function(req, res){
            res.render('signup',{message:req.flash('signupMessage')});
        });

    app.post('/signup',
        passport.authenticate('local-signup', {
            failureRedirect: '/signup' ,
            successRedirect: '/profile',
            failureFlash:    true
        }));

    app.get('/logout',
        function(req, res){
            req.logout();
            res.redirect('/');
        });

    app.get('/profile',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res){
            res.render('profile', { user: req.user });
        });
}