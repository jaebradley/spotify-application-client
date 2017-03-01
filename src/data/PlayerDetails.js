'use es6';

import { Record } from 'immutable';

import PlayerState from './PlayerState';

const defaults = {
  state: PlayerState.PLAYING,
  positionInSeconds: 0,
  isShuffling: false,
  isRepeating: false,
  isSpotifyRunning: true
}

export default class PlayerDetails extends Record(defaults) {
}
