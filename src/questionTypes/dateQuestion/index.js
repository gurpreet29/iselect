import angular from 'angular';
import uiDatePicker from 'angular-ui-bootstrap/src/datepickerPopup';
import dateQuestion from './dateQuestion';
import uibDateParser from 'angular-ui-bootstrap/src/dateparser';


export default angular.module('iselect.vertical.questionType.date', [uiDatePicker, uibDateParser])
  .component('dateQuestion', dateQuestion)

  // end of config.
  .name;