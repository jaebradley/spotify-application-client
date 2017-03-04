[![Build Status](https://travis-ci.org/jaebradley/spotify-application-client.svg?branch=master)](https://travis-ci.org/jaebradley/spotify-application-client)

# Spotify Application Client for MacOS
Node Client for the Spotify App on Mac OS

## Overview
Spotify built an [AppleScript API](https://developer.spotify.com/applescript-api/) that enables programmatic control of the player (on Mac OS).

This client sits on top of this AppleScript API to provide a simple abstraction layer.

### API
All methods return a `Promise`

#### `isSpotifyRunning`
#### `getSongName`
#### `getAlbumName`
#### `getArtistName`
#### `getPlayerState`
#### `getPlayerPositionInSeconds`
#### `getTrackDurationInSeconds`
#### `turnOffRepeat`
#### `turnOnRepeat`
#### `isRepeating`
#### `toggleRepeat`
#### `turnOffShuffle`
#### `turnOnShuffle`
#### `isShuffling`
#### `toggleShuffle`
#### `togglePlayPause`
#### `play`
#### `pause`
#### `playNextTrack`
#### `playPreviousTrack`
