[![Build Status](https://travis-ci.org/jaebradley/spotify-application-client.svg?branch=master)](https://travis-ci.org/jaebradley/spotify-application-client)
[![npm version](https://badge.fury.io/js/spotify-application-client.svg)](https://badge.fury.io/js/spotify-application-client)

# Spotify Application Client for MacOS
Node Client for the Spotify App on Mac OS

## Overview
Spotify built an [AppleScript API](https://developer.spotify.com/applescript-api/) that enables programmatic control of the player (on Mac OS).

This client sits on top of this AppleScript API to provide a simple abstraction layer.

### Install
`npm install spotify-application-client`

### API
* [`isSpotifyRunning`](https://github.com/jaebradley/spotify-application-client#isspotifyrunning)
* [`getTrackId`](https://github.com/jaebradley/spotify-application-client#gettrackid)
* [`getTrackName`](https://github.com/jaebradley/spotify-application-client#gettrackname)
* [`getAlbumName`](https://github.com/jaebradley/spotify-application-client#getalbumname)
* [`getArtistName`](https://github.com/jaebradley/spotify-application-client#getartistname)
* [`getPlayerState`](https://github.com/jaebradley/spotify-application-client#getplayerstate)
* [`getPlayerPositionInSeconds`](https://github.com/jaebradley/spotify-application-client#getplayerpositioninseconds)
* [`getTrackDurationInMilliseconds`](https://github.com/jaebradley/spotify-application-client#gettrackdurationinmilliseconds)
* [`turnOffRepeat`](https://github.com/jaebradley/spotify-application-client#turnoffrepeat)
* [`turnOnRepeat`](https://github.com/jaebradley/spotify-application-client#turnonrepeat)
* [`isRepeating`](https://github.com/jaebradley/spotify-application-client#isrepeating)
* [`toggleRepeat`](https://github.com/jaebradley/spotify-application-client#togglerepeat)
* [`turnOnShuffle`](https://github.com/jaebradley/spotify-application-client#turnonshuffle)
* [`isShuffling`](https://github.com/jaebradley/spotify-application-client#isshuffling)
* [`toggleShuffle`](https://github.com/jaebradley/spotify-application-client#toggleshuffle)
* [`togglePlayPause`](https://github.com/jaebradley/spotify-application-client#toggleplaypause)
* [`play`](https://github.com/jaebradley/spotify-application-client#play)
* [`pause`](https://github.com/jaebradley/spotify-application-client#pause)
* [`playNextTrack`](https://github.com/jaebradley/spotify-application-client#playnexttrack)
* [`playPreviousTrack`](https://github.com/jaebradley/spotify-application-client#playprevioustrack)
* [`playTrack(trackId)`](https://github.com/jaebradley/spotify-application-client#playtrackfromalbumtrackid)
* [`playTrackFromAlbum(trackId, albumId)`](https://github.com/jaebradley/spotify-application-client#playtrackfromalbumtrackid-albumid)
* [`getTrackDetails`](https://github.com/jaebradley/spotify-application-client#gettrackdetails)
* [`getPlayerDetails`](https://github.com/jaebradley/spotify-application-client#getplayerdetails)

#### `isSpotifyRunning`
* Check to see if the Spotify application is running
* Returns a `Promise` containing a `Boolean`

#### `getTrackId`
* Returns a `Promise` containing [the `Base-62` identifier for the current song](https://developer.spotify.com/web-api/user-guide/#spotify-uris-and-ids)

#### `getTrackName`
* Fetch the current track name
* Returns a `Promise` containing the track name as a `String`

#### `getAlbumName`
* Fetch the current album name
* Returns a `Promise` containing the album name as a `String`

#### `getArtistName`
* Fetch the current artist name
* Returns a `Promise` containing the artist name as a `String`

#### `getPlayerState`
* Fetch the Spotify application player state
* The three states are `PLAYING`, `PAUSED`, `STOPPED`
* Returns a `Promise` containing one of these states

#### `getPlayerPositionInSeconds`
* Fetch the Spotify application player position, in seconds
* Returns a `Promise` containing a `Float` that describes the player's position, in seconds

#### `getTrackDurationInMilliseconds`
* Fetch the current track duration, in milliseconds
* Returns a `Promise` containing an `Integer` that describes the current track's duration, in milliseconds

#### `turnOffRepeat`
* Turn off the repeat state
* Returns a `Promise` containing `null` if the state change is successful

#### `turnOnRepeat`
* Turn on the repeat state
* Returns a `Promise` containing `null` if the state change is successful

#### `isRepeating`
* Check if the repeat state is on
* Returns a `Promise` containing a `Boolean`

#### `toggleRepeat`
* Flips the repeat state; if repeat is turned on, turn it off and if its turned off, turn it on
* Returns a `Promise` containing `null` if the state change is successful

#### `turnOffShuffle`
* Turn off the shuffle state
* Returns a `Promise` containing `null` if the state change is successful

#### `turnOnShuffle`
* Turns on the shuffle state
* Returns a `Promise` containing `null` if the state change is successful

#### `isShuffling`
* Check if the shuffle state is on
* Returns a `Promise` containing a `Boolean`

#### `toggleShuffle`
* Flips the shuffle state; if shuffle is turned on, turn it off and if its turned off, turn it on
* Returns a `Promise` containing `null` if the state change is successful

#### `togglePlayPause`
* Change the player state between `PLAYING` and `PAUSED`; if the player is `PLAYING`, then it will be `PAUSED`, and if its `PAUSED`, then it will be `PLAYING`.
* Returns a `Promise` containing `null` if the state change is successful

#### `play`
* Change the player state to `PLAYING`
* Returns a `Promise` containing `null` if the state change is successful

#### `pause`
* Change the player state to `PAUSED`
* Returns a `Promise` containing `null` if the state change is successful

#### `playNextTrack`
* Plays the next track
* Returns a `Promise` containing `null` if the state change is successful

#### `playPreviousTrack`
* Plays the previous track
* Returns a `Promise` containing `null` if the state change is successful

#### `playTrack(trackId)`
* Plays a track with a given `trackId`
* Returns a `Promise` containing `null` if the state change is successful

#### `playTrackFromAlbum(trackId, albumId)`
* Plays a track from an album with a given `trackId` and `albumId`
* Returns a `Promise` containing `null` if the state change is successful

#### `getTrackDetails`
* Fetches details about the current track
* Returns a `Promise` containing a [`TrackDetails`](https://github.com/jaebradley/spotify-application-client/blob/master/src/data/TrackDetails.js) object.
* The [`TrackDetails`](https://github.com/jaebradley/spotify-application-client/blob/master/src/data/TrackDetails.js) object has the following fields:
  * `name`: the track name
  * `albumName`: the track's album name
  * `artistName`: the track's artist's name
  * `trackDurationInMilliseconds`: the track's duration in milliseconds

#### `getPlayerDetails`
* Fetches details about the player
* Returns a `Promise` a containing a [`PlayerDetails`](https://github.com/jaebradley/spotify-application-client/blob/master/src/data/PlayerDetails.js) object
* The [`PlayerDetails`](https://github.com/jaebradley/spotify-application-client/blob/master/src/data/PlayerDetails.js) object has the following fields:
  * `state`: a [`PlayerState`](https://github.com/jaebradley/spotify-application-client/blob/master/src/data/PlayerState.js) object (`PLAYING`, `PAUSED`, `STOPPED`)
  * `positionInSeconds`: the player's position, in seconds
  * `isShuffling`: a `Boolean` representing the player's shuffle state
  * `isRepeating`: a `Boolean` representing the player's repeat state
  * `isSpotifyRunning`: a `Boolean` representing if the Spotify application is active
