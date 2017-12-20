import angular from 'angular';
import ngRoute from 'angular-route';
import recommend from './recommend';
import 'angular-spinner';

import quickFilter from './quickFilter';
import resultColumn from '../recommend/resultColumn';
import recommendationQuestionTypes from './recommendationquestionTypes';

// styles for recommend
import './local.less';

const routeSlug = '/recommend';

export default angular.module('iselect.vertical.recommend', [ngRoute, quickFilter, resultColumn, recommendationQuestionTypes, 'angularSpinner'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when(routeSlug, {
      template: '<recommend></recommend>'
    });
  }])

  .constant('recommends.route', routeSlug)
  .component('recommend', recommend)

  // end of config.
  .name;
