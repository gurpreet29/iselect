import angular from 'angular';
import lookupQuestion from './lookupQuestion';
import typeAheadCtrl from 'angular-ui-bootstrap/src/typeahead';

export default angular.module('iselect.vertical.questionType.lookup', [typeAheadCtrl])
  .component('lookupQuestion', lookupQuestion)

  // end of config.
  .name;
