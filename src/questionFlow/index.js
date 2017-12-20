/**
 */

import angular from 'angular';
import uiProgressBar from 'angular-ui-bootstrap/src/progressbar';
import tooltip from 'angular-ui-bootstrap/src/tooltip';
import duScroll from 'angular-scroll';

import questionTypes from '../questionTypes';
import ruleValidator from './ruleValidator';

import questionSet from './questionSet';
import question from './question';
import questionTracker from './questionTracker';
import formPage from './formPage';


export default angular.module('iselect.vertical.questionFlow', [questionTypes, ruleValidator, uiProgressBar, tooltip, duScroll])

  .component('questionSet', questionSet)
  .component('question', question)
  .component('formPage', formPage)

  .service('questionTracker', questionTracker)

  // end of config
  .name;
