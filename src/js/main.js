window.$ = window.jQuery = require("jquery");

import  SongService from "./SongService";
import UIManager from "./UIManager";
import SongsListManager from "./SongsListManager";
import SongFormManager from "./SongFormManager";

const songService = new SongService("/songs/");
const songListUIManager = new UIManager(".song-list");

const songsListManager = new SongsListManager(songService, songListUIManager);
songsListManager.init();

const songFormManager = new SongFormManager(".song-form", songService);
songFormManager.init();