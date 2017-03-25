'use es6';

import process from 'child_process'
// import mpris from "../data/mpris.js"
import SpotifyMpris from "../data/SpotifyMpris"
import PlayerDetails from '../data/PlayerDetails';
import PlayerState from '../data/PlayerState';
import TrackDetails from '../data/TrackDetails';

const mpris = new SpotifyMpris()

export default class SpotifyApplicationClientLinux {

  static isSpotifyRunning() {
    return mpris.isUp()
  }

  static activateApplication() {
    return new Promise((resolve, reject) => {
      //TODO: Check if spotify is already running
      process.exec("spotify")
      //Give spotify time to startup, connect to dbus, etc.
      setTimeout(() => resolve(), 1500)
    })
  }

  static getPlayerState() {
    return mpris.getProperty("org.mpris.MediaPlayer2.Player", "PlaybackStatus")
    .then((status) => {
      return PlayerState.valueOf(String(status).toLowerCase())
    }, () => {
      return undefined
    })
   }

  static playTrack(id) {
    return mpris.playTrack("spotify:track:" + id).then(() => {
      //Allow data to be refreshed
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 500)
      })
    })
  }

  static play() {
    return mpris.invoke("org.mpris.MediaPlayer2.Player", "Play").then(() => {
      //Allow data to be refreshed
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 500)
      })
    })
  }

  static pause() {
    return mpris.invoke("org.mpris.MediaPlayer2.Player", "Pause").then(() => {
      //Allow data to be refreshed
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 500)
      })
    })
  }

  static togglePlayPause() {
    return mpris.invoke("org.mpris.MediaPlayer2.Player", "PlayPause").then(() => {
      //Allow data to be refreshed
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 500)
      })
    })
  }

  static getTrackDetails() {
      return mpris.getProperty("org.mpris.MediaPlayer2.Player", "Metadata")
      .then((metadata) => {

        var titleId = "xesam:title"
        var albumId = "xesam:album"
        var artistId = "xesam:artist"
        var durationId = "mpris:length"

        var map = {}

        var i = 0

        while (metadata[0][i]) {
          switch (metadata[0][i][0]) {
            case titleId:
              map[titleId] = String(metadata[0][i][1][1])
              break;
            case albumId:
              map[albumId] = String(metadata[0][i][1][1])
              break
            case artistId:
              map[artistId] = String(metadata[0][i][1][1])
              break
            case durationId:
              map[durationId] = metadata[0][i][1][1]/1000
              break;
          }
          i++
        }
        return new TrackDetails({
          name: map[titleId],
          albumName: map[albumId],
          artistName: map[artistId],
          durationInMilliseconds: map[durationId]
        });
      })
  }

  static getPlayerDetails() {
    return Promise.all([SpotifyApplicationClientLinux.getPlayerState(),
                        SpotifyApplicationClientLinux.getPlayerPositionInSeconds(),
                        SpotifyApplicationClientLinux.isShuffling(),
                        SpotifyApplicationClientLinux.isRepeating(),
                        SpotifyApplicationClientLinux.isSpotifyRunning()
                      ]).then( ([playerState, playerPositionInSeconds, isShuffling, isRepeating, isSpotifyRunning]) => {
                        return new PlayerDetails({
                          state: playerState,
                          positionInSeconds: playerPositionInSeconds,
                          isShuffling: isShuffling,
                          isRepeating: isRepeating,
                          isSpotifyRunning: isSpotifyRunning
                        });
                      });
  }

  static getTrackName() {
    return this.getTrackDetails()
    .then((result) => {
      return result.name
    })
  }

  static getAlbumName() {
    return this.getTrackDetails()
    .then((result) => {
      return result.albumName
    })
  }

  static getArtistName() {
    return this.getTrackDetails()
    .then((result) => {
      return result.artistName
    })
  }

  static getTrackDurationInMilliseconds() {
    return this.getTrackDetails()
    .then((result) => {
      return result.durationInMilliseconds
    })
  }

  static playTrackFromAlbum(id) {
    return this.playTrack(id)
  }

  static getPlayerPositionInSeconds() {
    return this.getSimplePromise(undefined)
  }

  static isRepeating() {
    return this.getSimplePromise(undefined)
  }

  static isShuffling() {
    return this.getSimplePromise(undefined)
  }

  static turnOnRepeat() {
    return this.getSimplePromise(null)
  }

  static turnOffRepeat() {
    return this.getSimplePromise(null)
  }

  static toggleRepeat() {
    return this.getSimplePromise(null)
  }

  static turnOnShuffle() {
    return this.getSimplePromise(null)
  }

  static turnOffShuffle() {
    return this.getSimplePromise(null)
  }

  static toggleShuffle() {
    return this.getSimplePromise(null)
  }

  static getSimplePromise(ret) {
    return new Promise((resolve) => {
      resolve(ret)
    })
  }

}
