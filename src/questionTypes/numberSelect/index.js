import angular from 'angular';
import numberSelectQuestion from './numberSelect';
import radioButton from 'angular-ui-bootstrap/src/buttons';
import services from '../../services';


export default angular.module('iselect.vertical.questionType.numberSelectQuestion', [radioButton, services])
    .component('numberSelectQuestion', numberSelectQuestion)

    // end of config.
    .name;