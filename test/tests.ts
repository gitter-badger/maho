import {expect} from 'chai';
import {Matcher} from '../source/matcher.class';

describe('Matchers', () => {
  describe('matchStart', () => {
    const matcher = Matcher.matchStart;
    const test = 'Dragon Slave';

    it('should match start of string', () => {
      expect(matcher('D', test)).to.be.true;
    });

    it('should not match just start of word', () => {
      expect(matcher('S', test)).to.be.false;
    });

  });

  describe('matchAnywhere', () => { });
  describe('matchAnywhereSparse', () => { });
  describe('matchExactly', () => { });

});
