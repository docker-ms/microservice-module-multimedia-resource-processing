'use strict';

const fs = require('fs');
const path = require('path');

const chai = require('chai');
const {assert, expect} = chai;
const should = chai.should();

describe('Callback style: BMP resize APIs:', () => {

  it('BMP: w*h_1280*792 to 256*_', (done) => {
    const jw = require('../../index').jimpWrapper;
    jw.resize(path.resolve(__dirname, '../resources/images/bmp/w*h_1280*792.bmp'), 256, (err, buffer) => {
      if (err) {
        return done(err);
      }

      expect(buffer).to.be.instanceof(Buffer);
      expect(buffer.length).to.not.equal(0);

      done();
    });
  });

  it("BMP: w*h_1280*792 to 64*_, by using 'resizeToSmall' shortcut function", (done) => {
    const jw = require('../../index').jimpWrapper;
    jw.resizeToSmall(path.resolve(__dirname, '../resources/images/bmp/w*h_1280*792.bmp'), (err, buffer) => {
      if (err) {
        return done(err);
      }

      expect(buffer).to.be.instanceof(Buffer);
      expect(buffer.length).to.not.equal(0);

      done();
    });
  });

  it("BMP: w*h_1280*792 to 256*_, by using 'resizeToMedium' shortcut function", (done) => {
    const jw = require('../../index').jimpWrapper;
    jw.resizeToMedium(path.resolve(__dirname, '../resources/images/bmp/w*h_1280*792.bmp'), (err, buffer) => {
      if (err) {
        return done(err);
      }

      expect(buffer).to.be.instanceof(Buffer);
      expect(buffer.length).to.not.equal(0);

      done();
    });
  });

  it("BMP: w*h_1280*792 to 1024*_, by using 'resizeToLarge' shortcut function", (done) => {
    const jw = require('../../index').jimpWrapper;
    jw.resizeToLarge(path.resolve(__dirname, '../resources/images/bmp/w*h_1280*792.bmp'), (err, buffer) => {
      if (err) {
        return done(err);
      }

      expect(buffer).to.be.instanceof(Buffer);
      expect(buffer.length).to.not.equal(0);

      done();
    });
  });

  it("BMP: w*h_2855*2104_18MB to 64*_, by using 'resizeToSmall' shortcut function", (done) => {
    const jw = require('../../index').jimpWrapper;
    jw.resizeToSmall(path.resolve(__dirname, '../resources/images/bmp/w*h_2855*2104_18MB.bmp'), (err, buffer) => {
      if (err) {
        return done(err);
      }

      expect(buffer).to.be.instanceof(Buffer);
      expect(buffer.length).to.not.equal(0);

      done();
    });
  });

});


