'use strict';

const fs = require('fs');
const path = require('path');

const chai = require('chai');
const {assert, expect} = chai;
const should = chai.should();

const Promise = require('bluebird');

describe('Promise style: all APIs in Promise style:', () => {

  it('Promise style: images resizing, process multiple requests', () => {
    const jpgPath = '../resources/images/jpg';
    const pngPath = '../resources/images/png';
    const bmpPath = '../resources/images/bmp';
    const gifPath = '../resources/images/gif';

    return Promise.join(
      new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, jpgPath), (err, files) => {
          if (err) {
            return reject(err);
          }
          const jpgs = files.reduce((acc, curr) => {
            if (!curr.startsWith('.')) {
              acc.push(
                path.resolve(__dirname, jpgPath, curr)
              );
            }
            return acc;
          }, []);
          return resolve(jpgs);
        });
      }),
      new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, pngPath), (err, files) => {
          if (err) {
            return reject(err);
          }
          const pngs = files.reduce((acc, curr) => {
            if (!curr.startsWith('.')) {
              acc.push(
                path.resolve(__dirname, pngPath, curr)
              );
            }
            return acc;
          }, []);
          return resolve(pngs);
        });
      }),
      new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, bmpPath), (err, files) => {
          if (err) {
            return reject(err);
          }
          const bmps = files.reduce((acc, curr) => {
            if (!curr.startsWith('.')) {
              acc.push(
                path.resolve(__dirname, bmpPath, curr)
              );
            }
            return acc;
          }, []);
          return resolve(bmps);
        });
      }),
      new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, gifPath), (err, files) => {
          if (err) {
            return reject(err);
          }
          const gifs = files.reduce((acc, curr) => {
            if (!curr.startsWith('.')) {
              acc.push(
                path.resolve(__dirname, gifPath, curr)
              );
            }
            return acc;
          }, []);
          return resolve(gifs);
        });
      }),
      (jpgs, pngs, bmps, gifs) => {
        const ops = jpgs.concat(pngs).reduce((acc, curr) => {
          const sw = new (require('../../index').sharpWrapper)(curr);
          acc.push(
            sw.resizeToMedium(60)
          );
          return acc;
        }, []);
        bmps.reduce((acc, curr) => {
          const jw = require('../../index').jimpWrapper;
          acc.push(
            jw.resizeToSmall(curr)
          );
          return acc;
        }, ops);
        gifs.reduce((acc, curr) => {
          const gw = require('../../index').gifsicleWrapper;
          acc.push(
            gw.resizeToSmall(curr)
          );
          return acc;
        }, ops);
        return Promise.all(ops);
      }
    ).then((results) => {
      results.forEach((res, idx) => {
        expect(res).to.be.instanceof(Buffer);
        expect(res.length).to.not.equal(0);
        if (idx < results.length - 1) {
          expect(res.length).to.not.equal(results[idx + 1].length);
        } else {
          expect(res.length).to.not.equal(results[0].length);
        }
      });
    });
  });

  it('Promise style: video taking screenshots, process multiple requests', () => {
    const mp4Path = '../resources/videos/mp4';
    const aviPath = '../resources/videos/avi';
    const mkvPath = '../resources/videos/mkv';
    const flvPath = '../resources/videos/flv';
    const threeGPPath = '../resources/videos/3gp';
    const wmvPath = '../resources/videos/wmv';

    return Promise.join(
      new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, mp4Path), (err, files) => {
          if (err) {
            return reject(err);
          }
          const mp4s = files.reduce((acc, curr) => {
            if (!curr.startsWith('.')) {
              acc.push(
                path.resolve(__dirname, mp4Path, curr)
              );
            }
            return acc;
          }, []);
          return resolve(mp4s);
        });
      }),
      new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, aviPath), (err, files) => {
          if (err) {
            return reject(err);
          }
          const avis = files.reduce((acc, curr) => {
            if (!curr.startsWith('.')) {
              acc.push(
                path.resolve(__dirname, aviPath, curr)
              );
            }
            return acc;
          }, []);
          return resolve(avis);
        });
      }),
      new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, mkvPath), (err, files) => {
          if (err) {
            return reject(err);
          }
          const mkvs = files.reduce((acc, curr) => {
            if (!curr.startsWith('.')) {
              acc.push(
                path.resolve(__dirname, mkvPath, curr)
              );
            }
            return acc;
          }, []);
          return resolve(mkvs);
        });
      }),
      new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, flvPath), (err, files) => {
          if (err) {
            return reject(err);
          }
          const flvs = files.reduce((acc, curr) => {
            if (!curr.startsWith('.')) {
              acc.push(
                path.resolve(__dirname, flvPath, curr)
              );
            }
            return acc;
          }, []);
          return resolve(flvs);
        });
      }),
      new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, threeGPPath), (err, files) => {
          if (err) {
            return reject(err);
          }
          const threeGPs = files.reduce((acc, curr) => {
            if (!curr.startsWith('.')) {
              acc.push(
                path.resolve(__dirname, threeGPPath, curr)
              );
            }
            return acc;
          }, []);
          return resolve(threeGPs);
        });
      }),
      new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, wmvPath), (err, files) => {
          if (err) {
            return reject(err);
          }
          const wmvs = files.reduce((acc, curr) => {
            if (!curr.startsWith('.')) {
              acc.push(
                path.resolve(__dirname, wmvPath, curr)
              );
            }
            return acc;
          }, []);
          return resolve(wmvs);
        });
      }),
      (mp4s, avis, mkvs, flvs, threeGPs, wmvs) => {
        const ops = mp4s.concat(avis, mkvs, flvs, threeGPs, wmvs).reduce((acc, curr) => {
          const fw = new (require('../../index').ffmpegWrapper)(curr);
          acc.push(
            fw.takeMediumScreenshots([0, 5, 7])
          );
          return acc;
        }, []);
        return Promise.all(ops);
      }
    ).then((results) => {
      results.forEach((res, idx) => {
        expect(res).to.be.an.instanceof(Array);
        res.forEach((item) => {
          expect(item).to.be.an.instanceof(Buffer);
        });
      });
    });
  });

});


