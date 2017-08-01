
//import PubSub from "pubsub-js";
import UIManager  from './UIManager';

export default class SongsListManager extends UIManager {

    constructor(elementSelector, songService, pubSub){
         super(elementSelector);//llamada al constructor de la clase UIManager
        this.songService = songService; 
        this.pubSub = pubSub;
    }

    init(){
        this.loadSongs();
        let self = this;
        //.song Cuando se haga click y aparte en el target .song con el bubbling se captura en una  cancion en especifico
        this.element.on('click', '.song', function(){
            let songId = this.dataset.id;
            self = deleteSong(songId);
            console.log('eliminar canción', this);
        })
        /*
        function(topic, song){
            this.loadSongs(); Hace scope solo dentro de esta funcion
            }
        */
        this.pubSub.subscribe('new-song', (topic,song) =>{
            console.log('Se hizo subscribe');
            this.loadSongs();        
        });
    }
    
    //Metodo que carga las canciones
    loadSongs(){
        // Con el this. se accede al objeto que me han inyectado. El del constructor
        this.songService.list(songs =>{
        // Comprobamos si hay canciones
             if (songs.length == 0) {
                 // Mostramos el estado vacío
                //$(".song-list").removeClass("loading").addClass("empty");

                //Antes ->Usando la const de UIManager Ahora ->se hace ref al objeto del constructor
                this.setEmpty();
            } else {
            this.renderSongs(songs);         
            // Quitamos el mensaje de cargando y mostramos la lista de canciones
            this.setIdeal();
            }
        }, error => {
            // Mostrar el estado de error
             this.setError();

            // Hacemos log del error en la consola
            console.error("Error al cargar las canciones", error);
         });

    }


    renderSongs(songs){
            // Componemos el HTML con todas las canciones
                let html = "";
                for (let song of songs) {
                    html += this.renderSong(song);
                }
            // Metemos el HTML en el div que contiene las canciones
            this.setIdealHtml(html);
            //Al factorizar esto, ya no es necesario Jquery aquí. Se elimina variable declarada en el top ->const $ = require ('jquery');
    }


    renderSong (song){
        let cover_url = song.cover_url;
        let srcset= '';

        if(cover_url == ''){
            cover_url = 'img/disk-150px.png';
            srcset = ' srcset="img/disk-150px.png 150w, img/disk-250px.png 250w, img/disk-300px.png 300w"';
        }

        return `<article class="song" data-id="${song.id}">
                    <img src="${cover_url}" alt="${song.artist} - ${song.title}" class="cover" ${srcset}>
                        <div class="artist">${song.artist}</div>
                        <div class="title">${song.title}</div>
                    </article>`;
    }




    deleteSong(songId){
        this.setLoading();
        this.songService.delete(songId, success => {
            this.loadSongs();
        }, error => {
            this.setError();
        })
    }
}