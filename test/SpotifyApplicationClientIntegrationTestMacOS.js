'use es6';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiImmutable from 'chai-immutable';
chai.use(chaiAsPromised);
chai.use(chaiImmutable);
chai.should();

import SpotifyApplicationClientMacOS from '../src/services/SpotifyApplicationClientMacOS';

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
  return SpotifyApplicationClientMacOS.getTrackDetails()
    .then(details => {
      details.should.eql(expected);
    });
};

const checkPlayerState = function(playerState, isRepeating, isShuffling) {
  return SpotifyApplicationClientMacOS.getPlayerDetails()
    .then(details => {
      details.state.should.eql(playerState);
      details.isShuffling.should.eql(isShuffling);
      details.isRepeating.should.eql(isRepeating);
    });
};

before(function() {
  return SpotifyApplicationClientMacOS.activateApplication();
});

describe('Spotify Application Activation Test', function() {
  it('should check if Spotify Application is running', function() {
    return SpotifyApplicationClientMacOS.isSpotifyRunning().should.become(true);
  });
});

describe('Track Details Tests', function() {
  it('should play track', function() {
    return SpotifyApplicationClientMacOS.playTrack(trackId)
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
    return SpotifyApplicationClientMacOS.getTrackDetails()
      .should.become(expectedTrackDetails);
  });
});

describe('Player Details Tests', function() {
  before(function() {
    return SpotifyApplicationClientMacOS.playTrack(trackId);
  });

  it('should get player state', function() {
    return SpotifyApplicationClientMacOS.getPlayerState()
      .should.become(PlayerState.PLAYING);
  });

  it('should get repeating state', function() {
    return SpotifyApplicationClientMacOS.isRepeating().should.become(false);
  });

  it('should get shuffling state', function() {
    return SpotifyApplicationClientMacOS.isShuffling().should.become(false);
  });

  it('should get player details', function() {
    const playerDetails = SpotifyApplicationClientMacOS.getPlayerDetails()
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
    return SpotifyApplicationClientMacOS.playTrack(trackId);
  });

  const initialRepeatingState = false;
  const initialShufflingState = false;

  it('should pause', function() {
    return SpotifyApplicationClientMacOS.pause()
      .then( () => checkPlayerState(PlayerState.PAUSED,
                                    initialRepeatingState,
                                    initialShufflingState));
  });

  it('should play', function() {
    return SpotifyApplicationClientMacOS.play()
      .then( () => checkPlayerState(PlayerState.PLAYING,
                                    initialRepeatingState,
                                    initialShufflingState));
  });

  it('should toggle play/pause', function() {
    return SpotifyApplicationClientMacOS.togglePlayPause()
      .then(state => checkPlayerState(PlayerState.PAUSED,
                                      initialRepeatingState,
                                      initialShufflingState));
  });

  it('should toggle play/pause again', function() {
    return SpotifyApplicationClientMacOS.togglePlayPause()
      .then(state => checkPlayerState(PlayerState.PLAYING,
                                      initialRepeatingState,
                                      initialShufflingState));
  });
});

describe('Repeating State Change Tests', function() {
  before(function() {
    return SpotifyApplicationClientMacOS.playTrack(trackId);
  });

  const initialPlayerState = PlayerState.PLAYING;
  const initialRepeatingState = false;
  const initialShufflingState = false;

  it('should turn on repeat', function() {
    return SpotifyApplicationClientMacOS.turnOnRepeat()
      .then(state => checkPlayerState(initialPlayerState,
                                      true,
                                      initialShufflingState));
  });

  it('should turn off repeat', function() {
    return SpotifyApplicationClientMacOS.turnOffRepeat()
      .then(state => checkPlayerState(initialPlayerState,
                                      false,
                                      initialShufflingState));
  });

  it('should toggle repeat', function() {
    return SpotifyApplicationClientMacOS.toggleRepeat()
      .then(state => checkPlayerState(initialPlayerState,
                                      true,
                                      initialShufflingState));
  });

  it('should toggle repeat', function() {
    return SpotifyApplicationClientMacOS.toggleRepeat()
      .then(state => checkPlayerState(initialPlayerState,
                                      false,
                                      initialShufflingState));
  });
});

describe('Shuffling State Change Tests', function() {
  before(function() {
    return SpotifyApplicationClientMacOS.playTrack(trackId);
  });

  const initialPlayerState = PlayerState.PLAYING;
  const initialRepeatingState = false;

  it('should turn on shuffle', function() {
    return SpotifyApplicationClientMacOS.turnOnShuffle()
      .then(state => checkPlayerState(initialPlayerState,
                                      initialRepeatingState,
                                      true));
  });

  it('should turn off shuffle', function() {
    return SpotifyApplicationClientMacOS.turnOffShuffle()
      .then(state => checkPlayerState(initialPlayerState,
                                      initialRepeatingState,
                                      false));
  });

  it('should toggle shuffle', function() {
    return SpotifyApplicationClientMacOS.toggleShuffle()
      .then(state => checkPlayerState(initialPlayerState,
                                      initialRepeatingState,
                                      true));
  });

  it('should toggle shuffle', function() {
    return SpotifyApplicationClientMacOS.toggleShuffle()
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
    return SpotifyApplicationClientMacOS.playTrackFromAlbum(trackId, albumId);
  });

  it('should play next track', function() {
    return SpotifyApplicationClientMacOS.playNextTrack()
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
    return SpotifyApplicationClientMacOS.playPreviousTrack()
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
