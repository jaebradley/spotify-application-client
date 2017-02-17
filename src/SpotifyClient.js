'use es6';

import osascript from 'node-osascript';

import SpotifyCommands from '../data/SpotifyCommands';
import PlayerState from '../data/PlayerState';

export default class SpotifyClient {
  static isSpotifyRunning() {
    return SpotifyClient.executeCommand(SpotifyCommands.IS_SPOTIFY_RUNNING);
  }

  static getSongName() {
    return SpotifyClient.executeCommand(SpotifyCommands.GET_SONG_NAME);
  }

  static getAlbumName() {
    return SpotifyClient.executeCommand(SpotifyCommands.GET_ALBUM_NAME);
  }

  static getArtistName() {
    return SpotifyClient.executeCommand(SpotifyCommands.GET_ARTIST_NAME);
  }

  static getPlayerState() {
    return SpotifyClient.executeCommand(SpotifyCommands.GET_PLAYER_STATE)
                        .then(stateValue => PlayerState.valueOf(stateValue));
  }

  static getPlayerPositionInSeconds() {
    return SpotifyClient.executeCommand(SpotifyCommands.GET_PLAYER_POSITION_IN_SECONDS);
  }

  static getSongDurationInSeconds() {
    return SpotifyClient.executeCommand(SpotifyCommands.GET_SONG_DURATION_IN_SECONDS);
  }

  static turnOffRepeat() {
    return SpotifyClient.executeCommand(SpotifyCommands.TURN_OFF_REPEAT);
  }

  static turnOnRepeat() {
    return SpotifyClient.executeCommand(SpotifyCommands.TURN_ON_REPEAT);
  }

  static isRepeating() {
    return SpotifyClient.executeCommand(SpotifyCommands.IS_REPEATING);
  }

  static toggleRepeat() {
    return SpotifyClient.isRepeating()
                        .then(isRepeating => {
                          if (isRepeating) {
                            return SpotifyClient.turnOffRepeat();
                          }

                          return SpotifyClient.turnOnRepeat();
                        });
  }

  static turnOffShuffle() {
    return SpotifyClient.executeCommand(SpotifyCommands.TURN_OFF_SHUFFLE);
  }

  static turnOnShuffle() {
    return SpotifyClient.executeCommand(SpotifyCommands.TURN_ON_SHUFFLE);
  }

  static isShuffling() {
    return SpotifyClient.executeCommand(SpotifyCommands.IS_SHUFFLING);
  }

  static toggleShuffle() {
    return SpotifyClient.isShuffling()
                        .then(isShuffling => {
                          if (isShuffling) {
                            return SpotifyClient.turnOffShuffle();
                          } else {
                            return SpotifyClient.turnOnShuffle();
                          }
                        });
  }

  static togglePlayPause() {
    return SpotifyClient.executeCommand(SpotifyCommands.TOGGLE_PLAY_PAUSE);
  }

  static goToNextTrack() {
    return SpotifyClient.executeCommand(SpotifyCommands.GO_TO_NEXT_TRACK);
  }

  static goToPreviousTrack() {
    return SpotifyClient.executeCommand(SpotifyCommands.GO_TO_PREVIOUS_TRACK);
  }

  static executeCommand(command) {
    return new Promise((resolve, reject) => {
      osascript.execute(command.value, function(err, result, raw) {
        if (!err) {
          resolve(result);
        } else {
          reject({ reason: `Unable to execute command: ${command}` });
        }
      });
    });
  }
}
