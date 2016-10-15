'use strict';

let expect = require('chai').expect;
let assert = require('chai').assert;
let sinon = require('sinon');

let argumentsHelper = require('../../helper').arguments;
let sb = sinon.sandbox.create();
let sbItems = {};
let cb = function() {}

describe('helper :: arguments ::', () => {
  beforeEach(() => {
    sbItems.ahDecipher = sb.spy(argumentsHelper, 'decipherArguments');
  });

  afterEach(() => {
    sb.restore();
  });

  describe('decipherArguments', () => {
    it('should throw if args not supplied', () => {
      try {
        let result = argumentsHelper.decipherArguments();
      } catch (err) {
        expect(sbItems.ahDecipher.threw()).to.be.true;
      }
    });

    it('should assign callback to output.cb if it is present', () => {
      let result;
      let token = 'akhjfas87ashduasbf28hcq80';

      let argsHappy = [{}, token, cb]
      result = argumentsHelper.decipherArguments(argsHappy);
      expect(result.params).to.an('object');
      expect(result.token).to.equal(token);
      expect(typeof result.cb).to.equal('function');

      let argsCbOnly = [cb]
      result = argumentsHelper.decipherArguments(argsCbOnly);
      expect(typeof result.cb).to.equal('function');

      let argsTokenAndCb = [token, cb]
      result = argumentsHelper.decipherArguments(argsTokenAndCb);
      expect(result.token).to.equal(token);
      expect(typeof result.cb).to.equal('function');

      let argsParamsAndCb = [{}, cb]
      result = argumentsHelper.decipherArguments(argsParamsAndCb);
      expect(result.params).to.an('object');
      expect(typeof result.cb).to.equal('function');
    });
  });
});
