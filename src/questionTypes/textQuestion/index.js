import angular from 'angular';
import textQuestion from './textQuestion';

export default angular.module('iselect.vertical.questionType.text', [])
  .component('textQuestion', textQuestion)

  // end of config.
  .name;