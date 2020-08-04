const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname  = "localhost";
const port = 8000;


const server = http.createServer((req,res) => {
    console.log("Request for "+req.url+" by method "+req.method);

    if(req.method == 'GET'){
        var fileURl;
        
        if(req.url == '/'){
            fileUrl = '/index.html';
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(path.resolve('./public/index.html')).pipe(res);
            return;
        }
        else fileURl = req.url;
        
        var filePath = path.resolve('./public/'+fileURl);
        const fileExt = path.extname(filePath);

        if(fileExt == '.html'){
            fs.exists(filePath, (exists) => {
                if(!exists){
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end("<html><body><h1>404 Not Found! test</h1></body></html>");
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
                return;
            });
        }else{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end("<html><body><h1>Not an HTML File test</h1></body></html>");
            return;
        }

        
    }else{
        console.log("Request Type - "+req.method);
    }
    // end of GET
    // console.log("A Request was sent");
});

server.listen(port, hostname, ()=>{

    console.log(`Server Running at http://${hostname}:${port}`);

});