import angular from 'angular';
import uiMask from 'angular-ui-mask';
import uiModal from 'angular-ui-bootstrap/src/modal';

import captureModal from './captureModal';
import services from '../services'


export default angular.module('iselect.vertical.capture', [ uiMask, uiModal, services ])

  .component('captureModal', captureModal)

  // end of config.
  .name;
