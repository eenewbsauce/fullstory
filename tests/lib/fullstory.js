'use strict';

let expect          = require('chai').expect;
let assert          = require('chai').assert;
let sinon           = require('sinon');

let fullstoryModule = require('../../lib/fullstory');
let getSessions     = fullstoryModule.create().getSessions;
let deps            = fullstoryModule.deps;

let sb = sinon.sandbox.create();
let sbItems = {};

let token = 'akhjfas87ashduasbf28hcq80';
let cb = function() {};

let fakeReqBody = [
  {
    UserId: 123,
    SessionId: 456,
    CreatedTime: new Date().getTime(),
    FsUrl: 'https://www.fullstory.com/ui'
  }
];

describe('fullstory ::', () => {
  beforeEach(() => {
    sbItems.request = sb.stub(deps.request, 'post').callsArgWith(1, null, {}, fakeReqBody);
  });

  afterEach(() => {
    sb.restore();
  });

  describe('getSessions ::', () => {
    it('should return fullstory data on success', (done) => {
      getSessions({uid: 123}, (err, data) => {
        assert(!err);
        assert(data);
        expect(data).to.be.an('array');
        expect(data[0]).to.have.property('UserId');
        expect(data[0]).to.have.property('SessionId');
        expect(data[0]).to.have.property('FsUrl');
        expect(data[0]).to.have.property('CreatedTime');

        done();
      });
    });

    it('should throw if no args are provided', () => {
      try {
        getSessions();
      } catch (err) {
        assert(err);
      }
    });

    it('should handle error in http post', () => {
      sbItems.request.callsArgWith(1, 'ERROR',{});
      getSessions({uid: 123}, (err, data) => {
        assert(err);
        assert(!data);
        done();
      });
    });
  });
});
