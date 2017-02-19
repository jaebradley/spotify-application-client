'use es6';

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

const expect = chai.expect;
const assert = chai.assert;
chai.should();

import SpotifyApplicationClient from '../src/services/SpotifyApplicationClient'

describe('Spotify Application Client', function() {
  it('should check if Spotify Application is running', function() {
    return SpotifyApplicationClient.isSpotifyRunning().should.eventually.be.true;
  });

  it('should play track', function() {
    return SpotifyApplicationClient.playTrack('3rEoTzDLX8jgatvpBJV9rP').should.eventually.be.true;
  })
});
