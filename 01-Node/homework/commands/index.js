
const fs = require('fs');
const request = require('request');
module.exports = {
    pwd: function(args, done){done(process.cwd())},
    date: function(args, done){done(Date())}, 
    ls: function(args, done){
        
                fs.readdir('.', function(err, files) {
                    if (err) throw err;
                    var out = '';
                    files.forEach(function(file) {
                    //done(file.toString());
                    out = out + file +'\n'
                    })
                    //process.stdout.write("prompt > ");
                    done(out);
                });
    },
    echo: function(mensaje,done) {
        done(mensaje.join(" "));
    },

    cat: function(file, done){
              fs.readFile(file[0], 'utf8', function(err,data){
                if(err) throw err;
                done(data)
                //process.stdout.write('\n prompt > ')
              })
    },

    head: function(file,done){
        fs.readFile(file[0], 'utf8', function(err,data){
          if(err) throw err;
          const lines = data.split('\n').slice(0,9).join('\n');  //Se le quitan al archivo los saltos de linea y los junta las
                                                                 // primeras 10 líneas
          done(lines)                                                       
          //process.stdout.write('\n prompt > ')
        })
     },
    

     tail: function(file, done){
        fs.readFile(file[0], 'utf8', function(err,data){
          if(err) throw err;
          const lines = data.split('\n').slice(-10).join('\n');  //Se le quitan al archivo los saltos de linea y los junta las
                                                                 // primeras 10 líneas
          done(lines)                                                       
          //process.stdout.write('\n prompt > ')
        })
     },

     curl: function(url,done){
        request(url[0], function(err, response, body){
            if(err) throw err;
            done(body)                                                       
            //process.stdout.write('\n prompt > ')
        })
     },

     //Manejo del fs
     cf: function(archivo, done) { //args es el nombre de archivo
        fs.writeFile('./'+archivo, 'línea 1\nLínea 2', err => {
            if(err) throw err;
            process.stdout.write("archivo creado. \n");
            process.stdout.write('\n prompt > ');  
          })
     }
}

