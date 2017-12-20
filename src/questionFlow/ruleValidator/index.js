import angular from 'angular';
import ruleValidator from './ruleValidator';
import ruleValidatorMessages from './ruleValidatorMessages';

export default angular.module('iselect.vertical.question.validator', [])
  .directive('ruleValidator', ruleValidator)
  .directive('ruleValidatorMessages', ruleValidatorMessages)

  // end of config.
  .name;