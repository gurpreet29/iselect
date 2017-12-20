/**
 */

import angular from 'angular';
import textQuestion from './textQuestion';
import dateQuestion from './dateQuestion';
import addressQuestion from './addressQuestion';
import singleSelectQuestion from './singleSelectQuestion';
import numberSelectQuestion from './numberSelect';
import rankSelectQuestion from './rankSelectQuestion';
import pickListQuestion from './picklistQuestion';
import checkBoxQuestion from './checkBoxQuestion';
import labelQuestion from './labelQuestion';
import currencyQuestion from './currencyQuestion';
import lookupQuestion from './lookupQuestion';


export default angular.module('iselect.vertical.questionTypes',
  [
    dateQuestion,
    textQuestion,
    addressQuestion,
    singleSelectQuestion,
    numberSelectQuestion,
    rankSelectQuestion,
    pickListQuestion,
    checkBoxQuestion,
    labelQuestion,
    currencyQuestion,
    lookupQuestion
  ])

  // end of config
  .name;

