import angular from 'angular';
import ngRoute from 'angular-route';
import view from './view.html';

const routeSlug = '/error';


export default angular.module('iselect.vertical.error', [ ngRoute ])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when(routeSlug, {
      template: '<error></error>'
    });
  }])

  .component('error', {
    bindings: {},
    template: view,
    controller: [ () => {} ]
  })

  .factory('$exceptionHandler', [
    '$log', '$injector', ($log, $injector) => {
      return (exception, cause) => {
        $log.warn(exception, cause);

        const $location = $injector.get('$location');
        $location.path('/error');
      }
    }
  ])

  // end of config.
  .name;
