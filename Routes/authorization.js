let express=require("express");
let path=require("path");


let authRouter=express.Router();
authRouter.get("/login",(request,response)=>{
    //console.log(request.query.name,request.query.age);
    //response.sendfile(path.join(__dirname,"..","Views","authorization","login.html"))
   
    //response.send("login get");
    response.render("authorization/login",{msg:request.flash("msg")});
});
authRouter.post("/login",(request,response)=>{
    //console.log(request.body);
    //response.send("login post");
    if(request.body.UserName=="eman" && request.body.password=="25")
    {
        request.session.UserName=request.body.UserName;
        request.session.password=request.body.password;
        console.log(request.session.UserName);
        ///request.locals.Name=request.session.UserName;
        //console.log(request.locals.Name);
        
        
        
        //response.cookie("count",1);
        
        //console.log(console.session);
        //response.sendfile(path.join(__dirname,"..","Views","authorization","profile.html"))
        //response.render("authorization/profile",{user:request.body.UserName,array:["mona","ahmed"]});
        console.log(request.cookies.count);
        response.redirect("speakers/list");//,{"count":request.cookies.count});
       // response.redirect("speakers/add",{"count":request.cookies.count});
        //,{user:request.body.UserName,array:["mona","ahmed"]});
    }
    else
    {
        request.flash("msg","username or passworsre wrong try agaain");
        response.redirect("/login");
    }
});
authRouter.get("/register",(request,response)=>{
    response.send("register get");
});
authRouter.post("/register",(request,response)=>{
    
});
authRouter.get("/logout",(request,response)=>{
    request.session.destroy(()=>{
        response.redirect("/login");
    });
    
});
/*authRouter.post("/logout",(request,response)=>{
    
});*/
module.exports=authRouter;
