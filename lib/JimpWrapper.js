'use strict';

const jimp = require('jimp');

class JimpWrapper {

  static _paramsHandler(...args) {
    const params = {
      input: null,
      width: null,
      height: null,
      mode: null,
      callback: null
    };

    params.input = args.shift();
    params.width = ~~args.shift();

    if (typeof args[args.length - 1] === 'function') {
      params.callback = args.pop();
    }

    if (args.length) {
      params.height = ~~args.shift();

      if (args.length) {
        params.mode = args.shift();
      }
    }

    return params;
  }

  static resizeToSmall(input, mode, callback) {
    const args = [].slice.call(arguments);
    args.splice(1, 0, 64, 64);
    return this.resize.call(this, ...args);
  }

  static resizeToMedium(input, mode, callback) {
    const args = [].slice.call(arguments);
    args.splice(1, 0, 256, 256);
    return this.resize.call(this, ...args);
  }

  static resizeToLarge(input, mode, callback) {
    const args = [].slice.call(arguments);
    args.splice(1, 0, 1024, 1024);
    return this.resize.call(this, ...args);
  }

  // `mode` default value is: jimp.RESIZE_BILINEAR
  //
  // Other options can be:
  //   jimp.RESIZE_NEAREST_NEIGHBOR
  //   jimp.RESIZE_BICUBIC
  //   jimp.RESIZE_HERMITE
  //   jimp.RESIZE_BEZIER
  //
  // `callback` - function? - if you prefer to use callback style, then the callback function signature need to be like:
  //   (err, buffer) => {}
  static resize(input, width, height, mode, callback) {
    if (arguments.length > 5) {
      throw new Error('Too many parameters.');
    }

    if (arguments.length < 2) {
      throw new Error('At least pass the input image(path/buffer) and desired width or height parameters.');
    }

    ({input, width, height, mode, callback} = this._paramsHandler.call(this, ...arguments));

    if (!width && !height) {
      throw new Error('Need either desired width or height parameter.');
    }

    return jimp.read(input).then((img) => {
      const transition = img.scaleToFit(width || height, height || width, mode || jimp.RESIZE_BILINEAR);

      if (callback) {
        transition.getBuffer(jimp.MIME_BMP, callback);
      } else {
        return new (require('bluebird'))((resolve, reject) => {
          return transition.getBuffer(jimp.MIME_BMP, (err, buffer) => {
            if (err) {
              return reject(err);
            }
            return resolve(buffer);
          });
        });
      }
    });
  }

}

module.exports = JimpWrapper;


