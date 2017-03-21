'use es6';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiImmutable from 'chai-immutable';
chai.use(chaiAsPromised);
chai.use(chaiImmutable);
chai.should();

import SpotifyApplicationClient from '../src/services/SpotifyApplicationClient';
import PlayerState from '../src/data/PlayerState';
import PlayerDetails from '../src/data/PlayerDetails';
import TrackDetails from '../src/data/TrackDetails';

// INTEGRATION TEST TO BE RUN LOCALLY
// Mess is Mine by Vance Joy from Dream Your Life Away (Special Edition)
const trackId = '29jtZGdgpE2lWm2mkIt6HS';
const expectedTrackName = 'Mess Is Mine';
// Typo for Spotify Album
const expectedAlbumName = 'Dream Your Life Away (Special Editon)';
const expectedArtistName = 'Vance Joy';
const expectedTrackDurationInMilliseconds = 223640;

const checkTrackState = function(trackName, albumName, artistName, trackDuration) {
  const expected = new TrackDetails({
    name: trackName,
    albumName: albumName,
    artistName: artistName,
    durationInMilliseconds: trackDuration
  });
  return SpotifyApplicationClient.getTrackDetails()
    .then(details => {
      details.should.eql(expected);
    });
};

const checkPlayerState = function(playerState, isRepeating, isShuffling) {
  return SpotifyApplicationClient.getPlayerDetails()
    .then(details => {
      details.state.should.eql(playerState);
      details.isShuffling.should.eql(isShuffling);
      details.isRepeating.should.eql(isRepeating);
    });
};

before(function() {
  return SpotifyApplicationClient.activateApplication();
});

describe('Spotify Application Activation Test', function() {
  it('should check if Spotify Application is running', function() {
    return SpotifyApplicationClient.isSpotifyRunning().should.become(true);
  });
});

describe('Track Details Tests', function() {
  it('should play track', function() {
    return SpotifyApplicationClient.playTrack(trackId)
      .then( () => checkTrackState(expectedTrackName, expectedAlbumName,
                                   expectedArtistName,
                                   expectedTrackDurationInMilliseconds));
  });

  it('should get track details', function() {
    const expectedTrackDetails = new TrackDetails({
      name: expectedTrackName,
      albumName: expectedAlbumName,
      artistName: expectedArtistName,
      durationInMilliseconds: expectedTrackDurationInMilliseconds
    });
    return SpotifyApplicationClient.getTrackDetails()
      .should.become(expectedTrackDetails);
  });
});

describe('Player Details Tests', function() {
  before(function() {
    return SpotifyApplicationClient.playTrack(trackId);
  });

  it('should get player state', function() {
    return SpotifyApplicationClient.getPlayerState()
      .should.become(PlayerState.PLAYING);
  });

  it('should get repeating state', function() {
    return SpotifyApplicationClient.isRepeating().should.become(false);
  });

  it('should get shuffling state', function() {
    return SpotifyApplicationClient.isShuffling().should.become(false);
  });

  it('should get player details', function() {
    const playerDetails = SpotifyApplicationClient.getPlayerDetails()
      .then(details =>
        {
          details.state.should.become(initialPlayerState);
          details.positionInSeconds.should.be.above(0);
          details.isShuffling.should.become(initialShufflingState);
          details.isRepeating.should.become(initialRepeatingState);
          details.isSpotifyRunning.should.become(true);
      }
    );
  })
});

describe('Player State Change Tests', function() {
  before(function() {
    return SpotifyApplicationClient.playTrack(trackId);
  });

  const initialRepeatingState = false;
  const initialShufflingState = false;

  it('should pause', function() {
    return SpotifyApplicationClient.pause()
      .then( () => checkPlayerState(PlayerState.PAUSED,
                                    initialRepeatingState,
                                    initialShufflingState));
  });

  it('should play', function() {
    return SpotifyApplicationClient.play()
      .then( () => checkPlayerState(PlayerState.PLAYING,
                                    initialRepeatingState,
                                    initialShufflingState));
  });

  it('should toggle play/pause', function() {
    return SpotifyApplicationClient.togglePlayPause()
      .then(state => checkPlayerState(PlayerState.PAUSED,
                                      initialRepeatingState,
                                      initialShufflingState));
  });

  it('should toggle play/pause again', function() {
    return SpotifyApplicationClient.togglePlayPause()
      .then(state => checkPlayerState(PlayerState.PLAYING,
                                      initialRepeatingState,
                                      initialShufflingState));
  });
});

describe('Repeating State Change Tests', function() {
  before(function() {
    return SpotifyApplicationClient.playTrack(trackId);
  });

  const initialPlayerState = PlayerState.PLAYING;
  const initialRepeatingState = false;
  const initialShufflingState = false;

  it('should turn on repeat', function() {
    return SpotifyApplicationClient.turnOnRepeat()
      .then(state => checkPlayerState(initialPlayerState,
                                      true,
                                      initialShufflingState));
  });

  it('should turn off repeat', function() {
    return SpotifyApplicationClient.turnOffRepeat()
      .then(state => checkPlayerState(initialPlayerState,
                                      false,
                                      initialShufflingState));
  });

  it('should toggle repeat', function() {
    return SpotifyApplicationClient.toggleRepeat()
      .then(state => checkPlayerState(initialPlayerState,
                                      true,
                                      initialShufflingState));
  });

  it('should toggle repeat', function() {
    return SpotifyApplicationClient.toggleRepeat()
      .then(state => checkPlayerState(initialPlayerState,
                                      false,
                                      initialShufflingState));
  });
});

describe('Shuffling State Change Tests', function() {
  before(function() {
    return SpotifyApplicationClient.playTrack(trackId);
  });

  const initialPlayerState = PlayerState.PLAYING;
  const initialRepeatingState = false;

  it('should turn on shuffle', function() {
    return SpotifyApplicationClient.turnOnShuffle()
      .then(state => checkPlayerState(initialPlayerState,
                                      initialRepeatingState,
                                      true));
  });

  it('should turn off shuffle', function() {
    return SpotifyApplicationClient.turnOffShuffle()
      .then(state => checkPlayerState(initialPlayerState,
                                      initialRepeatingState,
                                      false));
  });

  it('should toggle shuffle', function() {
    return SpotifyApplicationClient.toggleShuffle()
      .then(state => checkPlayerState(initialPlayerState,
                                      initialRepeatingState,
                                      true));
  });

  it('should toggle shuffle', function() {
    return SpotifyApplicationClient.toggleShuffle()
      .then(state => checkPlayerState(initialPlayerState,
                                      initialRepeatingState,
                                      false));
  });
});

describe('Playing Track From Album Tests', function() {
  // Dream Your Life Away (Special Edition)
  const albumId = '5S9b8euumqMhQbMk0zzQdH';

  // Wasted Time
  const nextTrackId = '4hjJBjxN6IT0sDyTGlo5tA';
  const nextTrackName = 'Wasted Time';
  const nextTrackDuration = 301000;

  // Winds Of Change
  const previousTrackId = '7JXxssBpAnroZOMR4vpOuc';
  const previousTrackName = 'Winds Of Change';
  const previousTrackDuration = 136000;

  beforeEach(function() {
    return SpotifyApplicationClient.playTrackFromAlbum(trackId, albumId);
  });

  it('should play next track', function() {
    return SpotifyApplicationClient.playNextTrack()
      .then( () =>
        {
          return checkTrackState(nextTrackName,
                                 expectedAlbumName,
                                 expectedArtistName,
                                 nextTrackDuration);
        }
      );
  });

  it('should play previous track', function() {
    return SpotifyApplicationClient.playPreviousTrack()
      .then( () =>
        {
          return checkTrackState(previousTrackName,
                                 expectedAlbumName,
                                 expectedArtistName,
                                 previousTrackDuration);
        }
      );
  });
});
