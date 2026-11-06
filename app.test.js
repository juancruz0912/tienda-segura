const test = require('node:test');
const assert = require('node:assert/strict');
const { total } = require('./app');

test('descuento del 50%', () => {
  assert.equal(total(100, 2, 0.5), 100);
});
