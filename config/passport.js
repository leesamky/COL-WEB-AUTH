const LocalStrategy=require('passport-local')
const db=require('../db')
const User=require('../db/model')

module.exports=function(passport){
    passport.use('local-login',new LocalStrategy(
        {passReqToCallback:true},
        function(req,username, password, callback) {
            User.findOne({'user.username':username},function(err,result){
                if(err){
                    return callback(err)
                }
                if(!result){
                    return callback(null,false,req.flash('loginMessage','No user found'))
                }

                if(!result.validPassword(password)){
                    return callback(null,false,req.flash('loginMessage','Wrong Password'))
                }

                return callback(null,result)
            })

        }));

    // passport.use('local-signup',new LocalStrategy(
    //     function(username, password, done) {
    //         db.users.addUser(username, password,function(err, user) {
    //             if (err) { return done(err); }
    //             console.log(db.users.showAll())
    //             return done(null, user);
    //         });
    //     }));

    passport.use('local-signup',new LocalStrategy(
        {passReqToCallback:true},
        function(req,username, password, callback) {

            User.findOne({'user.username':username},function(err,user){

                if(err){
                    return callback(err)
                }
                if(user){
                    return callback(null,false,req.flash('signupMessage','That username is already taken'))
                }else{
                    let newUser=new User()
                    newUser.user.username=username
                    newUser.user.password=newUser.generateHash(password)

                    newUser.save(function(err){
                        if(err){
                            throw err
                        }
                        return callback(null,newUser)
                    })
                }
            })
        }));



    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {

        User.findById(id, function (err, result) {

            if (err) { return done(err); }
            done(null, result);
        });
    });


}