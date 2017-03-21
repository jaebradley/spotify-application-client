'use es6';

import chai from 'chai';
chai.should();

import PlayerState from '../src/data/PlayerState';

describe('Player State', function() {
  it('should check if player state can be identified', function() {
    PlayerState.valueOf('playing').should.equal(PlayerState.PLAYING);
  });
});
