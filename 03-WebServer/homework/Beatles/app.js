var http = require('http');
var fs   = require('fs');
const { resolve } = require('path');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

//Crear server

http.createServer(function(req, res) {  // Request amd Response
  //Toma el req para la api
  if(req.url === '/api'){ // Si quiere ver todos los discos
     res.writeHead(200,'Content-Type', 'application/json');  //Indica que tomará un arreglo y lo convertira a JSON
     return res.end(JSON.stringify(beatles)); 
  }

  // El nombre de la URL a buscar tiene el %20 que se entiende como un espacio
  // Si se va a buscar a John Lennon, la cadena para la URL es John%20Lennon

  if(req.url.substring(0,5) === '/api/'){  // Si las primeras 5 posiciones de la URL es /api/
    const beatle = req.url.split('/').pop();   //Split regresa un arreglo con elementos separados por /, apii y el nombre del artista
    const found = beatles.find(b => encodeURI(b.name) === beatle)  // Al nombre le quita el %20 a la cadena
         // found almacena el valor encontrado

    if (found){
      res.writeHead(200, { 'Content-Type':'application/json' });
      return res.end(JSON.stringify(found));
    }

    res.writeHead(404,'Content-Type', 'text/plain');
    return res.end(`${decodeURI(beatle)} no es un Beatle.`);

  }

  //Para llamar al index.html

  if(req.url === '/'){
    fs.readFile('./index.html', 'utf8', function(err,data){
      if(err) {
        res.writeHead(404,'Content-Type', 'text/plain');
        return res.end(`No existe.`);   
      }
      res.writeHead(200, { 'Content-Type':'text/html' });
      return res.end(data);
    })
  }

//Para llamar a beatle.html

if (req.url.length > 1) {
  const beatle = req.url.split('/').pop();   //Split regresa un arreglo con elementos separados por /, apii y el nombre del artista
    const found = beatles.find(b => encodeURI(b.name) === beatle)  // Al nombre le quita el %20 a la cadena
         // found almacena el valor encontrado
  // const beatle = req.url.split('/').pop();   //Split regresa un arreglo con elementos separados por /, apii y el nombre del artista
  //   const found = beatles.find(b => encodeURI(b.name) === beatle)  // Al nombre le quita el %20 a la cadena
  //        // found almacena el valor encontrado

  //   if (found){
  //     res.writeHead(200, { 'Content-Type':'application/json' });
  //     return res.end(JSON.stringify(found));
  //   }

  //   res.writeHead(404,'Content-Type', 'text/plain');
  //   return res.end(`${decodeURI(beatle)} no es un Beatle.`);
  if (found){
    
    fs.readFile('./beatle.html', 'utf8', function(err,data){
    if(err) {
      res.writeHead(404,'Content-Type', 'text/plain');
      return res.end(`No existe.`);   
    }
    //remplaza
    data = data.replace('{name}', found.name) 
    data = data.replace('{birthdate}', found.birthdate)
    data= data.replace('{profilePic}', found.profilePic) 
    res.writeHead(200, { 'Content-Type':'text/html' });
    return res.end(data); 
  })
  } else {
    res.writeHead(404,'Content-Type', 'text/plain');
    return res.end(`No existe.`);
    
 }
}

}).listen(3000,'127.0.0.1');    // listen (escucha) en el port 3000