import Arr from './Arr';
import Future from './Future';
import AsyncValues from '../async/AsyncValues';

/** par :: [Future a] -> Future [a] */
var par = function(futures) {
  return AsyncValues.par(futures, Future.nu);
};

/** mapM :: [a] -> (a -> Future b) -> Future [b] */
var mapM = function(array, fn) {
  var futures = Arr.map(array, fn);
  return par(futures);
};

/** Kleisli composition of two functions: a -> Future b.
 *  Note the order of arguments: g is invoked first, then the result passed to f.
 *  This is in line with f . g = \x -> f (g a)
 *
 *  compose :: ((b -> Future c), (a -> Future b)) -> a -> Future c
 */
var compose = function (f, g) {
  return function (a) {
    return g(a).bind(f);
  };
};

export default <any> {
  par: par,
  mapM: mapM,
  compose: compose
};