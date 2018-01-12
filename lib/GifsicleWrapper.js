'use strict';

const fs = require('fs');
const {execFile} = require('child_process');

const shortid = require('shortid');
const gifsicle = require('gifsicle');

class GifsicleWrapper {

  static _paramsHandler(...args) {
    const params = {
      input: null,
      width: null,
      height: null,
      callback: null
    };

    params.input = args.shift();
    params.width = ~~args.shift();

    if (typeof args[args.length - 1] === 'function') {
      params.callback = args.pop();
    }

    if (args.length) {
      params.height = ~~args.shift();
    }

    return params;
  }

  static resizeToSmall(input, callback) {
    const args = [].slice.call(arguments);
    args.splice(1, 0, 64, 64);
    return this.resize.call(this, ...args);
  }

  static resizeToMedium(input, callback) {
    const args = [].slice.call(arguments);
    args.splice(1, 0, 256, 256);
    return this.resize.call(this, ...args);
  }

  static resizeToLarge(input, callback) {
    const args = [].slice.call(arguments);
    args.splice(1, 0, 1024, 1024);
    return this.resize.call(this, ...args);
  }

  static resize(input, width, height, callback) {
    if (arguments.length > 4) {
      throw new Error('Too many parameters.');
    }

    if (arguments.length < 2) {
      throw new Error('At least pass the input image(path/buffer) and desired width or height parameters.');
    }

    ({input, width, height, callback} = this._paramsHandler.call(this, ...arguments));

    if (!width && !height) {
      throw new Error('Need either desired width or height parameter.')
    }

    width = width || height;
    height = height || width;

    const volatilePromise = new (require('bluebird'))((resolve, reject) => {

      const destPath = `/tmp/${shortid.generate()}.gif`;

      const child = execFile(
        gifsicle,
        ['-', '--colors=256', `--resize-fit=${width}x${height}`, '--resize-method=sample', `--output=${destPath}`],
        (err, stdout, stderr) => {
          if (err) {
            if (callback) {
              return callback(err);
            } else {
              return reject(err);
            }
          }

          const buffer = Buffer.from(fs.readFileSync(destPath));

          // Remove it!
          fs.unlink(destPath, (err) => {
            // We want to do nothing to the error.
          });

          if (callback) {
            return callback(null, buffer);
          } else {
            return resolve(buffer);
          }
        }
      );

      if (input instanceof Buffer) {
        child.stdin.write(input);
      } else if (typeof input === 'string') {
        child.stdin.write(require('fs').readFileSync(input));
      }

      child.stdin.end();

    });

    // Important: if callback passed, we need to cancel the created promise for avoiding memory leak.
    if (callback) {
      volatilePromise.cancel();
    } else {
      return volatilePromise;
    }

  }

}

module.exports = GifsicleWrapper;


