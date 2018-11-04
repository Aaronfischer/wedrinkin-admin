import formatCommaArray from './helper';

const { module, test } = QUnit;

module('Helper: format-comma-array', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(formatCommaArray([]), undefined);
  });
});
