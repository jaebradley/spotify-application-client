'use es6';

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

const expect = chai.expect;
const assert = chai.assert;
chai.should();

import SpotifyApplicationClient from '../src/services/SpotifyApplicationClient'

describe('Spotify Application Activation Test', function() {
  before(function() {
    SpotifyApplicationClient.activateApplication();
  });

  it('should check if Spotify Application is running', function() {
    return SpotifyApplicationClient.isSpotifyRunning().should.eventually.be.true;
  });
});

describe('Track Details Tests', function() {
  // Mess is Mine by Vance Joy from Dream Your Life Away (Special Edition)
  const trackId = '29jtZGdgpE2lWm2mkIt6HS';
  const expectedTrackName = 'Mess is Mine';
  const expectedAlbumName = 'Dream Your Life Away (Special Edition)';
  const expectedArtistName = 'Vance Joy';
  const expectedTrackDurationInMilliseconds = 223640;

  before(function() {
    SpotifyApplicationClient.activateApplication();
  });

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
