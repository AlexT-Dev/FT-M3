// // Output un prompt
// process.stdout.write('prompt > ');
// // El evento stdin 'data' se dispara cuando el user escribe una línea
// process.stdin.on('data', function (data) {
//   var cmd = data.toString().trim(); // remueve la nueva línea
//   process.stdout.write('You typed: ' + cmd);
//   process.stdout.write('\nprompt > ');
// });

const { pwd } = require('./commands');
const commands = require('./commands');
const cmd = 'pwd';

//commands[cmd](args, done) // la función dentro de la propiedad pwd

//dunció para eliminar el código repetido de las funciones

const done = function (output){ //output es lo que va a imprimir al final de cada comando
  process.stdout.write(output);
  process.stdout.write('\nPrompt > ')

}

// Output un prompt
process.stdout.write('\n prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var args = data.toString().trim().split(' '); //Quita el primer valo de la cadena Ejemplo: echo hola --> echo
  var cmd =  args.shift();   //data.toString().trim(); // remueve la nueva línea
  
  if(commands.hasOwnProperty(cmd)) {
    commands[cmd](args,done);
    //process.stdout.write(Date());  
  } else {
    process.stdout.write('Comando invalido.');
    process.stdout.write('\nprompt > ');
  }
  // if(cmd === 'pwd') {
  //   //process.stdout.write(process.cwd());
  // }
  //process.stdout.write('\nprompt > ');
});