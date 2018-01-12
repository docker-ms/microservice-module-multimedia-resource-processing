'use strict'

const fs = require('fs');

const shortid = require('shortid');
const Promise = require('bluebird');
const ffmpeg = require('fluent-ffmpeg');

class FfmpegWrapper {

  // `input` available values:
  //   a file name (eg. /path/to/file.avi)
  //   an image pattern (eg. /path/to/frame%03d.png)
  //   a readable stream; only one input stream may be used for a command, but you can use both an input stream and one or several file names
  //
  // `opts` available values:
  //   `source` - input file name or readable stream (ignored if an input file is passed to the constructor)
  //   `timeout` - ffmpeg timeout in seconds (defaults to no timeout)
  //   `preset` or `presets` - directory to load module presets from (defaults to the lib/presets directory in fluent-ffmpeg tree)
  //   `niceness` or `priority` - ffmpeg niceness value, between -20 and 20; ignored on Windows platforms (defaults to 0)
  //   `logger` - logger object with debug(), info(), warn() and error() methods (defaults to no logging)
  //   `stdoutLines`      - maximum number of lines from ffmpeg stdout/stderr to keep in memory (defaults to 100, use 0 for unlimited storage)
  constructor(input, opts) {
    this._ffmpeg = new ffmpeg(input, opts);
  }

  _paramsHandler(...args) {
    const params = {
      width: null,
      timemarks: null,
      callback: null
    };

    if (args.length && typeof args[args.length - 1] === 'function') {
      params.callback = args.pop();
    }

    if (args.length) {
      params.width = ~~args.shift();

      if (args.length) {
        params.timemarks = args.shift();
      }
    }

    return params;
  }

  takeSmallScreenshots(timemarks, callback) {
    return this.takeScreenshots.call(this, 64, ...arguments);
  }

  takeMediumScreenshots(timemarks, callback) {
    return this.takeScreenshots.call(this, 256, ...arguments);
  }

  takeLargeScreenshots(timemarks, callback) {
    return this.takeScreenshots.call(this, 1024, ...arguments);
  }

  takeScreenshots(width, timemarks, callback) {
    if (arguments.length > 3) {
      throw new Error('Too many parameters.');
    }

    ({width, timemarks, callback} = this._paramsHandler.call(this, ...arguments));

    if (Array.isArray(timemarks)) {
      if (timemarks.indexOf(0) === -1) {
        timemarks.unshift(0);
      }
    } else {
      timemarks = [0];
    }

    const tmpId = shortid.generate();
    const tmpFilename = `%i_${tmpId}.png`;

    const opts = {
      folder: '/tmp',
      filename: tmpFilename,
      timemarks: timemarks
    };

    if (width) {
      opts.size = `${width}x?`;
    }

    const rmTmpFiles = (tmpFilePaths) => {
      const rmFile = Promise.promisify(fs.unlink);
      const ops = tmpFilePaths.reduce((acc, curr) => {
        acc.push(
          rmFile(curr)
        );
        return acc;
      }, []);
      Promise.all(ops).then(() => {
        // We want to do nothing to the result.
      }).catch((err) => {
        // We also want to do ntohing to the error.
      });
    };

    const volatilePromise = new Promise((resolve, reject) => {

      this._ffmpeg
        .on('end', () => {
          const readFile = Promise.promisify(fs.readFile);

          const tmpFilePaths = [];
          const readFileOps = timemarks.reduce((acc, curr, idx) => {
            const tmpFilePath = `/tmp/${idx + 1}_${tmpId}.png`;
            acc.push(readFile(tmpFilePath));
            tmpFilePaths.push(tmpFilePath);
            return acc;
          }, []);

          Promise.all(readFileOps).then((results) => {
            const buffers = results.reduce((acc, curr) => {
              acc.push(Buffer.from(curr));
              return acc;
            }, []);

            // Remove all temporary files.
            rmTmpFiles(tmpFilePaths);

            if (callback) {
              return callback(null, buffers);
            } else {
              return resolve(buffers);
            }
          }).catch((err) => {
            if (callback) {
              return callback(err);
            } else {
              return reject(err);
            }
          });
        })
        .on('err', (err) => {
          if (callback) {
            return callback(err);
          } else {
            return reject(err);
          }
        })
        .takeScreenshots(opts);

    });

    // Important: if callback passed, we need to cancel the created promise for avoiding memory leak.
    if (callback) {
      volatilePromise.cancel();
    } else {
      return volatilePromise;
    }
  }

}

module.exports = FfmpegWrapper;


