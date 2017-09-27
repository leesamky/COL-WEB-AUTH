const passport=require('passport')
const path=require('path')
module.exports=function(app){
    app.set('views', path.resolve(__dirname,'../views'));
    app.set('view engine', 'ejs');
    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({ extended: true }));
    app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(require('connect-flash')())
}