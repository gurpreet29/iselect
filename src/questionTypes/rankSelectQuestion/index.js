import angular from 'angular';
import rankSelectQuestion from './rankSelectQuestion';
import radioButton from 'angular-ui-bootstrap/src/buttons';
import services from '../../services';


export default angular.module('iselect.vertical.questionType.rankSelectQuestion', [radioButton, services])
    .component('rankSelectQuestion', rankSelectQuestion)

    // end of config.
    .name;