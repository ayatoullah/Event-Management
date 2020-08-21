let express=require("express"),
eventRouter=express.Router(),
mongoose=require("mongoose");
require("../Models/speakerModel");
require("../Models/eventModel");
let speakerModel=mongoose.model("speakers");
let eventModel=mongoose.model("events");

// eventRouter.get("/add",(request,response)=>{
//     speakerModel.find({},(err,result)=>{
//         if(!err){
//             response.render("events/addevent",{"speaker":result});
//         }

//          /*eventModel.find({}).populate({"path":"mainspeaker otherspeakers"}).then((result)=>{
//         response.render("events/eventsList",{"data":result});
//     });*/
//     })
  
// });

eventRouter.get("/add",(request,response)=>{
    speakerModel.find({},(err,result)=>{
        if(!err){
            response.render("events/addevent",{"speakers":result});
        } 
    })
  
});

eventRouter.post("/add",(request,response)=>{
    let eventdoc=new eventModel({
        //"_id":request.body._id,
        "title":request.body.title,
        "mainspeaker":request.body.mainspeaker,
        "otherspeakers":request.body.otherspeakers
    });

    eventdoc.save((err,doc)=>{
        response.redirect("/list");
    })
});

// eventRouter.post("/add",(request,response)=>{
//     let eventdoc=new eventModel({
//         //"_id":request.body._id,
//         "title":request.body.title,
//         "mainspeaker":request.body.mainspeaker,
//         "otherspeakers":request.body.otherspeakers
//     });

//     eventdoc.save((err,doc)=>{
//         response.redirect("events/list");
//     })
// });

eventRouter.get("/edit/:id",(request,response)=>{

    // let resultData;

    eventModel.find({"_id": request.params.id}).populate({"path":"mainspeaker otherspeakers"}).then((result)=>{
        console.log(result);

        speakerModel.find({},(err,allSpeakers)=>{
            if(!err){
                result.allSpeakers = allSpeakers;
                    console.log(result);
                response.render("events/editevent",{"event":result});
                
            } 
        })

    });

    // eventModel.findOne({"_id":request.params.id},(err,result)=>{
        // console.log("event: ", result);
        // get the data of the main speakers and other speaker here and bend them to the event object
        
        // let resultData = result;

        // resultData.otherSpeakersData = [];

        // let i = 0;
        //     speakerModel.findOne({"_id":result.otherspeakers[i]},(err,result)=>{
        //         console.log(result);
        //         resultData.otherSpeakersData.push(result);

                
        //     })

        // mongoose.getCollection('speakers').find({"_id" : {"$in" : [5,6]} },(err,speakersData)=>{
        //     console.log("result data: ", speakersData);
        //     response.render("events/editevent",{"event":resultData});
        // });


        // console.log({"event": resultData});
        // response.render("events/editevent",{"event":resultData});
    // })
    
});

// eventRouter.get("/edit/:id",(request,response)=>{
//     speakerModel.findOne({"_id":request.params.id},(err,result)=>{
//         response.render("events/editevent",{"event":result});
//     })
    
// });

eventRouter.post("/edit/:id",(request,response)=>{
    console.log("inside post edit");
    eventModel.update(
         
        {"_id":request.params.id},{
        "$set":{
            name:request.body.name,
            title:request.body.title,
            mainspeaker:request.body.mainspeaker,
            otherspeakers:request.body.otherspeakers
        }
    },(err,result)=>{
       // if(!err)
        console.log(err, result);
        response.redirect("/events/list");}
    )

});
eventRouter.get("/delete/:id",(request,response)=>{
    eventModel.remove( {
        "_id":request.params.id},(err,result)=>{
            response.redirect("/events/list");    
        })

});


eventRouter.get("/list",(request,response)=>{
    console.log("hello from evevtlist");
    eventModel.find({},(err,result)=>{
        response.render("events/eventsList",{"data":result});
    })
    /*eventModel.find({}).populate({"path":"mainspeaker otherspeakers"}).then((result)=>{
        response.render("events/eventsList",{"data":result});
    });*/
});



module.exports=eventRouter;