'use es6';

import CommandExecutor from './CommandExecutor';

import PlayerState from '../data/PlayerState';
import SpotifyCommands from '../data/SpotifyCommands';

export default class SpotifyApplicationClient {
  static isSpotifyRunning() {
    return CommandExecutor.execute(SpotifyCommands.IS_SPOTIFY_RUNNING);
  }

  static getSongName() {
    return CommandExecutor.execute(SpotifyCommands.GET_SONG_NAME);
  }

  static getAlbumName() {
    return CommandExecutor.execute(SpotifyCommands.GET_ALBUM_NAME);
  }

  static getArtistName() {
    return CommandExecutor.execute(SpotifyCommands.GET_ARTIST_NAME);
  }

  static getPlayerState() {
    return CommandExecutor.execute(SpotifyCommands.GET_PLAYER_STATE)
                          .then(stateValue => PlayerState.valueOf(stateValue));
  }

  static getPlayerPositionInSeconds() {
    return CommandExecutor.execute(SpotifyCommands.GET_PLAYER_POSITION_IN_SECONDS);
  }

  static getTrackDurationInSeconds() {
    return CommandExecutor.execute(SpotifyCommands.GET_TRACK_DURATION_IN_SECONDS);
  }

  static turnOffRepeat() {
    return CommandExecutor.execute(SpotifyCommands.TURN_OFF_REPEAT);
  }

  static turnOnRepeat() {
    return CommandExecutor.execute(SpotifyCommands.TURN_ON_REPEAT);
  }

  static isRepeating() {
    return CommandExecutor.execute(SpotifyCommands.IS_REPEATING);
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
    return CommandExecutor.execute(SpotifyCommands.TURN_OFF_SHUFFLE);
  }

  static turnOnShuffle() {
    return CommandExecutor.execute(SpotifyCommands.TURN_ON_SHUFFLE);
  }

  static isShuffling() {
    return CommandExecutor.execute(SpotifyCommands.IS_SHUFFLING);
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
    return CommandExecutor.execute(SpotifyCommands.TOGGLE_PLAY_PAUSE);
  }

  static play() {
    return CommandExecutor.execute(SpotifyCommands.PLAY);
  }

  static pause() {
    return CommandExecutor.execute(SpotifyCommands.PAUSE);
  }

  static goToNextTrack() {
    return CommandExecutor.execute(SpotifyCommands.GO_TO_NEXT_TRACK);
  }

  static goToPreviousTrack() {
    return CommandExecutor.execute(SpotifyCommands.GO_TO_PREVIOUS_TRACK);
  }
}
