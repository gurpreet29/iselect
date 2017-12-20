/**
 */

import angular from 'angular';
import currencyLabelQuestion from './currencyLabelQuestion';
import pickListLabelQuestion from './pickListLabelQuestion';
import toggleSwitch from './toggleSwitch';

export default angular.module('iselect.vertical.recommendationquestionTypes',
  [currencyLabelQuestion, pickListLabelQuestion, toggleSwitch])
  // end of config
  .name;
