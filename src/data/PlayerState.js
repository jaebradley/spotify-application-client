'use es6';

import {Enum} from 'enumify';

export default class PlayerState extends Enum {
  static valueOf(value) {
    for (const state of PlayerState.enumValues) {
      if (state.value == value) {
        return state;
      }
    }

    throw new ValueError(`Unable to identify player state for ${value}`);
  }
};

PlayerState.initEnum({
  PLAYING: {
    value: 'playing'
  },
  PAUSED: {
    value: 'paused'
  },
  STOPPED: {
    value: 'stopped'
  }
});
