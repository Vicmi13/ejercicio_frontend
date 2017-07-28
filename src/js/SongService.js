//Esta línea simplemente es para que el código sea mas legible
//y sepas que se refieres la variable $
const $ = require('jquery');

//Va a abstraer el acceso a trabajar con la API REST
export default class SongService{

    constructor(url){
        this.url = url;
    }

    //Obtener un listados de canciones
    list(successCallback, errorCallback){
        $.ajax({
            url: `${this.url}`,
            success: successCallback,
            error: errorCallback
        });
    }

    //Crear o actualizar canción
    save(song, successCallback, errorCallback){
        //Esta diciendo si song.id existe hacer la condición o no
         if(song.id){
             this.update(song, successCallback, errorCallback);
         }else{
            this.create(song, successCallback, errorCallback);
         }     
    }

    //Crear una cancion
    create(song, successCallback, errorCallback){
        $.ajax({
            url: `${this.url}`,
            method: 'post',
            data: song,
            success: successCallback,
            error: errorCallback
        });
    }

    //Obtener el detalle de una canción
    getDetail(songId, successCallback, errorCallback){
         $.ajax({
            url: `${this.url}${songId}`,
            success: successCallback,
            error: errorCallback
        });
    }

    //Actualizar una canción
    update(song, successCallback, errorCallback){
        $.ajax({
            url: `${this.url}${song.id}`,
            method: 'put',
            data: song,
            success: successCallback,
            error: errorCallback
        });
    }

    //Borrar una canción
    delete(songId, successCallback, errorCallback){
        $.ajax({
            url: `${this.url}${songId}`,
            method: 'delete',  //Se define method porque es el metodo HTTP a utilizar
            success: successCallback,
            error: errorCallback
        });
    }
}