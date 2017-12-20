import angular from 'angular';
import checkBoxQuestion from './checkBoxQuestion';
import checkBoxButton from 'angular-ui-bootstrap/src/buttons';
import services from '../../services';


export default angular.module('iselect.vertical.questionType.checkBoxQuestion', [checkBoxButton, services])
    .component('checkBoxQuestion', checkBoxQuestion)

    // end of config.
    .name;