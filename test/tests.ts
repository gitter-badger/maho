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
      let match = spells.lina.filter((v) => matcher(search, v)); // umm...
      expect(match).to.deep
        .equal(['Demonic Crystal', 'Digger Volt', 'Dragon Slave']);
    });
  });

  describe('matchAnywhere', () => { });
  describe('matchAnywhereSparse', () => { });
  describe('matchExactly', () => { });

});
