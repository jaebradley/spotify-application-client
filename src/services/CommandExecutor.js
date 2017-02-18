'use es6';

import osascript from 'node-osascript';

export default class CommandExecutor {
  static execute(command) {
    return new Promise((resolve, reject) => {
      osascript.execute(command.value, function(err, result, raw) {
        if (!err) {
          resolve(result);
        } else {
          reject({ reason: `Unable to execute command: ${command}` });
        }
      });
    });
  }
}
