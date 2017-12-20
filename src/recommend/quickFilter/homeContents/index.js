import angular from 'angular';
import ngRoute from 'angular-route';
import homeContents from './homeContents';
import uiModal from 'angular-ui-bootstrap/src/modal';
import customisePriceModal from './customisePriceModal';
import customisePreferencesModal from './customisePreferencesModal';
import customisePriceQuestionType from './customisePriceModal/customisePriceQuestionType';
import services from '../../../services'


export default angular.module('iselect.vertical.homeContents', [ngRoute, uiModal, services ])

  .component('homeContents', homeContents)
  .component('customisePriceModal', customisePriceModal)
  .component('customisePreferencesModal', customisePreferencesModal)
  .component('customisePriceQuestionType', customisePriceQuestionType)

  // end of config.
  .name;
