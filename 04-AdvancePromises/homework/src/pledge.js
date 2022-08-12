'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor){  //es una función y puede ser llamado con una argumento de función (el "executor"), devolviendo una nueva instancia de promesa
    if (typeof executor !== 'function'){
        throw new TypeError('Executor must be a function');  //arroja un error descriptivo si es llamado sin función como argumento
    }

    this._state = 'pending'   //comienza con un estado interno "pending"
    this._handlerGroups = [];
    executor(this._internalResolve.bind(this),this._internalReject.bind(this)); //es llamada cuando hacemos una nueva $Promise

}

$Promise.prototype._internalResolve = function(data){  //tiene un método de instancia `._internalResolve`
    if (this._state === 'pending') {  //cambia el estado de la promesa a "fulfilled"
     this._state = 'fulfilled'
     this._value = data
     this._callHandlers(); // Para resolver el success handler

    }
}
$Promise.prototype._internalReject = function(reason){ //tiene un método de instancia `._internalReject`
    if (this._state === 'pending') {  //cambia el estado de la promesa a "rejected"
        this._state = 'rejected'
        this._value = reason
        this._callHandlers(); // Para resolver el error handler
    }
}


$Promise.prototype._callHandlers = function(){
    while (this._handlerGroups.length){
        var handler = this._handlerGroups.shift();
        if (this._state === 'fulfilled'){
          handler.successCb && handler.successCb(this._value);
        } else {
          handler.errorCb && handler.errorCb(this._value)
        }
    }
}
// successCb en caso de éxito y errorCb en caso de error

$Promise.prototype.then= function(successCb, errorCb){
    if(typeof successCb !== "function") successCb = false  //agrega un valor falso en lugar de callbacks que no son funciones en el success o error
    if(typeof errorCb !== "function") errorCb = false
    this._handlerGroups.push({  //agrega grupos de handlers (funciones callbacks) a la promesa
        successCb,
        errorCb
    })
    if (this._state !== 'pending'){
        this._callHandlers();
    }
}

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
