'use strict';

const sharp = require('sharp');

class SharpWrapper {

  constructor(input, opts) {
    if (!input) {
      throw new Error('Input either need to be a string path to the image or a image buffer.');
    }

    // Refer to the link below for possible opts:
    //   http://sharp.dimens.io/en/stable/api-constructor/
    this._sharp = sharp(input, opts);
  }

  _paramsHandler(...args) {
    const params = {
      width: null,
      height: null,
      quality: null,
      opts: null,
      sysOpts: null,
      callback: null
    };

    params.width = ~~args.shift();

    if (typeof args[args.length - 1] === 'function') {
      params.callback = args.pop();
    }

    if (args.length) {
      params.height = ~~args.shift();

      if (args.length) {
        params.quality = ~~args.shift();

        if (args.length) {
          params.opts = args.shift();

          if (args.length) {
            params.sysOpts = args.shift();
          }
        }
      }
    }

    return params;
  }

  resizeToSmall(quality, opts, sysOpts, callback) {
    return this.resize.call(this, 64, 64, ...arguments);
  }

  resizeToMedium(quality, opts, sysOpts, callback) {
    return this.resize.call(this, 256, 256, ...arguments);
  }

  resizeToLarge(quality, opts, sysOpts, callback) {
    return this.resize.call(this, 1024, 1024, ...arguments);
  }

  // `?` means optional
  //
  // `sysOpts` - object? - represents the opts defined by `sharp` lib for its own `resize` function, which can be referred to the link below:
  //   http://sharp.dimens.io/en/stable/api-resize/
  //
  // `opts` - object? - is exposed for our possible advanced customization requirements:
  //   sharpen - array? - https://github.com/lovell/sharp/blob/d6a63d11d73f6f8f9dd29c7811b19f1d56b5dce5/docs/api-operation.md#sharpen
  //   progressive - boolean? - can only be applied to: jpeg and png
  //   toFormat - http://sharp.dimens.io/en/stable/api-output/#toformat
  //   withMetadata - object? - http://sharp.dimens.io/en/stable/api-output/#withmetadata
  //
  // `callback` - function? - if you prefer to use callback style, then the callback function signature need to be like:
  //   (err, data, info) => {}
  resize(width, height, quality, opts, sysOpts, callback) {
    if (arguments.length > 6) {
      throw new Error('Too many parameters.');
    }

    if (arguments.length === 0) {
      throw new Error('At least pass the desired width or height parameter.');
    }

    ({width, height, quality, opts, sysOpts, callback} = this._paramsHandler.call(this, ...arguments));

    if (!width && !height) {
      throw new Error('Desired width and height cannot be both 0.');
    }

    const pngOpts = {force: false}, webpOpts = {force: false}, jpegOpts = {force: false};

    if (quality) {
      webpOpts.quality = quality;
      jpegOpts.quality = quality;
    }

    if (opts) {
      if (opts.progressive) {
        pngOpts.progressive = opts.progressive;
        jpegOpts.progressive = opts.progressive;
      }
    }

    const transition = this._sharp.rotate().resize(width || height, height || width, sysOpts || {}).max();

    if (quality || (opts && opts.progressive)) {
      transition
        .png(pngOpts)
        .webp(webpOpts)
        .jpeg(jpegOpts)
    }

    if (opts) {
      if (opts.sharpen) {
        transition.sharpen(...opts.sharpen);
      }
      if (opts.toFormat) {
        transition.toFormat(opts.toFormat);
      }
      if (opts.withMetadata) {
        transition.withMetadata(opts.withMetadata);
      }
    }

    if (callback) {
      transition.toBuffer(callback);
    } else {
      return transition.toBuffer();
    }
  }

}

module.exports = SharpWrapper;


