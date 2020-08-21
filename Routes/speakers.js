let express=require("express"),
    speakerRouter=express.Router(),
    //1-
    mongoose=require("mongoose"),
    //how to add pic //1-
    multer=require("multer"),
    fs=require("fs"),
    path=require("path");
//2-
    require("../Models/speakerModel");
//3-
    let speakerModel=mongoose.model("speakers");
    //add dest to pc
    let multerMW=multer({
        "dest":"./publics/images"
    });

    speakerRouter.get("/add",(request,response)=>{
        response.render("speakers/addSpeaker");
        });
      

 //3- add middleware to post fun
    speakerRouter.post("/add",multerMW.single("speakerimage"),(request,response)=>{
        fs.rename(request.file.path,path.join(request.file.destination,request.file.originalname));
        //response.json(request.file);
        let speaker=new speakerModel({
            _id:request.body._id,
            name:request.body.name,
            title:request.body.title

        });
        speaker.save((err,result)=>{
            if(!err){
                response.redirect("/speakers/list");
            }
            else
            {
                response.json(err);
            }
        });
        
    });
    speakerRouter.get("/edit/:id",(request,response)=>{

        console.log("edit get");
        speakerModel.findOne({"_id":request.params.id},(err,result)=>{
            response.render("speakers/editSpeaker",{"speaker":result});
        })
        
        });
    speakerRouter.post("/edit/:id",(request,response)=>{
        //fs.rename(request.file.path,path.join(request.file.destination,request.file.originalname));
        console.log("edit post");
        speakerModel.update(
         
            {"_id":request.params.id},{
            "$set":{
                name:request.body.name,
                title:request.body.title,
            }
        },(err,result)=>{
           if(!err){
            //console.log(err, result);
            response.redirect("/speakers/list");
            /*speakerModel.find({},(err,result)=>{
                response.render("speakers/speakersList",{"speakers":result});
            })*/
        }
            else{
                response.json(err);
           }
        })
      //  response.redirect("/list");
            });
    speakerRouter.get("/delete/:id",(request,response)=>{
                speakerModel.remove( {
                    "_id":request.params.id},(err,result)=>{
                        response.redirect("/speakers/list");    
                    })

            });
      
   
    speakerRouter.get("/list",(request,response)=>{
        speakerModel.find({},(err,result)=>{
            response.render("speakers/speakersList",{"data":result});
        });
      
    });

module.exports=speakerRouter;