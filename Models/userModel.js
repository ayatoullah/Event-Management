let mongoose=require("mongoose");
autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost:27017/eventDB");
autoIncrement.initialize(connection);
//2-ORM
let userModel=new mongoose.Schema({
    _id:Number,
    Name:String,
    BirthDate:String,
    Gender:String,
    username:String,
    password:String
    /*BD:{
        type:Date,
        require:true,
    }*/

});
/*userModel.pre("save",function(next){
    var user=this;
    console.log(user);
    this.hashedPassword(user,password,function(err,hash){
        if(err){
            next(err);
        }
        user.password=hash;
        next();

    })
    next();

})
userModel.methods.hashPassword=function hashPassword(candidatePassword){
    bcrypt.genSalt(11,function(err,salt){
        if(err){
           cb(err);
        }
        //console.log(salt);
        bcrypt.hash(candidatePassword,salt,function(err,hash){
            if(err){
                cb(err);
            }
            cb(null,hash);

        });
    })
}
//hashPassword('password');
userModel.plugin(autoIncrement.plugin, {
    model: 'users',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});*/
//3-mapping
        //collection        //schema
mongoose.model("users",userModel);