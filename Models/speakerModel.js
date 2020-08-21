//1-
let mongoose=require("mongoose");
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});
//2-ORM
let speakerModel=new mongoose.Schema({
    _id:Number,
    name:String,
    title:String,
    image:String,
    gender:String,
    username:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
         
    }


    /*BD:{
        type:Date,
        require:true,
    }*/

});
//3-mapping
        //collection        //schema
mongoose.model("speakers",speakerModel);