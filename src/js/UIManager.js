
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

    setEmptyHtml(html){
        //busca un descendiente de this.element, que tenga las clases CSS ui-status y empty  le asigna el HTML
        this.element.find(".ui-status.empty").html(html);
    }

    setLoadingHtml(html){
        //busca un descendiente de this.element, que tenga las clases CSS ui-status y empty  le asigna el HTML
        this.element.find(".ui-status.loading").html(html);
    }

    setErrorHtml(html){
        //busca un descendiente de this.element, que tenga las clases CSS ui-status y empty  le asigna el HTML
        this.element.find(".ui-status.error").html(html);
    }

    setPartialHtml(html){
        //busca un descendiente de this.element, que tenga las clases CSS ui-status y empty  le asigna el HTML
        this.element.find(".ui-status.partial").html(html);
    }

    setIdealHtml(html){
        //busca un descendiente de this.element, que tenga las clases CSS ui-status y empty  le asigna el HTML
        this.element.find(".ui-status.ideal").html(html);
    }
}