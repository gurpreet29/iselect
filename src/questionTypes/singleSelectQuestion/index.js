import angular from 'angular';
import singleSelectQuestion from './singleSelectQuestion';
import radioButton from 'angular-ui-bootstrap/src/buttons';
import services from '../../services';


export default angular.module('iselect.vertical.questionType.singleSelect', [radioButton, services])
    .component('singleSelectQuestion', singleSelectQuestion)

    // end of config.
    .name;