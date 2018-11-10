import inArray from './helper';

const { module, test } = QUnit;

module('Helper: in-array', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(inArray([]), undefined);
  });
});
