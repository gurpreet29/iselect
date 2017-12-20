import angular from 'angular';
import ngRoute from 'angular-route';
import needs from './needs';
import uiModal from 'angular-ui-bootstrap/src/modal';
import captureModal from '../capture';
import './local.less';
import uiMask from 'angular-ui-mask';
import duScroll from 'angular-scroll';

const routeSlug = '/needs';

export default angular.module('iselect.vertical.needs', [ngRoute, captureModal, uiModal, uiMask, duScroll])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when(routeSlug, {
      template: '<needs></needs>'
    });
  }])

  .constant('needs.route', routeSlug)
  .component('needs', needs)

  // end of config.
  .name;
