test(
  'Deltas',

  [
    'ephox.katamari.api.Fun',
    'ephox.snooker.calc.Deltas'
  ],

  function (Fun, Deltas) {
    var min = 10;
    var check = function (expected, input, column, step) {
      var singleColumnWidth = function (width, _delta) {
        var newNext = Math.max(min, width + step);
        return [ newNext - width ];
      };
      var tableSize = {
        minCellWidth: Fun.constant(10),
        singleColumnWidth: singleColumnWidth
      };
      var actual = Deltas.determine(input, column, step, tableSize);
      assert.eq(expected, actual);
    };

    check([-20, 20, 0, 0], [100, 50, 250, 100], 0, -20);
    check([-90, 90, 0, 0], [100, 50, 250, 100], 0, -200);
    check([20, -20, 0, 0], [100, 50, 250, 100], 0, 20);
    check([80, -40, 0, 0], [100, 50, 250, 100], 0, 80);

    check([0, -30, 30, 0], [100, 50, 250, 100], 1, -30);
    check([0, -40, 40, 0], [100, 50, 250, 100], 1, -100);
    check([0, 30, -30, 0], [100, 50, 250, 100], 1, 30);
    check([0, 400, -240, 0], [100, 50, 250, 100], 1, 400);

    check([0, 0, -20, 20], [100, 50, 250, 100], 2, -20);
    check([0, 0, -240, 240], [100, 50, 250, 100], 2, -300);
    check([0, 0, 20, -20], [100, 50, 250, 100], 2, 20);
    check([0, 0, 150, -90], [100, 50, 250, 100], 2, 150);

    check([0, 0, 0, 50], [100, 50, 250, 100], 3, 50);
    check([0, 0, 0, 100], [100, 50, 250, 100], 3, 100);
    check([0, 0, 0, -50], [100, 50, 250, 100], 3, -50);
    check([0, 0, 0, -90], [100, 50, 250, 100], 3, -150);

    check([-70], [80], 0, -100);
    check([-100], [115], 0, -100);
    check([25], [25], 0, 25);

    check([], [], 0, 0);
    check([50, -50], [200, 200], 0, 50);
  }
);
