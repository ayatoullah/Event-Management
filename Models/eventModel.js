let mongoose=require("mongoose");
autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost:27017/eventDB");
autoIncrement.initialize(connection);
let eventModel=new mongoose.Schema({
    _id:Number,
    title:String,
    date:{
        type:Date,
        default:new Date(),
    },
    mainspeaker:{
        type:Number,
        ref:"speakers"
    },
    otherspeakers:[{
        type:Number,
        ref:"speakers"
    }],
    users:[{
        type:Number,
        ref:"users"
    }]


}) ;

eventModel.plugin(autoIncrement.plugin, {
    model: 'events',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});
//var Event = connection.model('Event', eventModel);
/*eventModel.post("remove",(doc)=>{
    });*/
mongoose.model("events",eventModel);