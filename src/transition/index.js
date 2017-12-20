import angular from 'angular';
import uiMask from 'angular-ui-mask';
import uiModal from 'angular-ui-bootstrap/src/modal';

import transitionModal from './transitionModal';


export default angular.module('iselect.vertical.transition', [ uiMask, uiModal ])

  .component('transitionModal', transitionModal)

  // end of config.
  .name;
