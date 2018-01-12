'use strict';

const fs = require('fs');
const path = require('path');

const chai = require('chai');
const {assert, expect} = chai;
const should = chai.should();

describe('Callback style: taking video screenshots APIs:', () => {

  it('MP4: SampleVideo_1280x720_2mb, take 1 64*_  screenshot', (done) => {
    const fw = new (require('../../index').ffmpegWrapper)(path.resolve(__dirname, '../resources/videos/mp4/SampleVideo_1280x720_2mb.mp4'));
    fw.takeScreenshots(64, (err, buffers) => {
      if (err) {
        return done(err);
      }

      expect(buffers).to.be.an.instanceof(Array);
      expect(buffers.length).to.equal(1);
      buffers.forEach((item) => {
        expect(item).to.be.an.instanceof(Buffer);
      });

      done();
    });
  });

  it('MP4: SampleVideo_1280x720_2mb, take 3 64*_ screenshots respectively at 0s, 5s, 10s', (done) => {
    const fw = new (require('../../index').ffmpegWrapper)(path.resolve(__dirname, '../resources/videos/mp4/SampleVideo_1280x720_2mb.mp4'));
    fw.takeScreenshots(64, [0, 5, 10], (err, buffers) => {
      if (err) {
        return done(err);
      }

      expect(buffers).to.be.an.instanceof(Array);
      expect(buffers.length).to.equal(3);
      buffers.forEach((item) => {
        expect(item).to.be.an.instanceof(Buffer);
      });

      done();
    });
  });

  it("MP4: SampleVideo_1280x720_2mb, take 3 small screenshots respectively at 0s, 5s, 10s by using 'takeSmallScreenshots' shorcut API", (done) => {
    const fw = new (require('../../index').ffmpegWrapper)(path.resolve(__dirname, '../resources/videos/mp4/SampleVideo_1280x720_2mb.mp4'));
    fw.takeSmallScreenshots([0, 5, 10], (err, buffers) => {
      if (err) {
        return done(err);
      }

      expect(buffers).to.be.an.instanceof(Array);
      expect(buffers.length).to.equal(3);
      buffers.forEach((item) => {
        expect(item).to.be.an.instanceof(Buffer);
      });

      done();
    });
  });

  it("MP4: SampleVideo_1280x720_2mb, take 3 medium screenshots respectively at 0s, 5s, 10s by using 'takeMediumScreenshots' shorcut API", (done) => {
    const fw = new (require('../../index').ffmpegWrapper)(path.resolve(__dirname, '../resources/videos/mp4/SampleVideo_1280x720_2mb.mp4'));
    fw.takeMediumScreenshots([0, 5, 10], (err, buffers) => {
      if (err) {
        return done(err);
      }

      expect(buffers).to.be.an.instanceof(Array);
      expect(buffers.length).to.equal(3);
      buffers.forEach((item) => {
        expect(item).to.be.an.instanceof(Buffer);
      });

      done();
    });
  });

  it("MP4: SampleVideo_1280x720_2mb, take 3 large screenshots respectively at 0s, 5s, 10s by using 'takeLargeScreenshots' shorcut API", (done) => {
    const fw = new (require('../../index').ffmpegWrapper)(path.resolve(__dirname, '../resources/videos/mp4/SampleVideo_1280x720_2mb.mp4'));
    fw.takeLargeScreenshots([0, 5, 10], (err, buffers) => {
      if (err) {
        return done(err);
      }

      expect(buffers).to.be.an.instanceof(Array);
      expect(buffers.length).to.equal(3);
      buffers.forEach((item) => {
        expect(item).to.be.an.instanceof(Buffer);
      });

      done();
    });
  });

});


