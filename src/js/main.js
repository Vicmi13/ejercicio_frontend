window.$ = window.jQuery = require("jquery");

// Cargar la lista de canciones con AJAX
$.ajax({
    url: "/songs/",
    success: songs => {
        // Comprobamos si hay canciones
        if (songs.length == 0) {
            // Mostramos el estado vacío
            $(".songs-list").removeClass("loading").addClass("empty");
        } else {
            // Componemos el HTML con todas las canciones
            let html = "";
            for (let song of songs) {
                html += `<article class="song">
                    <img src="${song.cover_url}" alt="${song.artist} - ${song.title}" class="cover">
                    <div class="artist">${song.artist}</div>
                    <div class="title">${song.title}</div>
                </article>`;
            }

            // Metemos el HTML en el div que contiene las canciones
            $(".song-list .ui-status.ideal").html(html);

            // Quitamos el mensaje de cargando y mostramos la lista de canciones
            $(".song-list").removeClass("loading").addClass("ideal");
        }
    },
    error: error => {
        // Mostrar el estado de error
        $(".songs-list").removeClass("loading").addClass("error");

        // Hacemos log del error en la consola
        console.error("Error al cargar las canciones", error);
    }
});