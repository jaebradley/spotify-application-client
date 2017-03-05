[![Build Status](https://travis-ci.org/jaebradley/spotify-application-client.svg?branch=master)](https://travis-ci.org/jaebradley/spotify-application-client)

# Spotify Application Client for MacOS
Node Client for the Spotify App on Mac OS

## Overview
Spotify built an [AppleScript API](https://developer.spotify.com/applescript-api/) that enables programmatic control of the player (on Mac OS).

This client sits on top of this AppleScript API to provide a simple abstraction layer.

### API

#### `isSpotifyRunning`
* Check to see if the Spotify application is running
* Returns a `Promise` containing a `Boolean`

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

#### `getTrackDurationInSeconds`
* Fetch the current track duration, in seconds
* Returns a `Promise` containing a `Float` that describes the current track's duration, in seconds

#### `turnOffRepeat`
* Turn off the repeat state
* Returns a `Promise` containing `null` if the state change was successful.

#### `turnOnRepeat`
* Turn on the repeat state
* Returns a `Promise` containing `null` if the state change was successful.

#### `isRepeating`
* Check if repeat state is on
* Returns a `Promise` containing a `Boolean`

#### `toggleRepeat`
* Flips the repeat state; if repeat is turned on, turn it off and if its turned off, turn it on.
* Returns a `Promise` containing `null` if the state change was successful.

#### `turnOffShuffle`
#### `turnOnShuffle`
#### `isShuffling`
#### `toggleShuffle`
#### `togglePlayPause`
#### `play`
#### `pause`
#### `playNextTrack`
#### `playPreviousTrack`
