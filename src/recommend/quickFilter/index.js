import angular from 'angular';
import ngRoute from 'angular-route';
import quickFilter from './quickFilter';
import homeContents from './homeContents';

export default angular.module('iselect.vertical.quickFilter', [ngRoute, homeContents])

  .component('quickFilter', quickFilter)

  // end of config.
  .name;
