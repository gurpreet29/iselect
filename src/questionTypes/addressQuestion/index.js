import angular from 'angular';
import addressQuestion from './addressQuestion';
import typeAheadCtrl from 'angular-ui-bootstrap/src/typeahead';
import tooltip from 'angular-ui-bootstrap/src/tooltip';
import services from '../../services';


export default angular.module('iselect.vertical.questionType.address', [typeAheadCtrl, tooltip, services])
    .component('addressQuestion', addressQuestion)

    // end of config.
    .name;