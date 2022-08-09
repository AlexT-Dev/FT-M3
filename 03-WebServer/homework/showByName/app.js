var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
//Crear server

http.createServer(function(req, res) {  // Request amd Response
    //Toma el req que requiere el usuario
    fs.readFile(`./images${req.url}.jpg`, function(err, data) {
         if (err){ //Si hay algún error
            res.writeHead(404,{'Content-Type': 'text/plain'})
            res.end('img not found');   
         } else {
            res.writeHead(200,{'Content-Type': 'image/jpeg'})
            res.end(data); // Si encuentra la imagen, viene en el data
         }

    })
}).listen(3000,'127.0.0.1');    // listen (escucha) en el port 3000