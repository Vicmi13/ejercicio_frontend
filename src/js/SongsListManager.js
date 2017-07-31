
export default class SongsListManager {

    constructor(songService, uiManager){
        this.songService = songService; 
        this.uiManager = uiManager;
    }

    init(){
        this.loadSongs();
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
                this.uiManager.setEmpty();
            } else {
            this.renderSongs(songs);         
            // Quitamos el mensaje de cargando y mostramos la lista de canciones
            this.uiManager.setIdeal();
            }
        }, error => {
            // Mostrar el estado de error
             this.uiManager.setError();

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
            this.uiManager.setIdealHtml(html);
            //Al factorizar esto, ya no es necesario Jquery aquí. Se elimina variable declarada en el top ->const $ = require ('jquery');
    }


    renderSong (song){
        return `<article class="song">
                    <img src="${song.cover_url}" alt="${song.artist} - ${song.title}" class="cover">
                        <div class="artist">${song.artist}</div>
                        <div class="title">${song.title}</div>
                    </article>`;
    }
}