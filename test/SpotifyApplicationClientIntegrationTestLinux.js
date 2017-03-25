'use es6';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiImmutable from 'chai-immutable';
chai.use(chaiAsPromised);
chai.use(chaiImmutable);
chai.should();

var expect = chai.expect

import SpotifyApplicationClientLinux from '../src/services/SpotifyApplicationClientLinux';

import PlayerState from '../src/data/PlayerState';
import PlayerDetails from '../src/data/PlayerDetails';
import TrackDetails from '../src/data/TrackDetails';


// INTEGRATION TEST TO BE RUN LOCALLY
// Changed to something more related with working with Dbus and Spotify "The Worst is Yet To Come"
const trackId = '3T8WTbGrVFWI2eWrDqylTI';
const expectedTrackName = 'The Worst Is Yet To Come';
// Typo for Spotify Album
const expectedAlbumName = 'Of Love And Lunacy';
const expectedArtistName = 'Still Remains';
const expectedTrackDurationInMilliseconds = 230133;

const checkTrackState = function(trackName, albumName, artistName, trackDuration) {
  const expected = new TrackDetails({
    name: trackName,
    albumName: albumName,
    artistName: artistName,
    durationInMilliseconds: trackDuration
  });
  return SpotifyApplicationClientLinux.getTrackDetails()
    .then(details => {
      details.should.eql(expected);
    });
};

const checkPlayerState = function(playerState, isRepeating, isShuffling) {
  return SpotifyApplicationClientLinux.getPlayerDetails()
    .then(details => {
      details.state.should.eql(playerState);
      expect(details.isShuffling).to.be.undefined
      expect(details.isRepeating).to.be.undefined
    });
};

before(function() {
  return SpotifyApplicationClientLinux.activateApplication();
});

describe('Spotify Application Activation Test', function() {
  it('should check if Spotify Application is running', function() {
    return SpotifyApplicationClientLinux.isSpotifyRunning().should.become(true);
  });
});

describe('Track Details Tests', function() {
  it('should play track', function() {
    return SpotifyApplicationClientLinux.playTrack(trackId)
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
    return SpotifyApplicationClientLinux.getTrackDetails()
      .should.become(expectedTrackDetails);
  });

  it('should get song title', function() {
    return SpotifyApplicationClientLinux.getTrackName()
      .should.become(expectedTrackName)
  })

  it('should get album name', function() {
    return SpotifyApplicationClientLinux.getAlbumName()
      .should.become(expectedAlbumName)
  })

  it('should get artist name', function() {
    return SpotifyApplicationClientLinux.getArtistName()
      .should.become(expectedArtistName)
  })

  it('should get duration', function() {
    return SpotifyApplicationClientLinux.getTrackDurationInMilliseconds()
      .should.become(expectedTrackDurationInMilliseconds)
  })

});

describe('Player Details Tests', function() {
  before(function() {
    return SpotifyApplicationClientLinux.playTrack(trackId);
  });

  it('should get player state', function() {
    return SpotifyApplicationClientLinux.getPlayerState()
      .should.become(PlayerState.PLAYING);
  });

  it('should get repeating state', function() {
    return SpotifyApplicationClientLinux.isRepeating().should.become(undefined);
  });

  it('should get shuffling state', function() {
    return SpotifyApplicationClientLinux.isShuffling().should.become(undefined);
  });

  it('should get player details', function() {
    const playerDetails = SpotifyApplicationClientLinux.getPlayerDetails()
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
    return SpotifyApplicationClientLinux.playTrack(trackId);
  });

  const initialRepeatingState = false;
  const initialShufflingState = false;

  it('should pause', function() {
    return SpotifyApplicationClientLinux.pause()
      .then( () => checkPlayerState(PlayerState.PAUSED,
                                    initialRepeatingState,
                                    initialShufflingState));
  });

  it('should play', function() {
    return SpotifyApplicationClientLinux.play()
      .then( () => checkPlayerState(PlayerState.PLAYING,
                                    initialRepeatingState,
                                    initialShufflingState));
  });

  it('should toggle play/pause', function() {
    return SpotifyApplicationClientLinux.togglePlayPause()
      .then(state => checkPlayerState(PlayerState.PAUSED,
                                      initialRepeatingState,
                                      initialShufflingState));
  });

  it('should toggle play/pause again', function() {
    return SpotifyApplicationClientLinux.togglePlayPause()
      .then(state => checkPlayerState(PlayerState.PLAYING,
                                      initialRepeatingState,
                                      initialShufflingState));
  });
});

describe('Repeating State Change Tests', function() {
  before(function() {
    return SpotifyApplicationClientLinux.playTrack(trackId);
  });

  const initialPlayerState = PlayerState.PLAYING;
  const initialRepeatingState = false;
  const initialShufflingState = false;

  it('should turn on repeat', function() {
    return SpotifyApplicationClientLinux.turnOnRepeat()
      .then(state => checkPlayerState(initialPlayerState,
                                      true,
                                      initialShufflingState));
  });

  it('should turn off repeat', function() {
    return SpotifyApplicationClientLinux.turnOffRepeat()
      .then(state => checkPlayerState(initialPlayerState,
                                      false,
                                      initialShufflingState));
  });

  it('should toggle repeat', function() {
    return SpotifyApplicationClientLinux.toggleRepeat()
      .then(state => checkPlayerState(initialPlayerState,
                                      true,
                                      initialShufflingState));
  });

  it('should toggle repeat', function() {
    return SpotifyApplicationClientLinux.toggleRepeat()
      .then(state => checkPlayerState(initialPlayerState,
                                      false,
                                      initialShufflingState));
  });
});

describe('Shuffling State Change Tests', function() {
  before(function() {
    return SpotifyApplicationClientLinux.playTrack(trackId);
  });

  const initialPlayerState = PlayerState.PLAYING;
  const initialRepeatingState = false;

  it('should turn on shuffle', function() {
    return SpotifyApplicationClientLinux.turnOnShuffle()
      .then(state => checkPlayerState(initialPlayerState,
                                      initialRepeatingState,
                                      true));
  });

  it('should turn off shuffle', function() {
    return SpotifyApplicationClientLinux.turnOffShuffle()
      .then(state => checkPlayerState(initialPlayerState,
                                      initialRepeatingState,
                                      false));
  });

  it('should toggle shuffle', function() {
    return SpotifyApplicationClientLinux.toggleShuffle()
      .then(state => checkPlayerState(initialPlayerState,
                                      initialRepeatingState,
                                      true));
  });

  it('should toggle shuffle', function() {
    return SpotifyApplicationClientLinux.toggleShuffle()
      .then(state => checkPlayerState(initialPlayerState,
                                      initialRepeatingState,
                                      false));
  });
});
