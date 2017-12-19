import Arr from 'ephox/katamari/api/Arr';
import Jsc from '@ephox/wrap-jsverify';
import { UnitTest, assert } from '@ephox/bedrock';

UnitTest.test('DifferenceTest', function() {
  var check = function (expected, a1, a2) {
    assert.eq(expected, Arr.difference(a1, a2));
  };

  check([], [], []);
  check([1], [1], []);
  check([1, 2, 3], [1, 2, 3], []);
  check([], [], [1, 2, 3]);
  check([], [1, 2, 3], [1, 2, 3]);
  check([1, 3], [1, 2, 3, 4], [2, 4]);
  check([1], [1, 2, 3], [3, 2]);
  check([2], [1, 2, 3, 4], [3, 4, 5, 1, 10, 10000, 56]);

  Jsc.property(
    'After applying different, array 1 should not have nothing from array 2',
    Jsc.array(Jsc.json),
    Jsc.array(Jsc.json),
    function (subject, toMinus) {
      var diffed = Arr.difference(subject, toMinus);

      var hasMinus = Arr.exists(toMinus, function (item) {
        return Arr.contains(diffed, item);
      });

      if (hasMinus) return 'Elements from second array should not be in first';
      return true;
    }
  );
});

