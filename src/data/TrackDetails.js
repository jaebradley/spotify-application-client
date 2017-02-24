'use es6';

import { Record } from 'immutable';

const defaults = {
  name: "",
  albumName: "",
  artistName: "",
  durationInMilliseconds: 0
};

export default class TrackDetails extends Record(defaults) {
};
