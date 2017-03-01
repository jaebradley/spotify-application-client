'use es6';

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
chai.should();

import SpotifyApplicationClient from '../src/services/SpotifyApplicationClient';
import PlayerState from '../src/data/PlayerState';
import PlayerDetails from '../src/data/PlayerDetails';
import TrackDetails from '../src/data/TrackDetails';

// INTEGRATION TEST TO BE RUN LOCALLY
// Mess is Mine by Vance Joy from Dream Your Life Away (Special Edition)
const trackId = '29jtZGdgpE2lWm2mkIt6HS';
const expectedTrackName = 'Mess is Mine';
const expectedAlbumName = 'Dream Your Life Away (Special Edition)';
const expectedArtistName = 'Vance Joy';
const expectedTrackDurationInMilliseconds = 223640;

const checkTrackState = function(trackName, albumName, artistName, trackDuration) {
  SpotifyApplicationClient.getTrackName().should.eventually.equal(trackName);
  SpotifyApplicationClient.getAlbumName().should.eventually.equal(albumName);
  SpotifyApplicationClient.getArtistName().should.eventually.equal(artistName);
  SpotifyApplicationClient.getTrackDurationInMilliseconds().should.eventually.equal(trackDuration);
};

const checkPlayerState = function(playerState, isRepeating, isShuffling) {
  SpotifyApplicationClient.getPlayerState().should.eventually.equal(playerState);
  SpotifyApplicationClient.isRepeating().should.eventually.equal(isRepeating);
  SpotifyApplicationClient.isShuffling().should.eventually.equal(isShuffling);
};

before(function() {
  SpotifyApplicationClient.activateApplication();
});

describe('Spotify Application Activation Test', function() {
  it('should check if Spotify Application is running', function() {
    SpotifyApplicationClient.isSpotifyRunning().should.eventually.be.true;
  });
});

describe('Track Details Tests', function() {
  it('should play track', function() {
    SpotifyApplicationClient.playTrack(trackId);
    checkTrackState(expectedTrackName, expectedAlbumName, expectedArtistName,
                    expectedTrackDurationInMilliseconds);
  });

  it('should get track details', function() {
    const expectedTrackDetails = new TrackDetails({
      name: expectedTrackName,
      albumName: expectedAlbumName,
      artistName: expectedArtistName,
      trackDurationInMilliseconds: expectedTrackDurationInMilliseconds
    });
    SpotifyApplicationClient.getTrackDetails().should.eventually.equal(expectedTrackDetails);
  });
});

describe('Player Details Tests', function() {
  before(function() {
    SpotifyApplicationClient.playTrack(trackId);
  });

  const initialPlayerState = SpotifyApplicationClient.getPlayerState().then(state => state);
  const initialRepeatingState = SpotifyApplicationClient.isRepeating().then(isRepeating => isRepeating);
  const initialShufflingState = SpotifyApplicationClient.isShuffling().then(isShuffling => isShuffling);

  it('should get player state', function() {
    SpotifyApplicationClient.getPlayerState().should.eventually.equal(initialPlayerState);
  });

  it('should get repeating state', function() {
    SpotifyApplicationClient.isRepeating().should.eventually.equal(initialRepeatingState);
  });

  it('should get shuffling state', function() {
    SpotifyApplicationClient.isShuffling().should.eventually.equal(initialShufflingState);
  });

  it('should get player details', function() {
    const playerDetails = SpotifyApplicationClient.getPlayerDetails()
      .then(details => {
        details.state.should.eql(initialPlayerState);
        details.positionInSeconds.should.be.above(0);
        details.isShuffling.should.eql(initialShufflingState);
        details.isRepeating.should.eql(initialRepeatingState);
        details.isSpotifyRunning.should.be.true;
      });
  })
});

describe('Player State Change Tests', function() {
  before(function() {
    SpotifyApplicationClient.playTrack(trackId);
  });

  const initialPlayerState = SpotifyApplicationClient.getPlayerState().then(state => state);
  const initialRepeatingState = SpotifyApplicationClient.isRepeating().then(isRepeating => isRepeating);
  const initialShufflingState = SpotifyApplicationClient.isShuffling().then(isShuffling => isShuffling);

  it('should pause', function() {
    SpotifyApplicationClient.pause();
    checkPlayerState(PlayerState.PAUSED, initialRepeatingState, initialShufflingState);
  });

  it('should play', function() {
    SpotifyApplicationClient.play();
    checkPlayerState(PlayerState.PLAYING, initialRepeatingState, initialShufflingState);
  });

  it('should toggle play/pause', function() {
    return SpotifyApplicationClient.togglePlayPause()
      .then(state => checkPlayerState(PlayerState.PAUSED, initialRepeatingState, initialShufflingState));
  });

  it('should toggle play/pause again', function() {
    return SpotifyApplicationClient.togglePlayPause()
      .then(state => checkPlayerState(PlayerState.PLAYING, initialRepeatingState, initialShufflingState));
  });
});

describe('Repeating State Change Tests', function() {
  before(function() {
    SpotifyApplicationClient.playTrack(trackId);
  });

  const initialPlayerState = SpotifyApplicationClient.getPlayerState().then(state => state);
  const initialRepeatingState = SpotifyApplicationClient.isRepeating().then(isRepeating => isRepeating);
  const initialShufflingState = SpotifyApplicationClient.isShuffling().then(isShuffling => isShuffling);

  it('should turn on repeat', function() {
    return SpotifyApplicationClient.turnOnRepeat()
      .then(state => checkPlayerState(initialPlayerState, true, initialShufflingState));
  });

  it('should turn off repeat', function() {
    return SpotifyApplicationClient.turnOffRepeat()
      .then(state => checkPlayerState(initialPlayerState, false, initialShufflingState));
  });

  it('should toggle repeat', function() {
    return SpotifyApplicationClient.toggleRepeat()
      .then(state => checkPlayerState(initialPlayerState, true, initialShufflingState));
  });

  it('should toggle repeat', function() {
    return SpotifyApplicationClient.toggleRepeat()
      .then(state => checkPlayerState(initialPlayerState, false, initialShufflingState));
  });
});

describe('Shuffling State Change Tests', function() {
  before(function() {
    SpotifyApplicationClient.playTrack(trackId);
  });

  const initialPlayerState = SpotifyApplicationClient.getPlayerState().then(state => state);
  const initialRepeatingState = SpotifyApplicationClient.isRepeating().then(isRepeating => isRepeating);

  it('should turn on shuffle', function() {
    return SpotifyApplicationClient.turnOnShuffle()
      .then(state => checkPlayerState(initialPlayerState, initialRepeatingState, true));
  });

  it('should turn off shuffle', function() {
    return SpotifyApplicationClient.turnOffShuffle()
      .then(state => checkPlayerState(initialPlayerState, initialRepeatingState, false));
  });

  it('should toggle shuffle', function() {
    return SpotifyApplicationClient.toggleShuffle()
      .then(state => checkPlayerState(initialPlayerState, initialRepeatingState, true));
  });

  it('should toggle shuffle', function() {
    return SpotifyApplicationClient.toggleShuffle()
      .then(state => checkPlayerState(initialPlayerState, initialRepeatingState, false));
  });
});

describe('Playing Track From Album Tests', function() {
  // Dream Your Life Away (Special Edition)
  const albumId = "5S9b8euumqMhQbMk0zzQdH";

  // Wasted Time
  const nextTrackId = "4hjJBjxN6IT0sDyTGlo5tA";
  const nextTrackName = "Wasted Time";
  const nextTrackDuration = 300973;

  before(function() {
    SpotifyApplicationClient.playTrackFromAlbum(trackId, albumId);
  });

  it('should play next track', function() {
    SpotifyApplicationClient.playNextTrack();
    checkTrackState(nextTrackName, expectedAlbumName, expectedArtistName,
                    nextTrackDuration);
  });

  it('should play previous track', function() {
    SpotifyApplicationClient.playPreviousTrack();
    checkTrackState(expectedTrackName, expectedAlbumName, expectedArtistName,
                    expectedTrackDurationInMilliseconds);
  });
});
