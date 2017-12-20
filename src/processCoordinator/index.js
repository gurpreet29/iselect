import angular from 'angular';
import ngRoute from 'angular-route';
import cookies from 'angular-cookies';
import uiModal from 'angular-ui-bootstrap/src/modal';

import needs from '../needs';
import processCoordinator from './processCoordinator';
import step from './step';
import resetStep from './resetStep';
import recommends from '../recommend';
import transition from '../transition';


export default angular.module('iselect.vertical.process', [ ngRoute, cookies, uiModal, needs, recommends, transition ])

  // Configure routing
  .config(
    [
      '$locationProvider',
      '$routeProvider',
      'needs.route',
      'recommends.route',
      ($locationProvider, $routeProvider, needsRoute) => {

        $locationProvider.html5Mode(false);
        $routeProvider.otherwise({redirectTo: needsRoute});
      }
    ]
  )

  // This is the master state shared across all process steps (routes).
  .value('verticalState', {
    promisedQuestions: undefined,
    answers: {},
    capture: {
      userDetails: undefined,
    },
    recommendations: {},
    recFeatures: {
      features: {},
      featureSuperset: {},
      headers: {}
    },
  })

  .component('processCoordinator', processCoordinator)
  .directive('step', step)
  .component('resetStep', resetStep)

  // end of config.
  .name;
