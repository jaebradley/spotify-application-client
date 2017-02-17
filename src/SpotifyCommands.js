'use es6';

export const GET_SONG  = 'tell application "Spotify" to name of current track';
export const GET_ALBUM = 'tell application "Spotify" to album of current track';
export const GET_ALBUM_ARTWORK_URL = 'tell application "Spotify" to artwork url of current track';
export const GET_ARTIST = 'tell application "Spotify" to artist of current track';
export const GET_PLAYER_STATE = 'tell application "Spotify" to player state';
export const GET_PLAYER_POSITION = 'tell application "Spotify" to player position';
export const GET_SONG_DURATION = 'tell application "Spotify" to duration of current track';
export const TURN_OFF_REPEAT = 'tell application "Spotify" to set repeating to false';
export const TURN_ON_REPEAT = 'tell application "Spotify" to set repeating to true';
export const TURN_OFF_SHUFFLE = 'tell application "Spotify" to set shuffling to false';
export const TURN_ON_SHUFFLE = 'tell application "Spotify" to set shuffling to true';
export const IS_SHUFFLING = 'tell application "Spotify" to shuffling';
export const IS_REPEATING = 'tell application "Spotify" to repeating';
export const IS_SPOTIFY_RUNNING = 'application "Spotify" is running';
export const GO_TO_NEXT_TRACK = 'tell application "Spotify" to next track';
export const GO_TO_PREVIOUS_TRACK = 'tell application "Spotify" to previous track';
export const TOGGLE_PLAY_PAUSE = 'tell application "Spotify" to playpause';
