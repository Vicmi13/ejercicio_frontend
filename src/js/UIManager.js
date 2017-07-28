
const $ = require('jquery');

export default class UIManager{

    //selector es el elemento de jquery con el que deseamos trabajar
    constructor(selector){
           //this._name Creo que creo y asiga al mismo tiempo
           this.uiStateClasses = "empty loading error partial ideal"; //Clases CSS que definen estados de componentes
           this.element = $(selector); //Seleccionamos el elemto de Jquery en el constructor 
    }
    
    setEmpty(){
        this.element.removeClass(this.uiStateClasses ).addClass('empty');
    }

    setLoading(){
        this.element.removeClass(this.uiStateClasses ).addClass('loading');
    }

    setError(){
        this.element.removeClass(this.uiStateClasses ).addClass('error');
    }

    setPartial(){
        this.element.removeClass(this.uiStateClasses ).addClass('partial');
    }

    setIdeal(){
        this.element.removeClass(this.uiStateClasses ).addClass('ideal');    
    }
}