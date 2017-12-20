import angular from 'angular';
import topNav from './topNav';
import './local.less';

export default angular.module('iselect.vertical.coreResources', [])

  .component('topNav', topNav)

  // end of config.
  .name;