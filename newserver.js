

let express=require("express"),
 morgan=require("morgan"),
 path=require("path"),
 bodyparser=require("body-parser").urlencoded({extended: true}),
 authRouter=require("./Routes/authorization"),
speakerRouter=require("./Routes/speakers"),
 eventRouter=require("./Routes/events"),
 express_session=require("express-session"),
 connect_flash=require("connect-flash"),
 cookie_parser=require("cookie-parser"),
 mongoose=require("mongoose");
//create server
let app=express();
mongoose.connect("mongodb://localhost:27017/eventDB");
/*middleware*/
//first middle
/*app.use(function(request,response,next){
    console.log(request.url,request.method);
    //response.send("firstmiddlwware");
    next();
})*/

app.set("view engine","ejs");
app.set("Views",path.join(__dirname,"Views"));

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,"Publics")))
app.use(bodyparser);
app.use(express_session({
    "secret":"aya"
}));
app.use(connect_flash());
app.use(cookie_parser());
//second middle
/*app.use((request,response,next)=>{
    let minutes=(new Date()).getMinutes();
    if (minutes>10){
        //response.send("authorize");
        next();
    }
    else{
        //response.send("unauthorize");
        next(new Error("un authorized"));
    }
}

);*/
//third middle
//app.use((request,response,next)=>{
    //response.send("offerpage");
   // next();
   
//});

//roting
app.use(/\//,(request,response)=>{
    //response.send("Home");
    //response.sendfile(path.join(__dirname,"Views","Index.html"));
    response.render("Index");
})
app.use(authRouter);
app.use("/events",eventRouter);
app.use("/speakers",speakerRouter);
/*app.use((request,response,next)=>{
    console.log("here");

    if(request.session.userName&&request.session.password){
        //request.session.UserName=request.body.UserName;
        //request.session.password=request.body.password;
        //request.locals.Name=request.session.UserName;
        //console.log(request.locals);
       next(); 
    }else{
      
        response.redirect("/login");
    }

});*/
//error

app.use((err,request,response,next)=>{
    response.send(err.message);
   
});

app.listen(8080,()=>{
    console.log("listening");
   
});
