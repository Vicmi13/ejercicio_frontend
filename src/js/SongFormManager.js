/*
Que necesita hacer??
Hacer peticion AJAX para guardar la cancion en el backend -> Song service
UIManager para gestionar los estados de la interfaz
Acceso al formulario para poder leer los valores de los input
*/

const $ =require("jquery");

import UIManager  from './UIManager';
export default class SongFormManager extends UIManager{
    constructor(elementSelector, songService ){
            super(elementSelector);//llamada al constructor de la clase UIManager
            this.songService = songService;
            
    }

    init(){
        this.setupSubmitEventHandler();    
    }  

    setupSubmitEventHandler(){
        console.log('entrando a validateAndSendData');
        this.element.on("sumbit", this.validateAndSendData);
         
    }

    validateAndSendData(){
        if(this.isValid()){
            this.send();
        }
        console.log('Enviando formulario');
        /*en jquery podemos hacer un preventDefault haciendo un return
        //false en los manejadores de eventos */
        return false; 
    }

    isValid(){
        const inputs = this.element.find('input');
        for (input of intputs){
            if(input.checkValidity() === false ){
                   const errorMessage = input.validationMessage;
                   this.setErrorHtml(errorMessage);
                   this.setError();
                   return false; 
            }
        }
        //Llegamos aqui si no hay ningun error
        this.setIdeal();
        return true;
    }

    send(){

    }
}