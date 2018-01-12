'use strict';

module.exports = require('./lib/SharpWrapper');

module.exports = {
  sharp: require('sharp'),
  sharpWrapper: require('./lib/SharpWrapper'),

  jimp: require('jimp'),
  jimpWrapper: require('./lib/JimpWrapper'),

  gifsicleWrapper: require('./lib/GifsicleWrapper'),

  ffmpegWrapper: require('./lib/FfmpegWrapper')
};


