'use es6';

import CommandExecutor from './CommandExecutor';

import PlayerState from '../data/PlayerState';
import PlayerDetails from '../data/PlayerDetails';
import TrackDetails from '../data/TrackDetails';

import {IS_SPOTIFY_RUNNING, ACTIVATE_APPLICATION, GET_TRACK_NAME, PLAY_TRACK,
        GET_ALBUM_NAME, GET_ARTIST_NAME, GET_TRACK_DURATION_IN_MILLISECONDS,
        GET_PLAYER_STATE, GET_PLAYER_POSITION_IN_SECONDS, IS_REPEATING,
        IS_SHUFFLING, TURN_OFF_REPEAT, TURN_ON_REPEAT, TURN_OFF_SHUFFLE,
        TURN_ON_SHUFFLE, TOGGLE_PLAY_PAUSE, PLAY, PAUSE, PLAY_NEXT_TRACK,
        PLAY_PREVIOUS_TRACK, PLAY_TRACK_FROM_ALBUM } from '../data/SpotifyCommands';

export default class SpotifyApplicationClient {
  static isSpotifyRunning() {
    return CommandExecutor.execute(IS_SPOTIFY_RUNNING);
  }

  static activateApplication() {
    return CommandExecutor.execute(ACTIVATE_APPLICATION);
  }

  static getTrackName() {
    return CommandExecutor.execute(GET_TRACK_NAME);
  }

  static getAlbumName() {
    return CommandExecutor.execute(GET_ALBUM_NAME);
  }

  static getArtistName() {
    return CommandExecutor.execute(GET_ARTIST_NAME);
  }

  static getTrackDurationInMilliseconds() {
    return CommandExecutor.execute(GET_TRACK_DURATION_IN_MILLISECONDS);
  }

  static getTrackDetails() {
    return Promise.all([SpotifyApplicationClient.getTrackName(),
                        SpotifyApplicationClient.getAlbumName(),
                        SpotifyApplicationClient.getArtistName(),
                        SpotifyApplicationClient.getTrackDurationInMilliseconds()
                      ]).then((trackName, albumName, artistName, trackDurationInMilliseconds) => {
                        new TrackDetails({
                          name: trackName,
                          albumName: albumName,
                          artistName: artistName,
                          trackDurationInMilliseconds: trackDurationInMilliseconds
                        });
                      });
  }

  static getPlayerState() {
    return CommandExecutor.execute(GET_PLAYER_STATE)
                          .then(stateValue => PlayerState.valueOf(stateValue));
  }

  static getPlayerPositionInSeconds() {
    return CommandExecutor.execute(GET_PLAYER_POSITION_IN_SECONDS);
  }

  static turnOffRepeat() {
    return CommandExecutor.execute(TURN_OFF_REPEAT);
  }

  static turnOnRepeat() {
    return CommandExecutor.execute(TURN_ON_REPEAT);
  }

  static isRepeating() {
    return CommandExecutor.execute(IS_REPEATING);
  }

  static toggleRepeat() {
    return SpotifyApplicationClient.isRepeating()
                                   .then(isRepeating => {
                                     if (isRepeating) {
                                       return SpotifyApplicationClient.turnOffRepeat();
                                     }

                                     return SpotifyApplicationClient.turnOnRepeat();
                                   });
  }

  static turnOffShuffle() {
    return CommandExecutor.execute(TURN_OFF_SHUFFLE);
  }

  static turnOnShuffle() {
    return CommandExecutor.execute(TURN_ON_SHUFFLE);
  }

  static isShuffling() {
    return CommandExecutor.execute(IS_SHUFFLING);
  }

  static getPlayerDetails() {
    return Promise.all([SpotifyApplicationClient.getPlayerState(),
                        SpotifyApplicationClient.getPlayerPositionInSeconds(),
                        SpotifyApplicationClient.isShuffling(),
                        SpotifyApplicationClient.isRepeating(),
                        SpotifyApplicationClient.isSpotifyRunning()
                      ]).then((playerState, playerPositionInSeconds, isShuffling, isRepeating, isSpotifyRunning) => {
                        return new PlayerDetails({
                          state: playerState,
                          positionInSeconds: playerPositionInSeconds,
                          isShuffling: isShuffling,
                          isRepeating: isRepeating,
                          isSpotifyRunning: isSpotifyRunning
                        });
                      });
  }

  static toggleShuffle() {
    return SpotifyApplicationClient.isShuffling()
                                   .then(isShuffling => {
                                     if (isShuffling) {
                                       return SpotifyApplicationClient.turnOffShuffle();
                                     }
                                     return SpotifyApplicationClient.turnOnShuffle();
                                   });
  }

  static togglePlayPause() {
    return CommandExecutor.execute(TOGGLE_PLAY_PAUSE);
  }

  static playTrack(trackId) {
    return CommandExecutor.execute(PLAY_TRACK(trackId));
  }

  static playTrackFromAlbum(trackId, albumId) {
    return CommandExecutor.execute(PLAY_TRACK_FROM_ALBUM(trackId, albumId));
  }

  static play() {
    return CommandExecutor.execute(PLAY);
  }

  static pause() {
    return CommandExecutor.execute(PAUSE);
  }

  static playNextTrack() {
    return CommandExecutor.execute(PLAY_NEXT_TRACK);
  }

  static playPreviousTrack() {
    return CommandExecutor.execute(PLAY_PREVIOUS_TRACK);
  }
}
