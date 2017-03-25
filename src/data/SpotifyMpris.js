'use es6'

//node-mpris it not good solution for our application - it seems to be fine
//for one-pass, not for continuous usage

import dbus from "dbus-native"

export default class SpotifyMpris {

  constructor() {
    this.bus = dbus.sessionBus()
  }

  isUp() {
    return new Promise((resolve, reject) => {
      this.bus.getObject("org.mpris.MediaPlayer2.spotify", "/org/mpris/MediaPlayer2", function(err, res) {
        resolve(!err)
      })
    });
  }

  getProperty(inter, property) {
    return new Promise((resolve, reject) => {
      this.bus.invoke({
        path: "/org/mpris/MediaPlayer2",
        destination: "org.mpris.MediaPlayer2.spotify",
        'interface': "org.freedesktop.DBus.Properties",
        member: "Get",
        signature: "ss",
        body: [inter, property],
        // type: dbus.messageType.methodReturn
      }, function(err, res) {
        if (err) {
          reject(err)
        } else {
          //Yes, second one
          resolve(res[1])
        }
      })
    })
  }

  getMetadataProperty(property) {
    return Promise.all([getProperty("org.mpris.MediaPlayer2.Player", "Metadata")])
    .then(([metadata]) => {
      var i = 0
      while(metadata[i]) {
        if (metadata[i] == property) {
          return metadata[i+2]
        }
        i++
      }
    })
  }

  invoke(inter, method) {
    return new Promise((resolve, reject) => {
      this.bus.invoke({
        path: "/org/mpris/MediaPlayer2",
        destination: "org.mpris.MediaPlayer2.spotify",
        'interface': inter,
        member: method
      }, function(err, res) {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }


  playTrack(id) {
    return new Promise((resolve, reject) => {
      this.bus.invoke({
        path: "/org/mpris/MediaPlayer2",
        destination: "org.mpris.MediaPlayer2.spotify",
        'interface': "org.mpris.MediaPlayer2.Player",
        member: "OpenUri",
        signature: "s",
        body: [id]
      }, function(err, res) {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  //I can't find anything about destructor or finalise like method in JS
  cleanup() {
    this.bus.connection.end()
  }
}
