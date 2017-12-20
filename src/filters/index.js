/**
 */

import angular from 'angular';
import decimalVal from './decimalVal';
import removeDecimal from './removeDecimal';
// import frequencyName from './frequencyName';
import appendEllipces from './appendEllipces';
import charCount from './charCount';


export default angular.module('iselect.vertical.filters', [])
  .filter('decimalVal', decimalVal)
  .filter('removeDecimal', removeDecimal)
  // .filter('frequencyName', frequencyName)
  .filter('appendEllipces', appendEllipces)
  .filter('charCount', charCount)

  // end of config
  .name;
