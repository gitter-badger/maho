import {expect, assert} from 'chai';

describe('Useless tests', () => {
  it('should just pass these', () => {
    // useless test
    let foo: string = 'bar';
    assert.typeOf(foo, 'string');
    expect(5).to.equal(5);
  });
});
