let http=require("http");
//2-fun to handle req
function handlerequest(request,response){
    console.log("incoming request"+request.url,request.method);
    response.writeHead(200,
        {
            //'Content-Type':"text/plain"
            'Content-Type':"text/html"
            //'Content-Type':"application/json"
        });
        //response.end("end");
       // response.end(`<div style='color:green'>blabla</div>`);
      // let obj={data:"Server Data"};
       //response.end(JSON.stringify(obj));

       //Routing

       switch(request.url)
       {
           case "/":
            response.end(`<div style='color:green'>welcome from server</div>`);
           break;
           case"/login":
           response.end(`<div style='color:green'>login</div>`);
           break;
           case"":
           break;
           default:
           break;
       }

}
//1-create server
let server=http.createServer(handlerequest)
//3-listen
server.listen(8080)
console.log("I am listening");
