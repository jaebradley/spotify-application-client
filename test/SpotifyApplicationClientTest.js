'use es6';

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
chai.should();

import SpotifyApplicationClient from '../src/services/SpotifyApplicationClient';
import PlayerState from '../src/data/PlayerState';

// Mess is Mine by Vance Joy from Dream Your Life Away (Special Edition)
const trackId = '29jtZGdgpE2lWm2mkIt6HS';
const expectedTrackName = 'Mess is Mine';
const expectedAlbumName = 'Dream Your Life Away (Special Edition)';
const expectedArtistName = 'Vance Joy';
const expectedTrackDurationInMilliseconds = 223640;

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
  after(function() {
    SpotifyApplicationClient.getTrackName().should.eventually.equal(expectedTrackName);
    SpotifyApplicationClient.getAlbumName().should.eventually.equal(expectedAlbumName);
    SpotifyApplicationClient.getArtistName().should.eventually.equal(expectedArtistName);
    SpotifyApplicationClient.getTrackDurationInMilliseconds().should.eventually.equal(expectedTrackDurationInMilliseconds);
  });

  it('should play track', function() {
    SpotifyApplicationClient.playTrack(trackId);
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
