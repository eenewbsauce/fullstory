'use strict';

let expect  = require('chai').expect;
let assert  = require('chai').assert;
let sinon   = require('sinon');

let argsMetadata = require('../../lib/fullstory').argsMetadata;
let argumentsHelper = require('../../helper').arguments;
let sb = sinon.sandbox.create();
let sbItems = {};

let token = 'akhjfas87ashduasbf28hcq80';
let cb = function() {}

describe('argumentsHelper ::', () => {
  beforeEach(() => {
    sbItems.ahDecipher = sb.spy(argumentsHelper, 'decipherArguments');
  });

  afterEach(() => {
    sb.restore();
  });

  describe('decipherArguments ::', () => {
    it('should throw if args not supplied', () => {
      try {
        let result = argumentsHelper.decipherArguments();
      } catch (err) {
        expect(sbItems.ahDecipher.threw()).to.be.true;
      }
    });

    it('should throw if fsParams arg is not supplied', () => {
      try {
        let result = argumentsHelper.decipherArguments([cb], argsMetadata);
      } catch (err) {
        expect(sbItems.ahDecipher.threw()).to.be.true;
      }
    });

    it('should throw if args not are malformed', () => {
      try {
        let result = argumentsHelper.decipherArguments([{}, {}, cb], argsMetadata);
      } catch (err) {
        expect(sbItems.ahDecipher.threw()).to.be.true;
      }

      try {
        let result = argumentsHelper.decipherArguments([token, token, cb], argsMetadata);
      } catch (err) {
        expect(sbItems.ahDecipher.threw()).to.be.true;
      }

      try {
        let result = argumentsHelper.decipherArguments([{}, cb, cb], argsMetadata);
      } catch (err) {
        expect(sbItems.ahDecipher.threw()).to.be.true;
      }
    });

    it('should correctly assign params to output despite the order and number supplied', () => {
      let result;

      let argsHappy = [{}, token, cb]
      result = argumentsHelper.decipherArguments(argsHappy, argsMetadata);
      expect(result.params).to.an('object');
      expect(result.token).to.equal(token);
      expect(typeof result.cb).to.equal('function');

      let argsTokenAndCb = [token, cb]
      try {
        result = argumentsHelper.decipherArguments(argsTokenAndCb, argsMetadata);
      } catch(err) {
        expect(sbItems.ahDecipher.threw()).to.be.true;
      }

      let argsParamsAndCb = [{}, cb]
      result = argumentsHelper.decipherArguments(argsParamsAndCb, argsMetadata);
      expect(result.params).to.an('object');
      expect(typeof result.cb).to.equal('function');
      expect(result.token).not.to.equal(token);

      let argsParams = [{}]
      result = argumentsHelper.decipherArguments(argsParams, argsMetadata);
      expect(result.params).to.an('object');
      expect(result.token).not.to.equal(token);

      let argsParamsAndToken = [{}, token]
      result = argumentsHelper.decipherArguments(argsParamsAndToken, argsMetadata);
      expect(result.params).to.an('object');
      expect(result.token).to.equal(token);

      let argsToken = [token]
      try {
        result = argumentsHelper.decipherArguments(argsToken, argsMetadata);
      } catch(err) {
        expect(sbItems.ahDecipher.threw()).to.be.true;
      }

      let argsReverse = [cb, token, {}]
      result = argumentsHelper.decipherArguments(argsReverse, argsMetadata);
      expect(result.cb).to.a('function');
      expect(result.token).to.equal(token);
      expect(result.params).to.be.an('object');

      let argsAllOutOfPosition = [token, cb, {}]
      result = argumentsHelper.decipherArguments(argsAllOutOfPosition, argsMetadata);
      expect(result.cb).to.a('function');
      expect(result.token).to.equal(token);
      expect(result.params).to.be.an('object');

      let argsAllOutOfPosition2 = [cb, {}, token]
      result = argumentsHelper.decipherArguments(argsAllOutOfPosition2, argsMetadata);
      expect(result.cb).to.a('function');
      expect(result.token).to.equal(token);
      expect(result.params).to.be.an('object');
    });
  });
});
