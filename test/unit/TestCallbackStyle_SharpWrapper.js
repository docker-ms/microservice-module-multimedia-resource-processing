'use strict';

const fs = require('fs');
const path = require('path');

const chai = require('chai');
const {assert, expect} = chai;
const should = chai.should();

describe('Callback style: JPG/JPEG/PNG resize APIs:', () => {

  it('PNG: w*h_2048*2048 to 256*256', (done) => {
    const sw = new (require('../../index').sharpWrapper)(path.resolve(__dirname, '../resources/images/png/w*h_2048*2048.png'));
    sw.resize(256, 256, (err, data, info) => {
      if (err) {
        return done(err);
      }

      expect(info).to.be.an('object');
      expect(info.width).to.equal(256);
      expect(info.height).to.equal(256);

      done();
    });
  });

  it("PNG: w*h_2048*2048 to 256*256, set quality to 10, with 'sharpen', 'progressive', and 'withMetadata' opts", (done) => {
    const sw = new (require('../../index').sharpWrapper)(path.resolve(__dirname, '../resources/images/png/w*h_2048*2048.png'));
    sw.resize(256, 0, 10, {sharpen: [6], progressive: true, withMetadata: {}}, (err, data, info) => {
      if (err) {
        return done(err);
      }

      expect(info).to.be.an('object');
      expect(info.width).to.equal(256);
      expect(info.height).to.equal(256);

      done();
    });
  });

  it('JPG: w*h_128*2048 to _*256, A: compare the parameters passed in way with the below B', (done) => {
    const sw = new (require('../../index').sharpWrapper)(path.resolve(__dirname, '../resources/images/jpg/w*h_128*2048.jpg'));
    sw.resize(0, 256, (err, data, info) => {
      if (err) {
        return done(err);
      }

      expect(info).to.be.an('object');
      expect(info.width).to.equal(16);
      expect(info.height).to.equal(256);

      done();
    });
  });

  it('JPG: w*h_128*2048 to _*256, B: compare the parameters passed in way with the above A', (done) => {
    const sw = new (require('../../index').sharpWrapper)(path.resolve(__dirname, '../resources/images/jpg/w*h_128*2048.jpg'));
    sw.resize(256, (err, data, info) => {
      if (err) {
        return done(err);
      }

      expect(info).to.be.an('object');
      expect(info.width).to.equal(16);
      expect(info.height).to.equal(256);

      done();
    });
  });

  it("JPG: w*h_128*2048 to _*64, by using shortcut function 'resizeToSmall'", (done) => {
    const sw = new (require('../../index').sharpWrapper)(path.resolve(__dirname, '../resources/images/jpg/w*h_128*2048.jpg'));
    sw.resizeToSmall((err, data, info) => {
      if (err) {
        return done(err);
      }

      expect(info).to.be.an('object');
      expect(info.width).to.equal(4);
      expect(info.height).to.equal(64);

      done();
    });
  });

  it("JPG: w*h_128*2048 to _*256, by using shortcut function 'resizeToMedium'", (done) => {
    const sw = new (require('../../index').sharpWrapper)(path.resolve(__dirname, '../resources/images/jpg/w*h_128*2048.jpg'));
    sw.resizeToMedium((err, data, info) => {
      if (err) {
        return done(err);
      }

      expect(info).to.be.an('object');
      expect(info.width).to.equal(16);
      expect(info.height).to.equal(256);

      done();
    });
  });

  it("JPG: w*h_128*2048 to _*1024, by using shortcut function 'resizeToLarge'", (done) => {
    const sw = new (require('../../index').sharpWrapper)(path.resolve(__dirname, '../resources/images/jpg/w*h_128*2048.jpg'));
    sw.resizeToLarge((err, data, info) => {
      if (err) {
        return done(err);
      }

      expect(info).to.be.an('object');
      expect(info.width).to.equal(64);
      expect(info.height).to.equal(1024);

      done();
    });
  });

  it("JPG: w*h_128*2048 to _*1024, by using shortcut function 'resizeToLarge', and set quality to 50", (done) => {
    const sw = new (require('../../index').sharpWrapper)(path.resolve(__dirname, '../resources/images/jpg/w*h_128*2048.jpg'));
    sw.resizeToLarge(50, (err, data, info) => {
      if (err) {
        return done(err);
      }

      expect(info).to.be.an('object');
      expect(info.width).to.equal(64);
      expect(info.height).to.equal(1024);

      done();
    });
  });

  it('JPG: w*h_2048*128 to 256*_', (done) => {
    const sw = new (require('../../index').sharpWrapper)(path.resolve(__dirname, '../resources/images/jpg/w*h_2048*128.jpg'));
    sw.resize(256, (err, data, info) => {
      if (err) {
        return done(err);
      }

      expect(info).to.be.an('object');
      expect(info.width).to.equal(256);
      expect(info.height).to.equal(16);

      done();
    });
  });

  it("JPG: w*h_800*286 to _*256, by using shortcut function 'resizeToMedium'", (done) => {
    const sw = new (require('../../index').sharpWrapper)(path.resolve(__dirname, '../resources/images/jpg/w*h_800*286.jpg'));
    sw.resizeToMedium((err, data, info) => {
      if (err) {
        return done(err);
      }

      expect(info).to.be.an('object');
      expect(info.width).to.equal(256);
      expect(info.height).to.equal(Math.round(286 / (800 / 256)));

      done();
    });
  });

  it("JPG: w*h_10315*7049_10.2MB to _*256, by using shortcut function 'resizeToMedium', and set quality to 60", (done) => {
    const sw = new (require('../../index').sharpWrapper)(path.resolve(__dirname, '../resources/images/jpg/w*h_10315*7049_10.2MB.jpg'));
    sw.resizeToMedium(60, (err, data, info) => {
      if (err) {
        return done(err);
      }

      expect(info).to.be.an('object');
      expect(info.width).to.equal(256);
      expect(info.height).to.equal(Math.round(7049 / (10315 / 256)));

      done();
    });
  });

  it("JPG: w*h_23680*2144_18.5MB to _*1024, by using shortcut function 'resizeToLarge', and set progressive to true", (done) => {
    const sw = new (require('../../index').sharpWrapper)(path.resolve(__dirname, '../resources/images/jpg/w*h_23680*2144_18.5MB.jpg'));
    sw.resizeToLarge(0, {progressive: true}, (err, data, info) => {
      if (err) {
        return done(err);
      }

      expect(info).to.be.an('object');
      expect(info.width).to.equal(1024);
      expect(Math.abs(Math.round(2114 / (23680 / 1024)) - info.height)).to.be.at.most(2);

      done();
    });
  });

  it("JPG: w*h_23680*2144_18.5MB to _*64, by using shortcut function 'resizeToSmall', and set progressive to true", (done) => {
    const sw = new (require('../../index').sharpWrapper)(path.resolve(__dirname, '../resources/images/jpg/w*h_23680*2144_18.5MB.jpg'));
    sw.resizeToSmall(0, {progressive: true}, (err, data, info) => {
      if (err) {
        return done(err);
      }

      expect(info).to.be.an('object');
      expect(info.width).to.equal(64);
      expect(info.height).to.equal(Math.round(2114 / (23680 / 64)));

      done();
    });
  });

  it("JPG: w*h_11846*9945_48.9MB to _*256, by using shortcut function 'resizeToMedium', and set progressive to true", (done) => {
    const sw = new (require('../../index').sharpWrapper)(path.resolve(__dirname, '../resources/images/jpg/w*h_11846*9945_48.9MB.jpg'));
    sw.resizeToMedium(0, {progressive: true}, (err, data, info) => {
      if (err) {
        return done(err);
      }

      expect(info).to.be.an('object');
      expect(info.width).to.equal(256);
      expect(Math.abs(Math.round(9945 / (11846 / 256)) - info.height)).to.be.at.most(2);

      done();
    });
  });

  it('JPG: w*h_1200*1800_portrait_4.jpg', (done) => {
    const sw = new (require('../../index').sharpWrapper)(path.resolve(__dirname, '../resources/images/jpg/w*h_1200*1800_portrait_4.jpg'));
    sw.resize(256, 0, (err, data, info) => {
      if (err) {
        return done(err);
      }

      expect(info).to.be.an('object');
      expect(info.height).to.equal(256);
      expect(Math.abs(Math.round(1200 / (1800 / 256)) - info.width)).to.be.at.most(2);

      done();
    });
  });

});


