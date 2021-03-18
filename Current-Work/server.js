// Import needed modules
const fs = require('fs');
const http = require('http');

const server = http.createServer((req,res) => {
    // Set the header content type.
    res.setHeader('Content-Type', 'text/html');
    let path = './views/'; // Beginning of the new requested path
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
    }

    // read, write & send the response to the client;
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    }); 
});

// Kick start the server
server.listen(3000,'localhost', ()=>{
    console.log("Listening for requests on port 3000");
});