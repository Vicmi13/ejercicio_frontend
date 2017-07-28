
const $ = require('jquery');

export default class UIManager{

    //selector es el elemento de jquery con el que deseamos trabajar
    constructor(selector){
           //this._name Creo que creo y asiga al mismo tiempo
           this.uiStateClasses = "empty loading error partial ideal"; //Clases CSS que definen estados de componentes
           this.element = $(selector); //Seleccionamos el elemto de Jquery en el constructor 
    }

    setEmpty(){
        this.element.removeClass().addClass('empty');
    }

    setLoading(){
        this.element.removeClass().addClass('loading');
    }

    setError(){
        this.element.removeClass().addClass('error');
    }

    setPartial(){
        this.element.removeClass().addClass('partial');
    }

    setIdeal(){
        this.element.removeClass().addClass('ideal');    
    }
}