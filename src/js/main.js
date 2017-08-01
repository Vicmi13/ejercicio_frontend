window.$ = window.jQuery = require("jquery");

import  SongService from "./SongService";
import SongsListManager from "./SongsListManager";
import SongFormManager from "./SongFormManager";
import PubSub from "pubsub-js"; 

const songService = new SongService("/songs/");

const songsListManager = new SongsListManager(".songs-list", songService, PubSub );
songsListManager.init();

const songFormManager = new SongFormManager(".song-form", songService, PubSub);
songFormManager.init();

// PubSub.subscribe('new-song', function(song){
//     console.log('Se ha creado una nueva canción');
// });