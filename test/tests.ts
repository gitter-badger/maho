import {expect} from 'chai';
import {Matcher} from '../source/matcher.class';

const spells = {
  'lina': [
    'Bram Gush',
    'Burst Flare',
    'Demonic Crystal',
    'Digger Volt',
    'Dragon Slave',
    'Fireball',
    'Giga Slave',
    'Laguna Blade',
    'Ra Tilt',
    'Van Rehl'
  ]
};

describe('Matchers', () => {
  describe('matchStart', () => {
    const matcher = Matcher.matchStart;

    it('Matches start of string', () => {
      let search = 'D';
      // let match = spells.lina.filter()
      expect(matcher('D', spells.lina[3])).to.be.true;
    });
  });

  describe('matchAnywhere', () => { });
  describe('matchAnywhereSparse', () => { });
  describe('matchExactly', () => { });

});
