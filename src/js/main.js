window.$ =  window.jQuery = require ("jquery");

//Cargar la lista de canciones con Ajax

$.ajax({
    url: "/songs/",
    success: songs => {
           let html = "";
           //Se recorre cada objeto de la lista 'songs'
           for (song of songs){
                html += `<article class="song">
                        <img src="${song.cover_url}" 
                        alt="${song.artist} - ${song.tittle}">
                        <div class="artist">
                           ${song.tittle}
                        </div>
                        <div class="tittle">
                           ${song.tittle}
                        </div>
                 </article>   `;
           }
           //metemos el HTML en el div  que contiene las canciones     
           $(".song-list .ui-status ideal").html(html);      
    },
    error: error => {
         console.error("ERROR", error);
    }
})