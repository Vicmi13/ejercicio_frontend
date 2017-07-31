/*
Que necesita hacer??
Hacer peticion AJAX para guardar la cancion en el backend -> Song service
UIManager para gestionar los estados de la interfaz
Acceso al formulario para poder leer los valores de los input
*/

const $ =require("jquery");

import UIManager  from './UIManager';
//import PubSub from 'pubsub-js'; Se borra porque se declara en el constructor. Se inyecta

export default class SongFormManager extends UIManager{
    constructor(elementSelector, songService, pubSub ){
            super(elementSelector);//llamada al constructor de la clase UIManager
            this.songService = songService;
            this.pubSub = pubSub;
            
    }

    init(){
        this.setupSubmitEventHandler();    
    }  

    setupSubmitEventHandler(){
        /* -> this.validateAndSendData Hace referencia al form  y no al objeto
        por un poblema de scope 
        this.element.on("submit", this.validateAndSendData);  
        Con arrow function se arregla esto, hace referencia al objeto this del 
        mismo contexto SongFormatManager*/
        console.log('Antes de mandar a validate' , this);
        this.element.on("submit", ()=>{
            this.validateAndSendData();
             /*en jquery podemos hacer un preventDefault haciendo un return
             false en los manejadores de eventos */
             return false;   // == event.preventDefault();    
       });
       
         
    }

    validateAndSendData(){
        if(this.isValid()){
            this.send();
        }  
    }

    isValid(){
        const inputs = this.element.find('input');
        // let input of inputs =>  es de EcmaScript6
        for (let input of inputs){
            if(input.checkValidity() === false ){
                   const errorMessage = input.validationMessage;
                   input.focus();
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
        this.setLoading();
        const song={
            artist: this.element.find('#artist').val(),
            title:  this.element.find('#title').val(),
            cover_url: this.element.find('#cover_url').val()
        };
        this.songService.save(song, success =>{
              //TODO recgargar el listado de canciones
              //Se va a emitir un evento con Pubsub
              
              this.pubSub.publish('new-song', song);  //publicamos el evento q informa de la creacion de una cancion

              this.resetForm();
              this.setIdeal();  
        } , error =>{
            this.setErrorHtml('Se ha producido un error al guardar la canción en el servidor');
            this.setError();
        });
    }


    resetForm(){
        this.element[0].reset();
    }

    disableFormControls(){
        this.element.find("input, button").attr('disabled', true);
    }

    enableFormControls(){
        this.element.find("input, button").attr('disabled', false);
    }

    /*
    Se redefinen métodos, heredan el comportamiento del padre (gestionan sus comportamiento)
    y los habilitos o deshabilitas
    */    
    setLoading(){
        super.setLoading();
        this.disableFormControls();
    }

    setError(){
        super.setError();
        this.enableFormControls();
    }

    setIdeal(){
        super.setIdeal();
        this.enableFormControls();
    }
}