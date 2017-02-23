'use es6';

// From Spotify.sdef file
export const GET_TRACK_NAME  = 'tell application "Spotify" to name of current track';
export const GET_ALBUM_NAME = 'tell application "Spotify" to album of current track';
export const GET_ALBUM_ARTWORK_URL = 'tell application "Spotify" to artwork url of current track';
export const GET_ARTIST_NAME = 'tell application "Spotify" to artist of current track';
export const GET_PLAYER_STATE = 'tell application "Spotify" to player state';
export const GET_PLAYER_POSITION_IN_SECONDS = 'tell application "Spotify" to player position';
export const GET_TRACK_DURATION_IN_MILLISECONDS = 'tell application "Spotify" to duration of current track';
export const TURN_OFF_REPEAT = 'tell application "Spotify" to set repeating to false';
export const TURN_ON_REPEAT = 'tell application "Spotify" to set repeating to true';
export const TURN_OFF_SHUFFLE = 'tell application "Spotify" to set shuffling to false';
export const TURN_ON_SHUFFLE = 'tell application "Spotify" to set shuffling to true';
export const IS_SHUFFLING = 'tell application "Spotify" to shuffling';
export const IS_REPEATING = 'tell application "Spotify" to repeating';
export const IS_SPOTIFY_RUNNING = 'application "Spotify" is running';
export const ACTIVATE_APPLICATION = 'tell application "Spotify" to activate';
export const PLAY_NEXT_TRACK = 'tell application "Spotify" to next track';
export const PLAY_PREVIOUS_TRACK = 'tell application "Spotify" to previous track';
export const TOGGLE_PLAY_PAUSE = 'tell application "Spotify" to playpause';
export const PLAY = 'tell application "Spotify" to play';
export const PAUSE = 'tell application "Spotify" to pause';
export const PLAY_TRACK = function(trackId) {
  return `tell application "Spotify" to play track "spotify:track:${trackId}"`
};
export const PLAY_TRACK_FROM_ALBUM = function(trackId, albumId) {
  return `${PLAY_TRACK(trackId)} in context "spotify:album:${albumId}"`;
}
