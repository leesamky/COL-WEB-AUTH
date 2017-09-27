const mongoose=require('mongoose')
const bcrypt=require('bcrypt-nodejs')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/example', {
    useMongoClient: true,

});

const userSchema=mongoose.Schema({
    user:{
        username:String,
        password:String
    }
})

userSchema.methods.generateHash=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null)
}

userSchema.methods.validPassword=function(password){
    return bcrypt.compareSync(password,this.user.password)
}

module.exports=mongoose.model('User',userSchema)