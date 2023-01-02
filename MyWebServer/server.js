//su dung thu vien http cua NodeJS
var http= require('http')

//tao mot server
var server = http.createServer(function(req,res){
    // set response header
    if(req.url =='/'){
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        res.write("<h1>Home page</h1>")
        res.write("<a href='/student'>Student page</a>")
    }else if(req.url=='/student'){
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        res.write("Student")
        res.write("<br><img src='"+"https://www.freevector.com/uploads/vector/preview/28143/Education_Background_vector_5.jpg" + "'>");
    }else if (req.url == '/data') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: "Hello World"}));  
    }
    else
    {
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        res.write("page not found!")
    }
    res.end()
})

//start server o mot port
const PORT = 5000
server.listen(PORT)
console.log("Server is runing!")