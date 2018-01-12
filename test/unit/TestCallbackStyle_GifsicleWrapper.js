'use strict';

const fs = require('fs');
const path = require('path');

const chai = require('chai');
const {assert, expect} = chai;
const should = chai.should();

describe('Callback style: GIF resize and sampling APIs:', () => {

  it('GIF: w*h_365*360 to 256*_', (done) => {
    const gw = require('../../index').gifsicleWrapper;
    gw.resize(path.resolve(__dirname, '../resources/images/gif/w*h_365*360.gif'), 256, (err, buffer) => {
      if (err) {
        return done(err);
      }

      expect(buffer).to.be.instanceof(Buffer);
      expect(buffer.length).to.not.equal(0);

      done();
    });
  });

  it("GIF: w*h_365*360 to 64*_, by using 'resizeToSmall' shortcut function", (done) => {
    const gw = require('../../index').gifsicleWrapper;
    gw.resizeToSmall(path.resolve(__dirname, '../resources/images/gif/w*h_365*360.gif'), (err, buffer) => {
      if (err) {
        return done(err);
      }

      expect(buffer).to.be.instanceof(Buffer);
      expect(buffer.length).to.not.equal(0);

      done();
    });
  });

  it("GIF: w*h_365*360 to 256*_, by using 'resizeToMedium' shortcut function", (done) => {
    const gw = require('../../index').gifsicleWrapper;
    gw.resizeToMedium(path.resolve(__dirname, '../resources/images/gif/w*h_365*360.gif'), (err, buffer) => {
      if (err) {
        return done(err);
      }

      expect(buffer).to.be.instanceof(Buffer);
      expect(buffer.length).to.not.equal(0);

      done();
    });
  });

  it("GIF: w*h_365*360 to 1024*_, by using 'resizeToLarge' shortcut function", (done) => {
    const gw = require('../../index').gifsicleWrapper;
    gw.resizeToLarge(path.resolve(__dirname, '../resources/images/gif/w*h_365*360.gif'), (err, buffer) => {
      if (err) {
        return done(err);
      }

      expect(buffer).to.be.instanceof(Buffer);
      expect(buffer.length).to.not.equal(0);

      done();
    });
  });

});


