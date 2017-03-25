'use es6';

import os from 'os'

import SpotifyApplicationClientMacOS from './SpotifyApplicationClientMacOS'
import SpotifyApplicationClientLinux from './SpotifyApplicationClientLinux'

export default class SpotifyApplicationClientFactory {
  static get() {
    if (os.platform() == 'darwin') {
      return SpotifyApplicationClientMacOS
    } else if (os.platform() == 'linux') {
      return SpotifyApplicationClientLinux
    } else {
      console.log("Unsupported operating system: " + os.platform());
    }
  }
}
